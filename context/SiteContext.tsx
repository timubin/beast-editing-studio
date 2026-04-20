import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, storage } from '../lib/firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
    footerText: string;
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
    pricing: PricingPlan[];
    portfolio: PortfolioItem[];
    features: DifferenceItem[];

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
    updatePricing: (pricing: PricingPlan[]) => void;
    updatePortfolio: (portfolio: PortfolioItem[]) => void;
    updateFeatures: (features: DifferenceItem[]) => void;
    uploadImage: (file: File, folder: string) => Promise<string>;
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
        contactEmail: "contact@beastediting.com",
        facebookUrl: "https://facebook.com",
        instagramUrl: "https://instagram.com",
        twitterUrl: "https://twitter.com",
        footerText: "© 2024 Beast Editing Studio. All rights reserved."
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
    updatePricing: () => { },
    updatePortfolio: () => { },
    updateFeatures: () => { },
    uploadImage: async () => ''
};

const SiteContext = createContext<SiteContent>(defaultContent);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [hero, setHero] = useState<HeroContent>(defaultContent.hero);
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>(defaultContent.blogPosts);
    const [about, setAbout] = useState<AboutContent>(defaultContent.about);
    const [stats, setStats] = useState<StatItem[]>(defaultContent.stats);
    const [testimonials, setTestimonials] = useState<TestimonialItem[]>(defaultContent.testimonials);
    const [settings, setSettings] = useState<SiteSettings>(defaultContent.settings);
    const [typography, setTypography] = useState<SiteTypography>(defaultContent.typography);
    const [customSections, setCustomSections] = useState<CustomSection[]>(defaultContent.customSections);

    const [menu, setMenu] = useState<MenuItem[]>(defaultContent.menu);
    const [services, setServices] = useState<ServiceItem[]>(defaultContent.services);
    const [pricing, setPricing] = useState<PricingPlan[]>(defaultContent.pricing);
    const [portfolio, setPortfolio] = useState<PortfolioItem[]>(defaultContent.portfolio);
    const [features, setFeatures] = useState<DifferenceItem[]>(defaultContent.features);

    // Load from Firebase
    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "site-content", "main"), (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.data() as Partial<SiteContent>;
                if (data.hero) setHero(data.hero);
                if (data.blogPosts) setBlogPosts(data.blogPosts);
                if (data.about) setAbout(data.about);
                if (data.stats) setStats(data.stats);
                if (data.testimonials) setTestimonials(data.testimonials);
                if (data.settings) setSettings(data.settings);
                if (data.typography) setTypography(data.typography);
                if (data.customSections) setCustomSections(data.customSections);
                if (data.menu) setMenu(data.menu);
                if (data.services) setServices(data.services);
                if (data.pricing) setPricing(data.pricing);
                if (data.portfolio) setPortfolio(data.portfolio);
                if (data.features) setFeatures(data.features);
            } else {
                // Initialize DB if empty
                setDoc(snapshot.ref, {
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
                    pricing: defaultContent.pricing,
                    portfolio: defaultContent.portfolio,
                    features: defaultContent.features
                }, { merge: true });
            }
        }, (error) => {
            console.error("Detail load error:", error);
            // Fallback to localStorage if Firebase fails (e.g. invalid config)
            const loadLocal = (key: string, setter: (val: any) => void) => {
                const saved = localStorage.getItem(key);
                if (saved && saved !== "undefined" && saved !== "null") try { setter(JSON.parse(saved)); } catch (e) { }
            };
            loadLocal('site_hero', setHero);
        });

        return () => unsubscribe();
    }, []);

    // Database Updaters
    const saveToDb = async (field: string, data: any) => {
        try {
            await setDoc(doc(db, "site-content", "main"), { [field]: data }, { merge: true });
        } catch (e) {
            console.error("Error saving to DB:", e);
            alert("Error saving: Check your internet connection or admin privileges.");
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
    const updatePricing = (items: PricingPlan[]) => { setPricing(items); saveToDb('pricing', items); };
    const updatePortfolio = (items: PortfolioItem[]) => { setPortfolio(items); saveToDb('portfolio', items); };
    const updateFeatures = (items: DifferenceItem[]) => { setFeatures(items); saveToDb('features', items); };

    const uploadImage = async (file: File, folder: string): Promise<string> => {
        const fileRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(fileRef, file);
        return await getDownloadURL(snapshot.ref);
    };

    // Memoize the context value to prevent unnecessary re-renders of consumers
    const value = React.useMemo(() => ({
        hero, blogPosts, about, stats, testimonials, settings, typography, customSections,
        menu, services, pricing, portfolio, features,
        updateHero, addBlogPost, deleteBlogPost, updateAbout, updateStats, updateTestimonials, updateSettings, updateTypography,
        addCustomSection, updateCustomSection, deleteCustomSection,
        updateMenu, updateServices, updatePricing, updatePortfolio, updateFeatures,
        uploadImage
    }), [
        hero, blogPosts, about, stats, testimonials, settings, typography, customSections,
        menu, services, pricing, portfolio, features
    ]);

    return (
        <SiteContext.Provider value={value}>
            {children}
        </SiteContext.Provider>
    );
};

export const useSiteContent = () => useContext(SiteContext);
