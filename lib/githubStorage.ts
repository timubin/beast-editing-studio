export interface GitHubUploadConfig {
    owner: string;
    repo: string;
    branch: string;
    token: string;
    contentPath: string;
    uploadRoot: string;
}

const CONFIG_KEY = 'beast_github_upload_config';
const TOKEN_KEY = 'beast_github_upload_token';

export const defaultGitHubConfig: GitHubUploadConfig = {
    owner: 'timubin',
    repo: 'beast-editing-studio',
    branch: 'practice',
    token: '',
    contentPath: 'public/site-content.json',
    uploadRoot: 'public/uploads'
};

const browserStorage = () => {
    if (typeof window === 'undefined') return null;
    return {
        local: window.localStorage,
        session: window.sessionStorage
    };
};

export const getGitHubConfig = (): GitHubUploadConfig => {
    const storage = browserStorage();
    if (!storage) return defaultGitHubConfig;

    try {
        const saved = storage.local.getItem(CONFIG_KEY);
        const parsed = saved ? JSON.parse(saved) : {};
        return {
            ...defaultGitHubConfig,
            ...parsed,
            token: storage.session.getItem(TOKEN_KEY) || ''
        };
    } catch (error) {
        console.error('Could not read GitHub upload settings:', error);
        return defaultGitHubConfig;
    }
};

export const saveGitHubConfig = (config: GitHubUploadConfig) => {
    const storage = browserStorage();
    if (!storage) return;

    const { token, ...safeConfig } = config;
    storage.local.setItem(CONFIG_KEY, JSON.stringify(safeConfig));

    if (token) {
        storage.session.setItem(TOKEN_KEY, token);
    } else {
        storage.session.removeItem(TOKEN_KEY);
    }
};

export const hasGitHubToken = () => Boolean(getGitHubConfig().token);

const normalizeRepoPath = (path: string) => path.replace(/^\/+/, '').replace(/\\/g, '/');

const encodePath = (path: string) => normalizeRepoPath(path).split('/').map(encodeURIComponent).join('/');

const toBase64 = (bytes: Uint8Array) => {
    let binary = '';
    const chunkSize = 0x8000;

    for (let index = 0; index < bytes.length; index += chunkSize) {
        const chunk = bytes.subarray(index, index + chunkSize);
        binary += String.fromCharCode(...chunk);
    }

    return btoa(binary);
};

const textToBase64 = (text: string) => toBase64(new TextEncoder().encode(text));

const fileToBase64 = async (file: File) => toBase64(new Uint8Array(await file.arrayBuffer()));

const githubRequest = async (config: GitHubUploadConfig, url: string, init: RequestInit = {}) => {
    if (!config.token) {
        throw new Error('GitHub token is missing.');
    }

    const response = await fetch(url, {
        ...init,
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${config.token}`,
            'Content-Type': 'application/json',
            'X-GitHub-Api-Version': '2022-11-28',
            ...(init.headers || {})
        }
    });

    if (!response.ok) {
        let message = `${response.status} ${response.statusText}`;

        try {
            const body = await response.json();
            message = body.message || message;
        } catch {
            // Keep the HTTP status message.
        }

        throw new Error(message);
    }

    return response.json();
};

const contentApiUrl = (config: GitHubUploadConfig, repoPath: string) =>
    `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${encodePath(repoPath)}`;

const getFileSha = async (config: GitHubUploadConfig, repoPath: string) => {
    const response = await fetch(`${contentApiUrl(config, repoPath)}?ref=${encodeURIComponent(config.branch)}`, {
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${config.token}`,
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });

    if (response.status === 404) return undefined;
    if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
    }

    const body = await response.json();
    return body.sha as string | undefined;
};

export const putGitHubFile = async (repoPath: string, base64Content: string, message: string) => {
    const config = getGitHubConfig();
    const path = normalizeRepoPath(repoPath);
    const sha = await getFileSha(config, path);

    await githubRequest(config, contentApiUrl(config, path), {
        method: 'PUT',
        body: JSON.stringify({
            message,
            content: base64Content,
            branch: config.branch,
            ...(sha ? { sha } : {})
        })
    });
};

export const deleteGitHubFile = async (repoPath: string, message: string) => {
    const config = getGitHubConfig();
    const path = normalizeRepoPath(repoPath);
    const sha = await getFileSha(config, path);

    if (!sha) return;

    await githubRequest(config, contentApiUrl(config, path), {
        method: 'DELETE',
        body: JSON.stringify({
            message,
            sha,
            branch: config.branch
        })
    });
};

export const publicPathFromRepoPath = (repoPath: string) => {
    const path = normalizeRepoPath(repoPath);
    return `/${path.replace(/^public\//, '')}`;
};

export const repoPathFromPublicPath = (publicPath: string) => {
    const urlPath = publicPath.startsWith('http')
        ? new URL(publicPath).pathname
        : publicPath;

    const cleanPath = normalizeRepoPath(urlPath);
    return cleanPath.startsWith('uploads/') ? `public/${cleanPath}` : '';
};

const sanitizeFileName = (name: string) => {
    const extension = name.includes('.') ? name.substring(name.lastIndexOf('.')).toLowerCase() : '';
    const base = name
        .replace(/\.[^.]+$/, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .substring(0, 80) || 'upload';

    return `${Date.now()}-${base}${extension}`;
};

export const uploadFileToGitHub = async (file: File, folder: string) => {
    const config = getGitHubConfig();
    const repoPath = normalizeRepoPath(`${config.uploadRoot}/${folder}/${sanitizeFileName(file.name)}`);

    await putGitHubFile(repoPath, await fileToBase64(file), `Upload ${folder} asset`);
    return publicPathFromRepoPath(repoPath);
};

export const deletePublicUpload = async (publicPath: string) => {
    const repoPath = repoPathFromPublicPath(publicPath);
    if (!repoPath) return;

    await deleteGitHubFile(repoPath, `Delete ${repoPath}`);
};

export const saveSiteContentToGitHub = async (content: unknown) => {
    const config = getGitHubConfig();
    const json = `${JSON.stringify(content, null, 2)}\n`;

    await putGitHubFile(config.contentPath, textToBase64(json), 'Update site content');
};
