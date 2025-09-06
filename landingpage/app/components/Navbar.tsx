"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react"; 
import  Link from "next/link";
import HeroSlider from "../Hero";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About-us", href:"#about" },
    { name: "E-portal", href: "#courses" },
    {name: "Contact", href: "#contact"},
    {name: "image" , href:"#image"}

  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#3B82F6] shadow-md  ">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
    
        <h1 className="text-base font-medium text-white">FaithLife international school</h1>


        <ul className="hidden md:flex gap-8 text-white font-medium">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="hover:text-white-600 transition-colors"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

    
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

    
      {isOpen && (
        <ul className="md:hidden flex flex-col gap-4 px-6 pb-4 bg-white shadow-lg">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="block text-gray-700 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
