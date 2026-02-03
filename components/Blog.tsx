import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useSiteContent } from '../context/SiteContext';

const Blog: React.FC = () => {
    const { blogPosts } = useSiteContent();

    return (
        <div className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white pt-20">

            <div className="container mx-auto px-6 py-20">
                <div className="text-center mb-20">
                    <p className="text-red-600 font-bold uppercase tracking-widest text-sm mb-6">LATEST INSIGHTS</p>
                    <h1 className="text-5xl md:text-7xl font-black mb-8">
                        Beast <span className="text-red-600">Blog</span>
                    </h1>
                    <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
                        Thoughts, tutorials, and insights on video production, AI, and design.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
                    {blogPosts.map((post) => (
                        <article key={post.id} className="group bg-zinc-900/50 border border-zinc-800 rounded-3xl overflow-hidden hover:border-red-600/50 transition-all hover:translate-y-[-5px]">
                            <div className="aspect-video overflow-hidden">
                                <img
                                    src={post.imageUrl}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>
                            <div className="p-8">
                                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-zinc-500 mb-4">
                                    <span className="text-red-600">{post.category}</span>
                                    <span>•</span>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {post.date}
                                    </div>
                                </div>

                                <h2 className="text-2xl font-black mb-4 group-hover:text-red-600 transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-zinc-400 mb-6 leading-relaxed">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex items-center gap-2 text-sm font-medium text-zinc-300">
                                        <User className="w-4 h-4 text-red-600" />
                                        {post.author}
                                    </div>
                                    <button className="flex items-center gap-2 text-red-600 font-bold uppercase text-xs tracking-widest group-hover:gap-3 transition-all">
                                        Read Post <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            <div className="h-20"></div>
        </div>
    );
};

export default Blog;
