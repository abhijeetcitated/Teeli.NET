'use client';

import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter logic here
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <footer className="relative w-full bg-deep-void border-t border-nebula-blue/20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Column 1 - Brand */}
          <div>
            <h3 className="text-signal-teal font-bold text-xl mb-4">TEELI</h3>
          </div>

          {/* Column 2 - Product */}
          <div>
            <h4 className="text-starlight font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-starlight/60">
              <li><a href="#" className="hover:text-signal-teal transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-signal-teal transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-signal-teal transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-signal-teal transition-colors">API Reference</a></li>
            </ul>
          </div>

          {/* Column 3 - Company */}
          <div>
            <h4 className="text-starlight font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-starlight/60">
              <li><a href="#" className="hover:text-signal-teal transition-colors">About</a></li>
              <li><a href="#" className="hover:text-signal-teal transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-signal-teal transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-signal-teal transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div>
            <h4 className="text-starlight font-semibold mb-4">Stay Updated</h4>
            <p className="text-sm text-starlight/60 mb-4">
              Get the latest updates on new features and releases
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 bg-cetacean-blue border border-nebula-blue/30 rounded text-sm text-starlight focus:outline-none focus:border-signal-teal"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-signal-teal text-deep-void font-semibold rounded hover:bg-signal-teal/90 transition-colors text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-nebula-blue/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-starlight/40">
            © 2024 TEELI. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-starlight/60">
            <a href="#" className="hover:text-signal-teal transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-signal-teal transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-signal-teal transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
