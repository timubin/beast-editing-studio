import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';
import { auth } from '../../lib/firebase';
import { signInAnonymously } from 'firebase/auth';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoggingIn(true);
        setError('');

        try {
            // Internal Credentials check
            if (email.trim() === 'admin@beast.com' && password.trim() === 'admin123') {
                // Perform Firebase login to satisfy Firestore rules
                await signInAnonymously(auth);
                localStorage.setItem('isAdmin', 'true');
                navigate('/admin/dashboard');
            } else {
                setError('Invalid email or password');
            }
        } catch (err: any) {
            console.error("Firebase Auth Error:", err);
            setError('Login failed: ' + err.message);
        } finally {
            setIsLoggingIn(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6">
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl w-full max-w-md relative overflow-hidden">
                {/* Decorative background glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-600/10 rounded-full blur-3xl"></div>

                <div className="relative z-10 text-center mb-8">
                    <h1 className="text-3xl font-black text-white mb-2">Admin Panel</h1>
                    <p className="text-zinc-500">Sign in to manage your website</p>
                </div>

                <form onSubmit={handleLogin} className="relative z-10 space-y-6">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Email Address</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-white focus:border-red-600 outline-none transition-all placeholder:text-zinc-700"
                                placeholder="admin@beast.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-zinc-500 uppercase mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-white focus:border-red-600 outline-none transition-all placeholder:text-zinc-700"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoggingIn}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-red-600/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoggingIn ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div className="mt-8 text-center relative z-10">
                    <p className="text-zinc-600 text-sm">Beast Editing Studio &copy; 2024</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
