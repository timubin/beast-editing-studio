import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, storage } from '../lib/firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { deletePublicUpload, hasGitHubToken, saveSiteContentToGitHub, uploadFileToGitHub } from '../lib/githubStorage';

// Define types for our content
interface HeroContent {
    titleLine1: string;
    titleLine2: string;
    subHeadlineLine1: string;
    subHeadlineLine2: string;
    videoUrl?: string;
}

interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    date: string;
    author: string;
    category: string;
    imageUrl: string;
}

interface AboutContent {
    titleLine1: string;
    titleLine2: string;
    description1: string;
    description2: string;
    mission: string;
    vision: string;
}

interface StatItem {
    id: number;
    label: string;
    value: string;
    suffix: string;
}

interface TestimonialItem {
    id: number;
    name: string;
    role: string;
    quote: string;
    avatar?: string;
}

interface SiteSettings {
    siteName: string;
    contactEmail: string;
    facebookUrl: string;
    instagramUrl: string;
    twitterUrl: string;
    youtubeUrl: string;
    linkedinUrl: string;
    whatsappNumber: string;
    footerTagline: string;
    location: string;
    footerText: string;
    imgbbApiKey?: string;
}

interface SiteTypography {
    fontFamily: string;
    headingFont: string;
}

interface CustomSection {
    id: string;
    name: string;
    content: string;
    type: 'section' | 'page';
    path?: string;
    isVisible: boolean;
}

interface MenuItem {
    id: string;
    label: string;
    path: string;
    type: 'link' | 'scroll';
}

interface ServiceItem {
    id: string;
    title: string;
    description: string;
    items: string[]; // Comma separated in UI
    icon: string; // Icon name
}

interface PricingPlan {
    id: string;
    name: string;
    duration: string;
    price: string;
    features: string[];
    isPopular: boolean;
    icon: string;
}

interface PortfolioItem {
    id: string;
    title: string;
    category: string;
    image: string;
    description: string;
}

interface DifferenceItem {
    id: string;
    title: string;
    description: string;
    icon: string;
}

interface ContactContent {
    eyebrow: string;
    title: string;
    highlightedTitle: string;
    description: string;
    email: string;
    location: string;
    responseTime: string;
    noticeTitle: string;
    noticeText: string;
    whatsappNumber: string;
}

interface WebServiceItem {
    id: string;
    title: string;
    description: string;
    tags: string[];
    icon: string;
}

interface StartupPackageItem {
    id: string;
    icon: string;
    text: string;
}

interface StartupPackageContent {
    title: string;
    description: string;
    ctaLabel: string;
    note: string;
    icon: string;
    items: StartupPackageItem[];
}

interface SiteContent {
    hero: HeroContent;
    blogPosts: BlogPost[];
    about: AboutContent;
    stats: StatItem[];
    testimonials: TestimonialItem[];
    settings: SiteSettings;
    typography: SiteTypography;
    customSections: CustomSection[];

    // New Sections
    menu: MenuItem[];
    services: ServiceItem[];
    webServices: WebServiceItem[];
    pricing: PricingPlan[];
    portfolio: PortfolioItem[];
    features: DifferenceItem[];
    contact: ContactContent;
    startupPackage: StartupPackageContent;

    updateHero: (content: HeroContent) => void;
    addBlogPost: (post: Omit<BlogPost, 'id'>) => void;
    deleteBlogPost: (id: number) => void;
    updateAbout: (content: AboutContent) => void;
    updateStats: (stats: StatItem[]) => void;
    updateTestimonials: (testimonials: TestimonialItem[]) => void;
    updateSettings: (settings: SiteSettings) => void;
    updateTypography: (typography: SiteTypography) => void;
    addCustomSection: (section: CustomSection) => void;
    updateCustomSection: (section: CustomSection) => void;
    deleteCustomSection: (id: string) => void;

    // New Update Functions
    updateMenu: (menu: MenuItem[]) => void;
    updateServices: (services: ServiceItem[]) => void;
    updateWebServices: (services: WebServiceItem[]) => void;
    updatePricing: (pricing: PricingPlan[]) => void;
    updatePortfolio: (portfolio: PortfolioItem[]) => void;
    updateFeatures: (features: DifferenceItem[]) => void;
    updateContact: (contact: ContactContent) => void;
    updateStartupPackage: (startupPackage: StartupPackageContent) => void;
    uploadImage: (file: File, folder: string) => Promise<string>;
    deleteUploadedFile: (url: string) => Promise<void>;
}

const defaultContent: SiteContent = {
    hero: {
        titleLine1: "BEAST EDITING",
        titleLine2: "STUDIO",
        subHeadlineLine1: "WE CREATE VISUALS",
        subHeadlineLine2: "THAT ROAR",
        videoUrl: "https://www.youtube.com/watch?v=LXb3EKWsInQ"
    },
    blogPosts: [
        {
            id: 1,
            title: "The Future of AI in Commercial Video Production",
            excerpt: "How artificial intelligence is revolutionizing the way we create and consume video content.",
            date: "Jan 15, 2024",
            author: "Tanvir Ahmed",
            category: "AI Technology",
            imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 2,
            title: "3D Visualization: Beyond Static Images",
            excerpt: "Why modern brands are switching to 3D motion graphics for product showcases.",
            date: "Jan 12, 2024",
            author: "Sarah Jenkins",
            category: "3D Design",
            imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800"
        }
    ],
    about: {
        titleLine1: "We Are",
        titleLine2: "Beast Editing Studio",
        description1: "Based in Los Angeles, we are a collective of visionary digital artists, editors, and strategists. We don't just edit videos; we engineer visual experiences that captivate audiences and drive results.",
        description2: "From high-end broadcast commercials to viral social media content, our passion lies in pushing the boundaries of what's possible in digital storytelling.",
        mission: "To empower brands with cinematic, high-performance video content that cuts through the noise.",
        vision: "To be the global standard for creative video production, combining art, technology, and strategy."
    },
    stats: [
        { id: 1, label: "Projects Delivered", value: "500", suffix: "+" },
        { id: 2, label: "Happy Clients", value: "150", suffix: "+" },
        { id: 3, label: "Client Retention", value: "98", suffix: "%" },
        { id: 4, label: "Support Available", value: "24/7", suffix: "" }
    ],
    testimonials: [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "CEO at TechStart Inc.",
            quote: "Beast Editing Studio transformed our brand's visual identity. Their attention to detail and creative vision exceeded our expectations."
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Founder, FutureFlow",
            quote: "The AI commercial package was a game changer for our startup. High quality, fast delivery, and incredible value."
        },
        {
            id: 3,
            name: "Jessica Williams",
            role: "Marketing Director, OmniCorp",
            quote: "Working with the Beast team was effortless. They understood our vision immediately and delivered a masterpiece."
        },
        {
            id: 4,
            name: "David Miller",
            role: "CTO, NextGen Devices",
            quote: "Absolutely stunning 3D visualization. It helped us secure our Series A funding by showcasing our product perfectly."
        }
    ],
    settings: {
        siteName: "Beast Editing Studio",
        contactEmail: "beastediting24@gmail.com",
        facebookUrl: "",
        instagramUrl: "https://instagram.com",
        twitterUrl: "",
        youtubeUrl: "https://www.youtube.com/@BeastEditingstudio",
        linkedinUrl: "https://www.linkedin.com/company/103732769/admin/dashboard/",
        whatsappNumber: "8801944790363",
        footerTagline: "Premium visual content creation studio specializing in 3D, motion graphics, and commercial video production.",
        location: "Bangladesh",
        footerText: "© 2024 Beast Editing Studio. All rights reserved.",
        imgbbApiKey: ""
    },
    typography: {
        fontFamily: "Inter",
        headingFont: "Inter"
    },
    customSections: [],

    // Defaults matching current hardcoded data
    menu: [
        { id: '1', label: 'Home', path: '/', type: 'link' },
        { id: '2', label: 'Services', path: 'services', type: 'scroll' },
        { id: '3', label: 'Blog', path: '/blog', type: 'link' },
        { id: '4', label: 'Portfolio', path: 'portfolio', type: 'scroll' },
        { id: '5', label: 'About', path: 'about', type: 'scroll' },
        { id: '6', label: 'Contact', path: 'contact', type: 'scroll' }
    ],
    services: [
        {
            id: '1',
            icon: 'Box',
            title: "3D Product Visualization",
            description: "Photorealistic product renders and animations that bring your products to life with stunning detail and precision.",
            items: ["Photorealistic Renders", "Product Animations", "360 Product Views", "AR Ready Assets"]
        },
        {
            id: '2',
            icon: 'Film',
            title: "Motion Graphics & Animation",
            description: "Eye-catching animations for brands. From logo animations to full explainer videos that captivate audiences.",
            items: ["Logo Animations", "Explainer Videos", "Social Media Content", "Title Sequences"]
        },
        {
            id: '3',
            icon: 'Video',
            title: "Commercial Video Production",
            description: "Engaging commercials that sell. We create compelling video content that converts viewers into customers.",
            items: ["TV Commercials", "Social Ads", "Product Videos", "Brand Films"]
        }
    ],
    webServices: [
        {
            id: '1',
            title: "One-Page Website / Portfolio",
            description: "Perfect for creatives and professionals looking to showcase their work beautifully.",
            tags: ["Responsive Design", "Modern UI/UX", "Fast Loading", "SEO Optimized"],
            icon: 'FileText'
        },
        {
            id: '2',
            title: "E-Commerce Website",
            description: "Up to 50 products with full shopping functionality and payment integration.",
            tags: ["Product Management", "Secure Checkout", "Inventory Tracking", "Analytics Dashboard"],
            icon: 'ShoppingCart'
        },
        {
            id: '3',
            title: "Multi-Page Website",
            description: "Up to 10 pages with custom design tailored to your brand identity.",
            tags: ["Custom Pages", "Blog Integration", "Contact Forms", "CMS Integration"],
            icon: 'Layers'
        },
        {
            id: '4',
            title: "Professional Service Website",
            description: "For doctors, lawyers, plumbers, and other service professionals.",
            tags: ["Appointment Booking", "Service Showcases", "Testimonials", "Local SEO"],
            icon: 'Briefcase'
        }
    ],
    pricing: [
        {
            id: '1',
            name: "30 Seconds",
            duration: "DURATION",
            price: "599",
            features: ["AI Scripting", "Professional Voice Over", "Sound Design", "Full Animation", "Video Production", "SFX & VFX"],
            icon: 'Zap',
            isPopular: false
        },
        {
            id: '2',
            name: "60 Seconds",
            duration: "DURATION",
            price: "1199",
            features: ["AI Scripting", "Professional Voice Over", "Sound Design", "Full Animation", "Video Production", "SFX & VFX"],
            icon: 'Sparkles',
            isPopular: true
        },
        {
            id: '3',
            name: "120 Seconds",
            duration: "DURATION",
            price: "1999",
            features: ["AI Scripting", "Professional Voice Over", "Sound Design", "Full Animation", "Video Production", "SFX & VFX"],
            icon: 'Crown',
            isPopular: false
        }
    ],
    portfolio: [
        {
            id: '1',
            title: "Premium Smartwatch 3D Render",
            category: "3D",
            image: "https://picsum.photos/seed/watch/800/600",
            description: "Detailed visualization for tech marketing"
        },
        {
            id: '2',
            title: "Retro Tech Motion Graphics",
            category: "Motion Graphics",
            image: "https://picsum.photos/seed/retro/800/600",
            description: "Branding animation for a vintage hardware shop"
        },
        {
            id: '3',
            title: "Premium Headphones Commercial",
            category: "Commercials",
            image: "https://picsum.photos/seed/audio/800/600",
            description: "30-second product commercial with VFX"
        },
        {
            id: '4',
            title: "Fashion Boutique Website",
            category: "Web Design",
            image: "https://picsum.photos/seed/fashion/800/600",
            description: "Minimalist e-commerce interface"
        },
        {
            id: '5',
            title: "Perfume Bottle 3D Product Shot",
            category: "3D",
            image: "https://picsum.photos/seed/perfume/800/600",
            description: "High-end luxury brand visualization"
        },
        {
            id: '6',
            title: "Abstract Cube Animation",
            category: "Motion Graphics",
            image: "https://picsum.photos/seed/abstract/800/600",
            description: "Geometric experiments in 3D space"
        }
    ],
    features: [
        {
            id: '1',
            title: "Premium Quality",
            description: "We deliver nothing but the highest quality work that exceeds expectations.",
            icon: 'Award'
        },
        {
            id: '2',
            title: "Fast Turnaround",
            description: "Quick delivery without compromising on quality. We respect your deadlines.",
            icon: 'Clock'
        },
        {
            id: '3',
            title: "Dedicated Support",
            description: "Personal attention for every project with direct communication throughout.",
            icon: 'Users'
        },
        {
            id: '4',
            title: "Cutting-Edge Tech",
            description: "Using the latest tools and technologies to create stunning visual content.",
            icon: 'Zap'
        },
        {
            id: '5',
            title: "Proven Results",
            description: "Track record of success with 500+ projects and countless satisfied clients.",
            icon: 'ShieldCheck'
        },
        {
            id: '6',
            title: "100% Satisfaction",
            description: "We're not happy until you are. Full revisions until you're completely satisfied.",
            icon: 'Heart'
        }
    ],
    contact: {
        eyebrow: "GET IN TOUCH",
        title: "Let's Create Something",
        highlightedTitle: "Amazing",
        description: "Ready to bring your vision to life? Get in touch and let's discuss your project",
        email: "beastediting24@gmail.com",
        location: "Bangladesh",
        responseTime: "Within 24 hours",
        noticeTitle: "Quick Response Guaranteed",
        noticeText: "We typically respond within a few hours during business days.",
        whatsappNumber: "8801944790363"
    },
    startupPackage: {
        title: "Complete Startup Package",
        description: "Everything you need to launch your brand and make a powerful first impression",
        ctaLabel: "Get Started",
        note: "Free consultation included",
        icon: "Rocket",
        items: [
            { id: '1', icon: 'Globe', text: "3-Page Professional Website" },
            { id: '2', icon: 'Layout', text: "Domain Registration" },
            { id: '3', icon: 'Mail', text: "Web Hosting (1 year)" },
            { id: '4', icon: 'Palette', text: "Business Email Setup" },
            { id: '5', icon: 'Box', text: "Custom Logo Design" },
            { id: '6', icon: 'Camera', text: "Brand Slogan Development" },
            { id: '7', icon: 'FileText', text: "5 Poster Designs (web & social media)" },
            { id: '8', icon: 'Video', text: "2x 30-Second Video Ads" }
        ]
    },

    updateHero: () => { },
    addBlogPost: () => { },
    deleteBlogPost: () => { },
    updateAbout: () => { },
    updateStats: () => { },
    updateTestimonials: () => { },
    updateSettings: () => { },
    updateTypography: () => { },
    addCustomSection: () => { },
    updateCustomSection: () => { },
    deleteCustomSection: () => { },

    updateMenu: () => { },
    updateServices: () => { },
    updateWebServices: () => { },
    updatePricing: () => { },
    updatePortfolio: () => { },
    updateFeatures: () => { },
    updateContact: () => { },
    updateStartupPackage: () => { },
    uploadImage: async () => '',
    deleteUploadedFile: async () => { }
};

const SiteContext = createContext<SiteContent>(defaultContent);

const STORAGE_KEY = 'beast_site_content';

const readStoredContent = (): Partial<SiteContent> => {
    if (typeof window === 'undefined') return {};

    try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : {};
    } catch (error) {
        console.error("Could not read saved site content:", error);
        return {};
    }
};

const mergeWithDefaults = (content: Partial<SiteContent>): SiteContent => ({
    ...defaultContent,
    ...content,
    hero: { ...defaultContent.hero, ...content.hero },
    about: { ...defaultContent.about, ...content.about },
    settings: { ...defaultContent.settings, ...content.settings },
    typography: { ...defaultContent.typography, ...content.typography },
    contact: { ...defaultContent.contact, ...content.contact },
    startupPackage: {
        ...defaultContent.startupPackage,
        ...content.startupPackage,
        items: content.startupPackage?.items || defaultContent.startupPackage.items
    },
    blogPosts: content.blogPosts || defaultContent.blogPosts,
    stats: content.stats || defaultContent.stats,
    testimonials: content.testimonials || defaultContent.testimonials,
    customSections: content.customSections || defaultContent.customSections,
    menu: content.menu || defaultContent.menu,
    services: content.services || defaultContent.services,
    webServices: content.webServices || defaultContent.webServices,
    pricing: content.pricing || defaultContent.pricing,
    portfolio: content.portfolio || defaultContent.portfolio,
    features: content.features || defaultContent.features
});

const writeStoredField = (field: keyof SiteContent, data: any) => {
    if (typeof window === 'undefined') return;

    try {
        const current = mergeWithDefaults(readStoredContent());
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, [field]: data }));
    } catch (error) {
        console.error("Could not save site content locally:", error);
    }
};

const writeStoredContent = (content: Partial<SiteContent>) => {
    if (typeof window === 'undefined') return;

    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(mergeWithDefaults(content)));
    } catch (error) {
        console.error("Could not save site content locally:", error);
    }
};

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const initialContent = React.useMemo(() => mergeWithDefaults(readStoredContent()), []);

    const [hero, setHero] = useState<HeroContent>(initialContent.hero);
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialContent.blogPosts);
    const [about, setAbout] = useState<AboutContent>(initialContent.about);
    const [stats, setStats] = useState<StatItem[]>(initialContent.stats);
    const [testimonials, setTestimonials] = useState<TestimonialItem[]>(initialContent.testimonials);
    const [settings, setSettings] = useState<SiteSettings>(initialContent.settings);
    const [typography, setTypography] = useState<SiteTypography>(initialContent.typography);
    const [customSections, setCustomSections] = useState<CustomSection[]>(initialContent.customSections);

    const [menu, setMenu] = useState<MenuItem[]>(initialContent.menu);
    const [services, setServices] = useState<ServiceItem[]>(initialContent.services);
    const [webServices, setWebServices] = useState<WebServiceItem[]>(initialContent.webServices);
    const [pricing, setPricing] = useState<PricingPlan[]>(initialContent.pricing);
    const [portfolio, setPortfolio] = useState<PortfolioItem[]>(initialContent.portfolio);
    const [features, setFeatures] = useState<DifferenceItem[]>(initialContent.features);
    const [contact, setContact] = useState<ContactContent>(initialContent.contact);
    const [startupPackage, setStartupPackage] = useState<StartupPackageContent>(initialContent.startupPackage);

    const applyContent = (content: Partial<SiteContent>) => {
        const merged = mergeWithDefaults(content);
        setHero(merged.hero);
        setBlogPosts(merged.blogPosts);
        setAbout(merged.about);
        setStats(merged.stats);
        setTestimonials(merged.testimonials);
        setSettings(merged.settings);
        setTypography(merged.typography);
        setCustomSections(merged.customSections);
        setMenu(merged.menu);
        setServices(merged.services);
        setWebServices(merged.webServices);
        setPricing(merged.pricing);
        setPortfolio(merged.portfolio);
        setFeatures(merged.features);
        setContact(merged.contact);
        setStartupPackage(merged.startupPackage);
    };

    const getContentSnapshot = (overrides: Partial<SiteContent> = {}) => ({
        hero,
        blogPosts,
        about,
        stats,
        testimonials,
        settings,
        typography,
        customSections,
        menu,
        services,
        webServices,
        pricing,
        portfolio,
        features,
        contact,
        startupPackage,
        ...overrides
    });

    useEffect(() => {
        let isCancelled = false;

        fetch(`/site-content.json?v=${Date.now()}`, { cache: 'no-store' })
            .then(response => response.ok ? response.json() : null)
            .then((content) => {
                if (!isCancelled && content) {
                    writeStoredContent(content);
                    applyContent(content);
                }
            })
            .catch((error) => {
                console.info("No GitHub content file loaded yet:", error);
            });

        return () => {
            isCancelled = true;
        };
    }, []);

    // Load from Firebase. If Firebase is not enabled, localStorage keeps the admin usable.
    useEffect(() => {
        const contentRef = doc(db, "site-content", "main");
        const unsubscribe = onSnapshot(contentRef, (snapshot) => {
            if (snapshot.exists()) {
                const remoteContent = mergeWithDefaults(snapshot.data() as Partial<SiteContent>);
                if (typeof window !== 'undefined') {
                    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(remoteContent));
                }
                applyContent(remoteContent);
            } else {
                // Initialize DB if empty
                setDoc(contentRef, {
                    hero: defaultContent.hero,
                    blogPosts: defaultContent.blogPosts,
                    about: defaultContent.about,
                    stats: defaultContent.stats,
                    testimonials: defaultContent.testimonials,
                    settings: defaultContent.settings,
                    typography: defaultContent.typography,
                    customSections: defaultContent.customSections,
                    menu: defaultContent.menu,
                    services: defaultContent.services,
                    webServices: defaultContent.webServices,
                    pricing: defaultContent.pricing,
                    portfolio: defaultContent.portfolio,
                    features: defaultContent.features,
                    contact: defaultContent.contact,
                    startupPackage: defaultContent.startupPackage
                }, { merge: true });
            }
        }, (error) => {
            console.error("Detail load error:", error);
            applyContent(readStoredContent());
        });

        return () => unsubscribe();
    }, []);

    // Database Updaters
    const saveToDb = async (field: keyof SiteContent, data: any) => {
        const contentSnapshot = getContentSnapshot({ [field]: data });
        writeStoredContent(contentSnapshot);

        try {
            await setDoc(doc(db, "site-content", "main"), { [field]: data }, { merge: true });
        } catch (e) {
            console.error("Error saving to DB:", e);
        }

        if (hasGitHubToken()) {
            try {
                await saveSiteContentToGitHub(contentSnapshot);
            } catch (error: any) {
                console.error("Error saving to GitHub:", error);
                alert(`Saved in this browser, but GitHub live sync failed: ${error.message}`);
            }
        }
    };

    const updateHero = (content: HeroContent) => { setHero(content); saveToDb('hero', content); };
    const addBlogPost = (post: Omit<BlogPost, 'id'>) => {
        const newPost = { ...post, id: Date.now() };
        const newPosts = [newPost, ...blogPosts];
        setBlogPosts(newPosts);
        saveToDb('blogPosts', newPosts);
    };
    const deleteBlogPost = (id: number) => {
        const newPosts = blogPosts.filter(p => p.id !== id);
        setBlogPosts(newPosts);
        saveToDb('blogPosts', newPosts);
    };
    const updateAbout = (content: AboutContent) => { setAbout(content); saveToDb('about', content); };
    const updateStats = (stats: StatItem[]) => { setStats(stats); saveToDb('stats', stats); };
    const updateTestimonials = (items: TestimonialItem[]) => { setTestimonials(items); saveToDb('testimonials', items); };
    const updateSettings = (s: SiteSettings) => { setSettings(s); saveToDb('settings', s); };
    const updateTypography = (t: SiteTypography) => { setTypography(t); saveToDb('typography', t); };

    const addCustomSection = (section: CustomSection) => {
        const newSections = [...customSections, section];
        setCustomSections(newSections);
        saveToDb('customSections', newSections);
    };
    const updateCustomSection = (section: CustomSection) => {
        const newSections = customSections.map(s => s.id === section.id ? section : s);
        setCustomSections(newSections);
        saveToDb('customSections', newSections);
    };
    const deleteCustomSection = (id: string) => {
        const newSections = customSections.filter(s => s.id !== id);
        setCustomSections(newSections);
        saveToDb('customSections', newSections);
    };

    const updateMenu = (items: MenuItem[]) => { setMenu(items); saveToDb('menu', items); };
    const updateServices = (items: ServiceItem[]) => { setServices(items); saveToDb('services', items); };
    const updateWebServices = (items: WebServiceItem[]) => { setWebServices(items); saveToDb('webServices', items); };
    const updatePricing = (items: PricingPlan[]) => { setPricing(items); saveToDb('pricing', items); };
    const updatePortfolio = (items: PortfolioItem[]) => { setPortfolio(items); saveToDb('portfolio', items); };
    const updateFeatures = (items: DifferenceItem[]) => { setFeatures(items); saveToDb('features', items); };
    const updateContact = (content: ContactContent) => { setContact(content); saveToDb('contact', content); };
    const updateStartupPackage = (content: StartupPackageContent) => { setStartupPackage(content); saveToDb('startupPackage', content); };

    const uploadImage = async (file: File, folder: string): Promise<string> => {
        if (hasGitHubToken()) {
            return await uploadFileToGitHub(file, folder);
        }

        try {
            const fileRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
            const snapshot = await uploadBytes(fileRef, file);
            return await getDownloadURL(snapshot.ref);
        } catch (error) {
            console.error("Firebase upload failed:", error);
            
            try {
                // Fallback to free anonymous image hosting (freeimage.host)
                const formData = new FormData();
                formData.append('source', file);
                formData.append('type', 'file');
                formData.append('action', 'upload');
                formData.append('key', '6d207e02198a847aa98d0a2a901485a5'); // Public freeimage.host API key
                
                // If user provided ImgBB key, we can try that instead, but freeimage.host is default
                const uploadUrl = settings.imgbbApiKey 
                    ? `https://api.imgbb.com/1/upload?key=${settings.imgbbApiKey}`
                    : `https://freeimage.host/api/1/upload`;
                
                if (settings.imgbbApiKey) {
                    formData.delete('source');
                    formData.delete('type');
                    formData.delete('action');
                    formData.delete('key');
                    formData.append('image', file);
                }

                const res = await fetch(uploadUrl, {
                    method: 'POST',
                    body: formData
                });
                
                const data = await res.json();
                if (data.status_code === 200 || data.success) {
                    return data.image?.url || data.data?.url;
                } else {
                    throw new Error(data.error?.message || "Upload failed");
                }
            } catch (uploadError: any) {
                alert("Image Upload Failed! Please check your internet connection and try again.");
                throw uploadError;
            }
        }
    };

    const deleteUploadedFile = async (url: string): Promise<void> => {
        if (!url || !hasGitHubToken()) return;
        await deletePublicUpload(url);
    };

    // Memoize the context value to prevent unnecessary re-renders of consumers
    const value = React.useMemo(() => ({
        hero, blogPosts, about, stats, testimonials, settings, typography, customSections,
        menu, services, webServices, pricing, portfolio, features, contact, startupPackage,
        updateHero, addBlogPost, deleteBlogPost, updateAbout, updateStats, updateTestimonials, updateSettings, updateTypography,
        addCustomSection, updateCustomSection, deleteCustomSection,
        updateMenu, updateServices, updateWebServices, updatePricing, updatePortfolio, updateFeatures, updateContact, updateStartupPackage,
        uploadImage, deleteUploadedFile
    }), [
        hero, blogPosts, about, stats, testimonials, settings, typography, customSections,
        menu, services, webServices, pricing, portfolio, features, contact, startupPackage
    ]);

    return (
        <SiteContext.Provider value={value}>
            {children}
        </SiteContext.Provider>
    );
};

export const useSiteContent = () => useContext(SiteContext);
