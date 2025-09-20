// src/components/Header/Header.tsx
import React from "react";

/**
 * Application header with title and navigation elements
 * @param {Object} props - Component props
 * @param {string} props.title - Main application title to display in header
 * @param {string} props.subtitle - Optional subtitle or tagline for additional context
 */
interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header
      className="w-full mb-8 flex justify-between items-center 
         px-5 py-6 rounded-xl text-white 
         shadow-md 
         bg-gradient-to-br from-indigo-600 to-purple-600
         box-border"
    >
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-2 text-white">{title}</h1>
        {subtitle && (
          <p className="text-base m-0 opacity-90 text-indigo-100">{subtitle}</p>
        )}
      </div>
      <nav className="flex gap-3">
        <button
          className="
            bg-white/10 border border-white/20 text-white 
            px-4 py-2 rounded-md text-sm font-medium cursor-pointer 
            transition-all duration-200 
            hover:bg-white/20 hover:-translate-y-0.5
            [&.active]:bg-white/20 [&.active]:border-white/40
          "
        >
          Dashboard
        </button>
        <button
          className="
            bg-white/10 border border-white/20 text-white 
            px-4 py-2.5 rounded-md text-sm font-medium cursor-pointer 
            transition-all duration-200 
            hover:bg-white/20 hover:-translate-y-0.5
          "
        >
          Analytics
        </button>
        <button
          className="
            bg-white/10 border border-white/20 text-white 
            px-4 py-2.5 rounded-md text-sm font-medium cursor-pointer 
            transition-all duration-200 
            hover:bg-white/20 hover:-translate-y-0.5
         "
        >
          Settings
        </button>
      </nav>
    </header>
  );
};

export default Header;
