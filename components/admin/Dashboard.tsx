
import React, { useState } from 'react';
import { useSiteContent } from '../../context/SiteContext';
import { LayoutDashboard, Type, FileText, Settings, LogOut, Save, Trash2, Plus, Users, BarChart, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const {
        hero, updateHero,
        blogPosts, addBlogPost, deleteBlogPost,
        about, updateAbout,
        stats, updateStats,
        testimonials, updateTestimonials
    } = useSiteContent();

    const [activeTab, setActiveTab] = useState('hero');
    const navigate = useNavigate();

    // Form States
    const [heroForm, setHeroForm] = useState(hero);
    const [aboutForm, setAboutForm] = useState(about);
    const [statsForm, setStatsForm] = useState(stats);
    const [testimonialsForm, setTestimonialsForm] = useState(testimonials);
    const [newPost, setNewPost] = useState({
        title: '',
        excerpt: '',
        date: new Date().toLocaleDateString(),
        author: 'Admin',
        category: '',
        imageUrl: ''
    });

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

    const handleAddPost = (e: React.FormEvent) => {
        e.preventDefault();
        addBlogPost(newPost);
        setNewPost({ ...newPost, title: '', excerpt: '', category: '', imageUrl: '' });
        alert('Blog Post Added!');
    };

    // Helpers
    const updateStatItem = (index: number, field: string, value: string) => {
        const newStats = [...statsForm];
        newStats[index] = { ...newStats[index], [field]: value };
        setStatsForm(newStats);
    };

    const updateTestimonialItem = (index: number, field: string, value: string) => {
        const newTestimonials = [...testimonialsForm];
        newTestimonials[index] = { ...newTestimonials[index], [field]: value };
        setTestimonialsForm(newTestimonials);
    };

    return (
        <div className="min-h-screen bg-black text-white flex">
            {/* Sidebar */}
            <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col fixed h-full z-10">
                <div className="p-8 border-b border-zinc-800">
                    <h2 className="text-2xl font-black tracking-tighter">BEAST<span className="text-red-600">.</span></h2>
                    <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">Admin Panel</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('hero')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'hero' ? 'bg-red-600 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        <span className="font-bold text-sm">Hero Section</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('about')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'about' ? 'bg-red-600 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
                    >
                        <Users className="w-5 h-5" />
                        <span className="font-bold text-sm">About Us</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('stats')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'stats' ? 'bg-red-600 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
                    >
                        <BarChart className="w-5 h-5" />
                        <span className="font-bold text-sm">Stats</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('testimonials')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'testimonials' ? 'bg-red-600 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
                    >
                        <MessageSquare className="w-5 h-5" />
                        <span className="font-bold text-sm">Testimonials</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('blog')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'blog' ? 'bg-red-600 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
                    >
                        <FileText className="w-5 h-5" />
                        <span className="font-bold text-sm">Blog Posts</span>
                    </button>
                    <button
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-zinc-400 hover:bg-zinc-800 hover:text-white`}
                    >
                        <Type className="w-5 h-5" />
                        <span className="font-bold text-sm">Typography (Coming Soon)</span>
                    </button>
                    <button
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-zinc-400 hover:bg-zinc-800 hover:text-white`}
                    >
                        <Settings className="w-5 h-5" />
                        <span className="font-bold text-sm">Settings (Coming Soon)</span>
                    </button>
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
                        <h1 className="text-3xl font-black mb-2">
                            {activeTab === 'hero' ? 'Edit Hero Section' : 'Manage Blog Posts'}
                        </h1>
                        <p className="text-zinc-500">Manage your website content efficiently</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center font-bold text-lg">A</div>
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
            </main>
        </div>
    );
};

export default Dashboard;
