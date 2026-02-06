
import React, { useState, useEffect } from 'react';
import { useSiteContent } from '../../context/SiteContext';
import { LayoutDashboard, Type, FileText, Settings, LogOut, Save, Trash2, Plus, Users, BarChart, MessageSquare, Code, List, Briefcase, CreditCard, Star, Menu as MenuIcon, Edit3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const {
        hero, updateHero,
        blogPosts, addBlogPost, deleteBlogPost,
        about, updateAbout,
        stats, updateStats,
        testimonials, updateTestimonials,
        settings, updateSettings,
        typography, updateTypography,
        customSections, addCustomSection, updateCustomSection, deleteCustomSection,
        menu, updateMenu,
        services, updateServices,
        pricing, updatePricing,
        portfolio, updatePortfolio,
        features, updateFeatures
    } = useSiteContent();

    const [activeTab, setActiveTab] = useState('hero');
    const navigate = useNavigate();

    // Form States
    const [heroForm, setHeroForm] = useState(hero);
    const [aboutForm, setAboutForm] = useState(about);
    const [statsForm, setStatsForm] = useState(stats);
    const [testimonialsForm, setTestimonialsForm] = useState(testimonials);
    const [settingsForm, setSettingsForm] = useState(settings || { // safely fallback
        siteName: '',
        contactEmail: '',
        facebookUrl: '',
        instagramUrl: '',
        twitterUrl: '',
        footerText: ''
    });
    const [typographyForm, setTypographyForm] = useState(typography || {
        fontFamily: 'Inter',
        headingFont: 'Inter'
    });

    // New Sections State
    const [menuForm, setMenuForm] = useState(menu);
    const [servicesForm, setServicesForm] = useState(services);
    const [pricingForm, setPricingForm] = useState(pricing);
    const [portfolioForm, setPortfolioForm] = useState(portfolio);
    const [featuresForm, setFeaturesForm] = useState(features);

    // Custom Section Form State
    const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
    const [customSectionForm, setCustomSectionForm] = useState({
        name: '',
        content: '',
        type: 'section' as 'section' | 'page',
        path: '',
        isVisible: true
    });

    const [newPost, setNewPost] = useState({
        title: '',
        excerpt: '',
        date: new Date().toLocaleDateString(),
        author: 'Admin',
        category: '',
        imageUrl: ''
    });

    // Update forms when context changes
    useEffect(() => {
        setMenuForm(menu);
        setServicesForm(services);
        setPricingForm(pricing);
        setPortfolioForm(portfolio);
        setFeaturesForm(features);
    }, [menu, services, pricing, portfolio, features]);

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        navigate('/login');
    };

    // Save Handlers
    const handleHeroSave = () => {
        updateHero(heroForm);
        alert('Hero Section Updated!');
    };

    const handleAboutSave = () => {
        updateAbout(aboutForm);
        alert('About Section Updated!');
    };

    const handleStatsSave = () => {
        updateStats(statsForm);
        alert('Stats Updated!');
    };

    const handleTestimonialsSave = () => {
        updateTestimonials(testimonialsForm);
        alert('Testimonials Updated!');
    };

    const handleSettingsSave = () => {
        updateSettings(settingsForm);
        alert('Settings Updated!');
    };

    const handleTypographySave = () => {
        updateTypography(typographyForm);
        alert('Typography Updated!');
    };

    const handleMenuSave = () => {
        updateMenu(menuForm);
        alert('Menu Updated!');
    };

    const handleServicesSave = () => {
        updateServices(servicesForm);
        alert('Services Updated!');
    };

    const handlePricingSave = () => {
        updatePricing(pricingForm);
        alert('Pricing Updated!');
    };

    const handlePortfolioSave = () => {
        updatePortfolio(portfolioForm);
        alert('Portfolio Updated!');
    };

    const handleFeaturesSave = () => {
        updateFeatures(featuresForm);
        alert('Features Updated!');
    };

    const handleCustomSectionSave = (e: React.FormEvent) => {
        e.preventDefault();
        const sectionData = {
            id: editingSectionId || Date.now().toString(),
            ...customSectionForm
        };

        if (editingSectionId) {
            updateCustomSection(sectionData);
            alert('Custom Code Updated!');
        } else {
            addCustomSection(sectionData);
            alert('Custom Code Created!');
        }

        // Reset form
        setEditingSectionId(null);
        setCustomSectionForm({ name: '', content: '', type: 'section', path: '', isVisible: true });
    };

    const handleEditSection = (section: any) => {
        setEditingSectionId(section.id);
        setCustomSectionForm({
            name: section.name,
            content: section.content,
            type: section.type,
            path: section.path || '',
            isVisible: section.isVisible
        });
    };

    const handleDeleteSection = (id: string) => {
        if (window.confirm('Are you sure you want to delete this custom code?')) {
            deleteCustomSection(id);
        }
    };

    const handleAddPost = (e: React.FormEvent) => {
        e.preventDefault();
        addBlogPost(newPost);
        setNewPost({ ...newPost, title: '', excerpt: '', category: '', imageUrl: '' });
        alert('Blog Post Added!');
    };

    // Generic list updaters
    const updateListItem = (list: any[], setList: Function, index: number, field: string, value: any) => {
        const newList = [...list];
        newList[index] = { ...newList[index], [field]: value };
        setList(newList);
    };

    const updateNestedListItem = (list: any[], setList: Function, listIndex: number, arrayField: string, arrayIndex: number, value: any) => {
        const newList = [...list];
        const newArray = [...newList[listIndex][arrayField]];
        newArray[arrayIndex] = value;
        newList[listIndex] = { ...newList[listIndex], [arrayField]: newArray };
        setList(newList);
    };

    const addItemToList = (list: any[], setList: Function, template: any) => {
        setList([...list, { ...template, id: Date.now().toString() }]);
    };

    const deleteItemFromList = (list: any[], setList: Function, index: number) => {
        if (window.confirm("Are you sure?")) {
            const newList = [...list];
            newList.splice(index, 1);
            setList(newList);
        }
    };

    // Helpers
    const updateStatItem = (index: number, field: string, value: string) => updateListItem(statsForm, setStatsForm, index, field, value);
    const updateTestimonialItem = (index: number, field: string, value: string) => updateListItem(testimonialsForm, setTestimonialsForm, index, field, value);

    return (
        <div className="min-h-screen bg-black text-white flex">
            {/* Sidebar */}
            <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col fixed h-full z-10 overflow-y-auto">
                <div className="p-8 border-b border-zinc-800">
                    <h2 className="text-2xl font-black tracking-tighter">BEAST<span className="text-red-600">.</span></h2>
                    <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">Admin Panel</p>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {[
                        { id: 'hero', icon: LayoutDashboard, label: 'Hero Section' },
                        { id: 'about', icon: Users, label: 'About Us' },
                        { id: 'menu', icon: MenuIcon, label: 'Menu / Nav' },
                        { id: 'services', icon: Briefcase, label: 'Services' },
                        { id: 'pricing', icon: CreditCard, label: 'Pricing' },
                        { id: 'portfolio', icon: List, label: 'Portfolio' },
                        { id: 'features', icon: Star, label: 'Features / Benefits' },
                        { id: 'stats', icon: BarChart, label: 'Stats' },
                        { id: 'testimonials', icon: MessageSquare, label: 'Testimonials' },
                        { id: 'blog', icon: FileText, label: 'Blog Posts' },
                        { id: 'custom', icon: Code, label: 'Custom Code' },
                        { id: 'typography', icon: Type, label: 'Typography' },
                        { id: 'settings', icon: Settings, label: 'Settings' },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === tab.id ? 'bg-red-600 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
                        >
                            <tab.icon className="w-5 h-5" />
                            <span className="font-bold text-sm">{tab.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-zinc-800">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:bg-zinc-800 hover:text-red-500 transition-all">
                        <LogOut className="w-5 h-5" />
                        <span className="font-bold text-sm">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8 lg:p-12 overflow-y-auto">
                <header className="mb-12 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-black mb-2 capitalize">
                            {activeTab.replace('-', ' ')} Manager
                        </h1>
                        <p className="text-zinc-500">Manage your website content efficiently</p>
                    </div>
                </header>

                {activeTab === 'hero' && (
                    <div className="max-w-4xl space-y-8 animate-fade-in">
                        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-xs font-bold text-zinc-500 uppercase mb-3 text-red-600">Main Title - Line 1</label>
                                    <input
                                        type="text"
                                        value={heroForm.titleLine1}
                                        onChange={(e) => setHeroForm({ ...heroForm, titleLine1: e.target.value })}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-red-600 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-zinc-500 uppercase mb-3">Main Title - Line 2</label>
                                    <input
                                        type="text"
                                        value={heroForm.titleLine2}
                                        onChange={(e) => setHeroForm({ ...heroForm, titleLine2: e.target.value })}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-red-600 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-zinc-500 uppercase mb-3 text-red-600">Subtitle - Line 1</label>
                                    <input
                                        type="text"
                                        value={heroForm.subHeadlineLine1}
                                        onChange={(e) => setHeroForm({ ...heroForm, subHeadlineLine1: e.target.value })}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-red-600 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-zinc-500 uppercase mb-3">Subtitle - Line 2</label>
                                    <input
                                        type="text"
                                        value={heroForm.subHeadlineLine2}
                                        onChange={(e) => setHeroForm({ ...heroForm, subHeadlineLine2: e.target.value })}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-red-600 outline-none transition-all"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-zinc-500 uppercase mb-3 text-red-600">Hero Video URL (YouTube)</label>
                                    <input
                                        type="text"
                                        value={heroForm.videoUrl || ''}
                                        onChange={(e) => setHeroForm({ ...heroForm, videoUrl: e.target.value })}
                                        placeholder="https://www.youtube.com/watch?v=..."
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-red-600 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="mt-8 flex justify-end">
                                <button onClick={handleHeroSave} className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all">
                                    <Save className="w-5 h-5" /> Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'menu' && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="flex justify-end">
                            <button onClick={() => addItemToList(menuForm, setMenuForm, { label: 'New Link', path: '/', type: 'link' })} className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
                                <Plus className="w-4 h-4" /> Add Menu Item
                            </button>
                        </div>
                        {menuForm.map((item, index) => (
                            <div key={item.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex gap-4 items-center">
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <input
                                        value={item.label}
                                        onChange={(e) => updateListItem(menuForm, setMenuForm, index, 'label', e.target.value)}
                                        placeholder="Label"
                                        className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:border-red-600 outline-none"
                                    />
                                    <input
                                        value={item.path}
                                        onChange={(e) => updateListItem(menuForm, setMenuForm, index, 'path', e.target.value)}
                                        placeholder="Path"
                                        className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:border-red-600 outline-none"
                                    />
                                    <select
                                        value={item.type}
                                        onChange={(e) => updateListItem(menuForm, setMenuForm, index, 'type', e.target.value)}
                                        className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:border-red-600 outline-none text-white"
                                    >
                                        <option value="link">Link (New Page)</option>
                                        <option value="scroll">Scroll (Section)</option>
                                    </select>
                                </div>
                                <button onClick={() => deleteItemFromList(menuForm, setMenuForm, index)} className="p-2 text-zinc-500 hover:text-red-500">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                        <div className="flex justify-end mt-8">
                            <button onClick={handleMenuSave} className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all">
                                <Save className="w-5 h-5" /> Save Menu
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'services' && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="flex justify-end">
                            <button onClick={() => addItemToList(servicesForm, setServicesForm, { title: 'New Service', description: '', icon: 'Box', items: [] })} className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
                                <Plus className="w-4 h-4" /> Add Service
                            </button>
                        </div>
                        {servicesForm.map((item, index) => (
                            <div key={item.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4 relative">
                                <div className="absolute top-4 right-4">
                                    <button onClick={() => deleteItemFromList(servicesForm, setServicesForm, index)} className="p-2 text-zinc-500 hover:text-red-500">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs uppercase font-bold text-zinc-500 mb-1 block">Title</label>
                                        <input
                                            value={item.title}
                                            onChange={(e) => updateListItem(servicesForm, setServicesForm, index, 'title', e.target.value)}
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:border-red-600 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs uppercase font-bold text-zinc-500 mb-1 block">Icon Name (Lucide)</label>
                                        <input
                                            value={item.icon}
                                            onChange={(e) => updateListItem(servicesForm, setServicesForm, index, 'icon', e.target.value)}
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:border-red-600 outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs uppercase font-bold text-zinc-500 mb-1 block">Description</label>
                                    <textarea
                                        value={item.description}
                                        onChange={(e) => updateListItem(servicesForm, setServicesForm, index, 'description', e.target.value)}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:border-red-600 outline-none h-20"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs uppercase font-bold text-zinc-500 mb-1 block">Items (One per line)</label>
                                    <textarea
                                        value={item.items.join('\n')}
                                        onChange={(e) => updateListItem(servicesForm, setServicesForm, index, 'items', e.target.value.split('\n'))}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:border-red-600 outline-none h-24"
                                    />
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-end mt-8">
                            <button onClick={handleServicesSave} className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all">
                                <Save className="w-5 h-5" /> Save Services
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'pricing' && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="flex justify-end">
                            <button onClick={() => addItemToList(pricingForm, setPricingForm, { name: 'New Plan', price: '0', duration: 'DURATION', features: [], icon: 'Zap', isPopular: false })} className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
                                <Plus className="w-4 h-4" /> Add Plan
                            </button>
                        </div>
                        {pricingForm.map((item, index) => (
                            <div key={item.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4 relative">
                                <div className="absolute top-4 right-4">
                                    <button onClick={() => deleteItemFromList(pricingForm, setPricingForm, index)} className="p-2 text-zinc-500 hover:text-red-500">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <input
                                        value={item.name}
                                        onChange={(e) => updateListItem(pricingForm, setPricingForm, index, 'name', e.target.value)}
                                        placeholder="Plan Name"
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:border-red-600 outline-none"
                                    />
                                    <input
                                        value={item.price}
                                        onChange={(e) => updateListItem(pricingForm, setPricingForm, index, 'price', e.target.value)}
                                        placeholder="Price"
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:border-red-600 outline-none"
                                    />
                                    <input
                                        value={item.duration}
                                        onChange={(e) => updateListItem(pricingForm, setPricingForm, index, 'duration', e.target.value)}
                                        placeholder="Duration"
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:border-red-600 outline-none"
                                    />
                                    <input
                                        value={item.icon}
                                        onChange={(e) => updateListItem(pricingForm, setPricingForm, index, 'icon', e.target.value)}
                                        placeholder="Icon"
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:border-red-600 outline-none"
                                    />
                                    <div className="flex items-center gap-2 border border-zinc-800 rounded-lg px-3">
                                        <input
                                            type="checkbox"
                                            checked={item.isPopular}
                                            onChange={(e) => updateListItem(pricingForm, setPricingForm, index, 'isPopular', e.target.checked)}
                                        />
                                        <span className="text-sm text-zinc-400">Is Popular?</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs uppercase font-bold text-zinc-500 mb-1 block">Features (One per line)</label>
                                    <textarea
                                        value={item.features.join('\n')}
                                        onChange={(e) => updateListItem(pricingForm, setPricingForm, index, 'features', e.target.value.split('\n'))}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:border-red-600 outline-none h-32"
                                    />
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-end mt-8">
                            <button onClick={handlePricingSave} className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all">
                                <Save className="w-5 h-5" /> Save Pricing
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'portfolio' && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="flex justify-end">
                            <button onClick={() => addItemToList(portfolioForm, setPortfolioForm, { title: 'New Project', category: 'General', image: '', description: '' })} className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
                                <Plus className="w-4 h-4" /> Add Project
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {portfolioForm.map((item, index) => (
                                <div key={item.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4 relative">
                                    <div className="absolute top-4 right-4 z-10">
                                        <button onClick={() => deleteItemFromList(portfolioForm, setPortfolioForm, index)} className="p-2 bg-black/50 rounded-full text-zinc-500 hover:text-red-500">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <input
                                        value={item.title}
                                        onChange={(e) => updateListItem(portfolioForm, setPortfolioForm, index, 'title', e.target.value)}
                                        placeholder="Project Title"
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:border-red-600 outline-none font-bold"
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            value={item.category}
                                            onChange={(e) => updateListItem(portfolioForm, setPortfolioForm, index, 'category', e.target.value)}
                                            placeholder="Category"
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:border-red-600 outline-none"
                                        />
                                        <input
                                            value={item.image}
                                            onChange={(e) => updateListItem(portfolioForm, setPortfolioForm, index, 'image', e.target.value)}
                                            placeholder="Image URL"
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:border-red-600 outline-none"
                                        />
                                    </div>
                                    <textarea
                                        value={item.description}
                                        onChange={(e) => updateListItem(portfolioForm, setPortfolioForm, index, 'description', e.target.value)}
                                        placeholder="Description"
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:border-red-600 outline-none h-20"
                                    />
                                    {item.image && (
                                        <img src={item.image} alt={item.title} className="w-full h-32 object-cover rounded-lg opacity-50" />
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end mt-8">
                            <button onClick={handlePortfolioSave} className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all">
                                <Save className="w-5 h-5" /> Save Portfolio
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'features' && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="flex justify-end">
                            <button onClick={() => addItemToList(featuresForm, setFeaturesForm, { title: 'New Feature', description: '', icon: 'Star' })} className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
                                <Plus className="w-4 h-4" /> Add Feature
                            </button>
                        </div>
                        {featuresForm.map((item, index) => (
                            <div key={item.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4 relative">
                                <div className="absolute top-4 right-4">
                                    <button onClick={() => deleteItemFromList(featuresForm, setFeaturesForm, index)} className="p-2 text-zinc-500 hover:text-red-500">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        value={item.title}
                                        onChange={(e) => updateListItem(featuresForm, setFeaturesForm, index, 'title', e.target.value)}
                                        placeholder="Feature Title"
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:border-red-600 outline-none"
                                    />
                                    <input
                                        value={item.icon}
                                        onChange={(e) => updateListItem(featuresForm, setFeaturesForm, index, 'icon', e.target.value)}
                                        placeholder="Icon Name"
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:border-red-600 outline-none"
                                    />
                                </div>
                                <textarea
                                    value={item.description}
                                    onChange={(e) => updateListItem(featuresForm, setFeaturesForm, index, 'description', e.target.value)}
                                    placeholder="Description"
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:border-red-600 outline-none h-20"
                                />
                            </div>
                        ))}
                        <div className="flex justify-end mt-8">
                            <button onClick={handleFeaturesSave} className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all">
                                <Save className="w-5 h-5" /> Save Features
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'blog' && (
                    <div className="space-y-8 animate-fade-in">
                        {/* New Post Form */}
                        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mb-8">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Plus className="w-5 h-5 text-red-600" /> Add New Post</h3>
                            <form onSubmit={handleAddPost} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <input
                                        placeholder="Post Title"
                                        value={newPost.title}
                                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                                        className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-red-600 outline-none"
                                        required
                                    />
                                    <input
                                        placeholder="Category (e.g., AI)"
                                        value={newPost.category}
                                        onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                                        className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-red-600 outline-none"
                                        required
                                    />
                                    <input
                                        placeholder="Image URL"
                                        value={newPost.imageUrl}
                                        onChange={(e) => setNewPost({ ...newPost, imageUrl: e.target.value })}
                                        className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-red-600 outline-none"
                                        required
                                    />
                                    <input
                                        placeholder="Date"
                                        value={newPost.date}
                                        onChange={(e) => setNewPost({ ...newPost, date: e.target.value })}
                                        className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-red-600 outline-none"
                                    />
                                </div>
                                <textarea
                                    placeholder="Post Excerpt / Short Description"
                                    value={newPost.excerpt}
                                    onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-red-600 outline-none h-24 resize-none"
                                    required
                                ></textarea>
                                <button type="submit" className="bg-white hover:bg-zinc-200 text-black px-6 py-2 rounded-lg font-bold text-sm transition-all">Publish Post</button>
                            </form>
                        </div>

                        {/* Existing Posts */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {blogPosts.map(post => (
                                <div key={post.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col group">
                                    <div className="flex justify-between items-start mb-4">
                                        <h4 className="font-bold text-lg leading-tight group-hover:text-red-600 transition-colors">{post.title}</h4>
                                        <button onClick={() => deleteBlogPost(post.id)} className="text-zinc-500 hover:text-red-600 transition-colors p-2">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <p className="text-zinc-500 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                                    <div className="mt-auto flex items-center justify-between text-xs text-zinc-600 font-bold uppercase tracking-wider">
                                        <span>{post.category}</span>
                                        <span>{post.date}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {activeTab === 'about' && (
                    <div className="max-w-4xl space-y-8 animate-fade-in">
                        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                                <div>
                                    <label className="block text-xs font-bold text-zinc-500 uppercase mb-3">Title - Line 1</label>
                                    <input
                                        type="text"
                                        value={aboutForm.titleLine1}
                                        onChange={(e) => setAboutForm({ ...aboutForm, titleLine1: e.target.value })}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-red-600 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-zinc-500 uppercase mb-3">Title - Line 2</label>
                                    <input
                                        type="text"
                                        value={aboutForm.titleLine2}
                                        onChange={(e) => setAboutForm({ ...aboutForm, titleLine2: e.target.value })}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-red-600 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs font-bold text-zinc-500 uppercase mb-3">Description Paragraph 1</label>
                                    <textarea
                                        value={aboutForm.description1}
                                        onChange={(e) => setAboutForm({ ...aboutForm, description1: e.target.value })}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-red-600 outline-none h-32 resize-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-zinc-500 uppercase mb-3">Description Paragraph 2</label>
                                    <textarea
                                        value={aboutForm.description2}
                                        onChange={(e) => setAboutForm({ ...aboutForm, description2: e.target.value })}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-red-600 outline-none h-32 resize-none"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <label className="block text-xs font-bold text-zinc-500 uppercase mb-3 text-red-600">Mission Statement</label>
                                        <textarea
                                            value={aboutForm.mission}
                                            onChange={(e) => setAboutForm({ ...aboutForm, mission: e.target.value })}
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-red-600 outline-none h-24 resize-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-zinc-500 uppercase mb-3 text-red-600">Vision Statement</label>
                                        <textarea
                                            value={aboutForm.vision}
                                            onChange={(e) => setAboutForm({ ...aboutForm, vision: e.target.value })}
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-red-600 outline-none h-24 resize-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex justify-end">
                                <button onClick={handleAboutSave} className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all">
                                    <Save className="w-5 h-5" /> Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'stats' && (
                    <div className="max-w-4xl space-y-8 animate-fade-in">
                        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
                            <h3 className="text-xl font-bold mb-6">Edit Statistics</h3>
                            <div className="space-y-6">
                                {statsForm.map((stat, index) => (
                                    <div key={stat.id} className="grid grid-cols-3 gap-4 pb-4 border-b border-zinc-800 last:border-0">
                                        <div className="col-span-1">
                                            <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Label</label>
                                            <input
                                                value={stat.label}
                                                onChange={(e) => updateStatItem(index, 'label', e.target.value)}
                                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:border-red-600 outline-none"
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Value</label>
                                            <input
                                                value={stat.value}
                                                onChange={(e) => updateStatItem(index, 'value', e.target.value)}
                                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:border-red-600 outline-none"
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Suffix</label>
                                            <input
                                                value={stat.suffix}
                                                onChange={(e) => updateStatItem(index, 'suffix', e.target.value)}
                                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm focus:border-red-600 outline-none"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 flex justify-end">
                                <button onClick={handleStatsSave} className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all">
                                    <Save className="w-5 h-5" /> Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'testimonials' && (
                    <div className="space-y-8 animate-fade-in pb-20">
                        {testimonialsForm.map((testimonial, index) => (
                            <div key={testimonial.id} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 relative">
                                <div className="absolute top-4 right-4 text-xs font-bold text-zinc-600 bg-zinc-800 px-3 py-1 rounded-full">#{index + 1}</div>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Client Name</label>
                                            <input
                                                value={testimonial.name}
                                                onChange={(e) => updateTestimonialItem(index, 'name', e.target.value)}
                                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-red-600 outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Role & Company</label>
                                            <input
                                                value={testimonial.role}
                                                onChange={(e) => updateTestimonialItem(index, 'role', e.target.value)}
                                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-red-600 outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Quote</label>
                                        <textarea
                                            value={testimonial.quote}
                                            onChange={(e) => updateTestimonialItem(index, 'quote', e.target.value)}
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-red-600 outline-none h-24 resize-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Avatar URL (Optional)</label>
                                        <input
                                            value={testimonial.avatar}
                                            onChange={(e) => updateTestimonialItem(index, 'avatar', e.target.value)}
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-red-600 outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="fixed bottom-8 right-8 z-50">
                            <button onClick={handleTestimonialsSave} className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-red-600/50 hover:-translate-y-1">
                                <Save className="w-5 h-5" /> Save All Testimonials
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'typography' && (
                    <div className="max-w-4xl space-y-8 animate-fade-in">
                        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
                            <h3 className="text-xl font-bold mb-6">Typography Settings</h3>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs font-bold text-zinc-500 uppercase mb-3">Body Font Family</label>
                                    <select
                                        value={typographyForm.fontFamily}
                                        onChange={(e) => setTypographyForm({ ...typographyForm, fontFamily: e.target.value })}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-red-600 outline-none transition-all text-white"
                                    >
                                        <option value="Inter">Inter (Default)</option>
                                        <option value="Roboto">Roboto</option>
                                        <option value="Open Sans">Open Sans</option>
                                        <option value="Montserrat">Montserrat</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-zinc-500 uppercase mb-3">Heading Font Family</label>
                                    <select
                                        value={typographyForm.headingFont}
                                        onChange={(e) => setTypographyForm({ ...typographyForm, headingFont: e.target.value })}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-red-600 outline-none transition-all text-white"
                                    >
                                        <option value="Inter">Inter (Default)</option>
                                        <option value="Roboto">Roboto</option>
                                        <option value="Open Sans">Open Sans</option>
                                        <option value="Montserrat">Montserrat</option>
                                        <option value="Oswald">Oswald</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mt-8 flex justify-end">
                                <button onClick={handleTypographySave} className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all">
                                    <Save className="w-5 h-5" /> Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div className="max-w-4xl space-y-8 animate-fade-in">
                        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
                            <h3 className="text-xl font-bold mb-6">General Settings</h3>
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-zinc-500 uppercase mb-3">Site Name</label>
                                        <input
                                            value={settingsForm.siteName}
                                            onChange={(e) => setSettingsForm({ ...settingsForm, siteName: e.target.value })}
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-red-600 outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-zinc-500 uppercase mb-3">Contact Email</label>
                                        <input
                                            value={settingsForm.contactEmail}
                                            onChange={(e) => setSettingsForm({ ...settingsForm, contactEmail: e.target.value })}
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-red-600 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <h4 className="text-lg font-bold mt-8 mb-4 text-zinc-400">Social Media Links</h4>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Facebook URL</label>
                                        <input
                                            value={settingsForm.facebookUrl}
                                            onChange={(e) => setSettingsForm({ ...settingsForm, facebookUrl: e.target.value })}
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-red-600 outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Instagram URL</label>
                                        <input
                                            value={settingsForm.instagramUrl}
                                            onChange={(e) => setSettingsForm({ ...settingsForm, instagramUrl: e.target.value })}
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-red-600 outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Twitter / X URL</label>
                                        <input
                                            value={settingsForm.twitterUrl}
                                            onChange={(e) => setSettingsForm({ ...settingsForm, twitterUrl: e.target.value })}
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-red-600 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <label className="block text-xs font-bold text-zinc-500 uppercase mb-3">Footer Text</label>
                                    <input
                                        value={settingsForm.footerText}
                                        onChange={(e) => setSettingsForm({ ...settingsForm, footerText: e.target.value })}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-red-600 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="mt-8 flex justify-end">
                                <button onClick={handleSettingsSave} className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all">
                                    <Save className="w-5 h-5" /> Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'custom' && (
                    <div className="space-y-8 animate-fade-in">
                        {/* Editor Form */}
                        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 fade-in">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Code className="w-5 h-5 text-red-600" />
                                {editingSectionId ? 'Edit Custom Code' : 'Add New Custom Code'}
                            </h3>
                            <form onSubmit={handleCustomSectionSave} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Name / Title</label>
                                        <input
                                            value={customSectionForm.name}
                                            onChange={(e) => setCustomSectionForm({ ...customSectionForm, name: e.target.value })}
                                            placeholder="e.g., Summer Sale Banner"
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-red-600 outline-none transition-all"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Type</label>
                                        <select
                                            value={customSectionForm.type}
                                            onChange={(e) => setCustomSectionForm({ ...customSectionForm, type: e.target.value as 'section' | 'page' })}
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-red-600 outline-none transition-all text-white"
                                        >
                                            <option value="section">Section (Appears on Homepage)</option>
                                            <option value="page">New Page (Custom URL)</option>
                                        </select>
                                    </div>
                                </div>

                                {customSectionForm.type === 'page' && (
                                    <div>
                                        <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Page Path</label>
                                        <div className="flex items-center">
                                            <span className="bg-zinc-800 px-4 py-3 rounded-l-xl border border-r-0 border-zinc-800 text-zinc-400 text-sm">/page/</span>
                                            <input
                                                value={customSectionForm.path}
                                                onChange={(e) => setCustomSectionForm({ ...customSectionForm, path: e.target.value })}
                                                placeholder="my-landing-page"
                                                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-r-xl px-4 py-3 focus:border-red-600 outline-none transition-all"
                                                required
                                            />
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">HTML / CSS Code</label>
                                    <textarea
                                        value={customSectionForm.content}
                                        onChange={(e) => setCustomSectionForm({ ...customSectionForm, content: e.target.value })}
                                        placeholder="<div><h1>Hello World</h1></div>"
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-red-600 outline-none h-64 font-mono text-sm resize-y"
                                        required
                                    />
                                    <p className="text-xs text-zinc-500 mt-2">You can use standard HTML/CSS. Tailwind classes might not work if they are not already used in the project.</p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="isVisible"
                                        checked={customSectionForm.isVisible}
                                        onChange={(e) => setCustomSectionForm({ ...customSectionForm, isVisible: e.target.checked })}
                                        className="w-4 h-4 accent-red-600 rounded"
                                    />
                                    <label htmlFor="isVisible" className="text-sm font-bold text-zinc-400">Published / Visible</label>
                                </div>

                                <div className="flex justify-end gap-4">
                                    {editingSectionId && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setEditingSectionId(null);
                                                setCustomSectionForm({ name: '', content: '', type: 'section', path: '', isVisible: true });
                                            }}
                                            className="px-6 py-3 rounded-xl font-bold text-zinc-400 hover:bg-zinc-800 transition-all"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                    <button type="submit" className="bg-white hover:bg-zinc-200 text-black px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all">
                                        <Save className="w-5 h-5" /> {editingSectionId ? 'Update Code' : 'Create Code'}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Existing Sections */}
                        <div className="grid grid-cols-1 gap-4">
                            {customSections.map(section => (
                                <div key={section.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex justify-between items-center group">
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h4 className="font-bold text-lg">{section.name}</h4>
                                            <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded bg-zinc-800 text-zinc-400`}>
                                                {section.type === 'page' ? 'Page' : 'Section'}
                                            </span>
                                            {!section.isVisible && (
                                                <span className="text-[10px] font-bold uppercase px-2 py-1 rounded bg-yellow-500/10 text-yellow-500">Draft</span>
                                            )}
                                        </div>
                                        {section.type === 'page' && (
                                            <p className="text-zinc-500 text-sm">Path: /page/{section.path}</p>
                                        )}
                                        <p className="text-zinc-600 text-xs mt-2 font-mono truncate max-w-md">{section.content.substring(0, 50)}...</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => handleEditSection(section)} className="p-2 hover:bg-blue-500/10 hover:text-blue-500 rounded-lg transition-all">
                                            <Edit3 className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => handleDeleteSection(section.id)} className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-all">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
