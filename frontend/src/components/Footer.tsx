import React from 'react';
import { Rocket, ArrowRight } from 'lucide-react';

import { Send, Twitch } from 'lucide-react';

const socials = [
  {
    name: 'Discord',
    href: 'https://discord.gg/hDWrxKSN',
    icon: <Twitch className="w-6 h-6" />,
  },
  {
    name: 'Telegram',
    href: 'https://t.me/hackchaincommunity',
    icon: <Send className="w-6 h-6 mr-1" />,
  },
];

const Footer: React.FC = () => (
  <footer className="py-12 glass border-t border-white/10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="gradient-text text-2xl font-bold mb-4">HackChain</div>
      <p className="text-muted-foreground">
        Revolutionizing cybersecurity certification with blockchain technology
      </p>
      <div className="flex justify-center gap-6 mt-6">
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label={social.name}
          >
            {social.icon}
          </a>
        ))}
      </div>
      <div className="mt-6 text-sm text-muted-foreground">
        © 2025 HackChain. Built on the blockchain for the future.
      </div>
    </div>
  </footer>
);

export default Footer; 