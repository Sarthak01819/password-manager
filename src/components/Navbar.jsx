"use client"

import React, { useState } from "react";
import { Github, Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-slate-900/70 border-b border-white/10">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4 text-white">
        {/* Logo */}
        <div className="logo font-bold text-3xl cursor-pointer flex items-center gap-1">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
        </div>

        {/* Desktop GitHub Button */}
        <div className="hidden md:flex">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-2 items-center font-semibold bg-white/10 hover:bg-white/20 border border-white/20 hover:border-green-400 rounded-full py-2 px-5 transition-all duration-300 hover:text-green-400"
          >
            <Github className="h-5 w-5" />
            <span>GitHub</span>
          </a>
        </div>

        {/* Hamburger Menu */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden focus:outline-none"
        >
          {open ? (
            <X className="h-7 w-7 text-green-400 transition-transform duration-300" />
          ) : (
            <Menu className="h-7 w-7 text-green-400 transition-transform duration-300" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-white/10 flex flex-col items-center gap-4 py-5 transition-all duration-300 ${
          open
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-5 invisible"
        }`}
      >
        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-2 items-center font-semibold bg-white/10 hover:bg-white/20 border border-white/20 hover:border-green-400 rounded-full py-2 px-6 transition-all duration-300 hover:text-green-400"
        >
          <Github className="h-5 w-5" />
          <span>GitHub</span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
