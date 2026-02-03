import React from 'react';

const TermsOfService: React.FC = () => {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white pt-20">
            <div className="container mx-auto px-6 py-20 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-black mb-8 text-red-600">Terms of Service</h1>
                <p className="text-zinc-500 mb-8">Last updated: January 2024</p>

                <div className="space-y-8 text-zinc-300 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-white">1. Acceptance of Terms</h2>
                        <p>By accessing and using the website and services of Beast Editing Studio ("we," "us," or "our"), you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-white">2. Services</h2>
                        <p>We provide video editing, 3D visualization, motion graphics, and AI-powered commercial production services. All deliverables are subject to the specific scope of work agreed upon in your project contract or invoice.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-white">3. Payments and Refunds</h2>
                        <p>Payments for services are due as per the terms specified in your invoice. We generally require an upfront deposit before work begins. Refunds are handled on a case-by-case basis and are typically not issued once creative work has commenced, except as required by law.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-white">4. Intellectual Property</h2>
                        <p>Upon full payment, you grant us a non-exclusive license to use the final deliverables for our portfolio and marketing purposes, unless otherwise agreed in writing. You retain ownership of the final deliverables for your business use.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-white">5. Limitation of Liability</h2>
                        <p>Beast Editing Studio shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-4 text-white">6. Contact Us</h2>
                        <p>If you have any questions about these Terms, please contact us at <a href="mailto:beastediting24@gmail.com" className="text-red-600 hover:underline">beastediting24@gmail.com</a>.</p>
                    </section>
                </div>
            </div>
            <div className="h-20"></div>
        </div>
    );
};

export default TermsOfService;
