
import React, { createContext, useContext, useState, useEffect } from 'react';

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

interface SiteContent {
    hero: HeroContent;
    blogPosts: BlogPost[];
    about: AboutContent;
    stats: StatItem[];
    testimonials: TestimonialItem[];

    updateHero: (content: HeroContent) => void;
    addBlogPost: (post: Omit<BlogPost, 'id'>) => void;
    deleteBlogPost: (id: number) => void;
    updateAbout: (content: AboutContent) => void;
    updateStats: (stats: StatItem[]) => void;
    updateTestimonials: (testimonials: TestimonialItem[]) => void;
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

    updateHero: () => { },
    addBlogPost: () => { },
    deleteBlogPost: () => { },
    updateAbout: () => { },
    updateStats: () => { },
    updateTestimonials: () => { }
};

const SiteContext = createContext<SiteContent>(defaultContent);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [hero, setHero] = useState<HeroContent>(defaultContent.hero);
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>(defaultContent.blogPosts);
    const [about, setAbout] = useState<AboutContent>(defaultContent.about);
    const [stats, setStats] = useState<StatItem[]>(defaultContent.stats);
    const [testimonials, setTestimonials] = useState<TestimonialItem[]>(defaultContent.testimonials);

    // Load from localStorage on mount
    useEffect(() => {
        const savedHero = localStorage.getItem('site_hero');
        const savedPosts = localStorage.getItem('site_posts');
        const savedAbout = localStorage.getItem('site_about');
        const savedStats = localStorage.getItem('site_stats');
        const savedTestimonials = localStorage.getItem('site_testimonials');

        if (savedHero) setHero(JSON.parse(savedHero));
        if (savedPosts) setBlogPosts(JSON.parse(savedPosts));
        if (savedAbout) setAbout(JSON.parse(savedAbout));
        if (savedStats) setStats(JSON.parse(savedStats));
        if (savedTestimonials) setTestimonials(JSON.parse(savedTestimonials));
    }, []);

    // Save to localStorage whenever changes
    useEffect(() => { localStorage.setItem('site_hero', JSON.stringify(hero)); }, [hero]);
    useEffect(() => { localStorage.setItem('site_posts', JSON.stringify(blogPosts)); }, [blogPosts]);
    useEffect(() => { localStorage.setItem('site_about', JSON.stringify(about)); }, [about]);
    useEffect(() => { localStorage.setItem('site_stats', JSON.stringify(stats)); }, [stats]);
    useEffect(() => { localStorage.setItem('site_testimonials', JSON.stringify(testimonials)); }, [testimonials]);

    const updateHero = (content: HeroContent) => setHero(content);

    const addBlogPost = (post: Omit<BlogPost, 'id'>) => {
        const newPost = { ...post, id: Date.now() };
        setBlogPosts([newPost, ...blogPosts]);
    };

    const deleteBlogPost = (id: number) => setBlogPosts(blogPosts.filter(p => p.id !== id));

    const updateAbout = (content: AboutContent) => setAbout(content);

    const updateStats = (newStats: StatItem[]) => setStats(newStats);

    const updateTestimonials = (newTestimonials: TestimonialItem[]) => setTestimonials(newTestimonials);

    return (
        <SiteContext.Provider value={{
            hero, blogPosts, about, stats, testimonials,
            updateHero, addBlogPost, deleteBlogPost, updateAbout, updateStats, updateTestimonials
        }}>
            {children}
        </SiteContext.Provider>
    );
};

export const useSiteContent = () => useContext(SiteContext);
