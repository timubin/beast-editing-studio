export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { base64 } = req.body;
        
        if (!base64) {
            return res.status(400).json({ error: 'No image data provided' });
        }

        const formData = new FormData();
        formData.append('source', base64);
        formData.append('type', 'base64');
        formData.append('action', 'upload');
        formData.append('key', '6d207e02198a847aa98d0a2a901485a5');

        const response = await fetch('https://freeimage.host/api/1/upload', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        
        if (data.status_code === 200 || data.success) {
            return res.status(200).json({ url: data.image?.url || data.data?.url });
        } else {
            return res.status(400).json({ error: data.error?.message || 'Upload failed' });
        }
    } catch (error) {
        console.error('API Upload Error:', error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}
