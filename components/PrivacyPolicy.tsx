import React from 'react';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white pt-20">
            <div className="container mx-auto px-6 py-20 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-black mb-8 text-red-600">Privacy Policy</h1>
                <p className="text-zinc-500 mb-8">Last updated: January 2024</p>

                <div className="space-y-8 text-zinc-300 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-white">1. Information We Collect</h2>
                        <p>We collect information you provide directly to us, such as when you fill out a contact form, sign up for our services, or communicate with us. This may include your name, email address, phone number, and project details.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-white">2. How We Use Your Information</h2>
                        <p>We use the information we collect to provider, maintain, and improve our services, to process your transactions, to send you technical notices and support messages, and to communicate with you about products, services, offers, and events.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-white">3. Data Security</h2>
                        <p>We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-white">4. Cookies</h2>
                        <p>We may use cookies and similar tracking technologies to track the activity on our service and hold certain information to improve your experience.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-white">5. Contact Us</h2>
                        <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:beastediting24@gmail.com" className="text-red-600 hover:underline">beastediting24@gmail.com</a>.</p>
                    </section>
                </div>
            </div>
            <div className="h-20"></div>
        </div>
    );
};

export default PrivacyPolicy;
