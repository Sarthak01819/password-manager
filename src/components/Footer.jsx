import { Heart, Github, Linkedin, Mail } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-slate-900/70 backdrop-blur-md border-t border-white/10 text-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 py-5 gap-4 text-center md:text-left">

        {/* Logo */}
        <div className="logo font-bold text-3xl flex items-center gap-1 cursor-pointer">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
        </div>

        {/* Creator Credit */}
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <span>Created with</span>
          <Heart className="text-red-500 fill-red-500 animate-pulse" />
          <span>by</span>
          <span className="underline underline-offset-2 hover:text-green-400 transition-colors duration-300">
            Sarthak Singh
          </span>
        </div>

        {/* Social Icons */}
        <div className="flex gap-5">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition-all duration-300 hover:scale-110"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 transition-all duration-300 hover:scale-110"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:sarthaksingh.9344@gmail.com"
            className="hover:text-green-400 transition-all duration-300 hover:scale-110"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Sub Footer Line */}
      <div className="border-t border-white/10 py-3 text-xs text-gray-400 text-center">
        © {new Date().getFullYear()} PassOP. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
