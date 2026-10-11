"use client";

import { useState } from "react";
import Link from "next/link";
import { Brand, Icon } from "./Icons";

const links = [
  { label: "Home", href: "/#home" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Available Proposals", href: "/proposals" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand tagline />
        <nav
          className={open ? "main-nav nav-open" : "main-nav"}
          aria-label="Main navigation"
        >
          <div className="main-nav-links">
            {links.map(({ label, href }) => (
              <Link key={label} href={href} onClick={() => setOpen(false)}>
                {label}
              </Link>
            ))}
          </div>
          <Link
            className="support-button"
            href="/contact"
            onClick={() => setOpen(false)}
          >
            <Icon name="chat" size={18} /> <span>Customer Support</span>
          </Link>
        </nav>
        <button
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>
    </header>
  );
}
