"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon } from "./Icons";
const links = [
    ["Home", "/#home"],
    ["Profiles", "/proposals"], ["About Us", "/about"], ["Success Stories", "/#stories"], ["Our Services", "/services"], ["Contact", "/contact"]];
export default function Footer() { return <footer className="site-footer"><div className="footer-main"><div className="footer-brand"><Link href="/#home" className="brand brand-light" aria-label="Trust Forever home"><Image src="/images/hero/footer-logo.png" alt="Trust Forever" width={880} height={160} sizes="(max-width: 480px) 132px, (max-width: 950px) 170px, 225px" className="brand-logo" style={{ width: "var(--brand-logo-width, 225px)", height: "auto", maxWidth: "100%" }} /></Link></div><div className="footer-nav"><span className="footer-label">EXPLORE</span><nav>{links.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}</nav></div><div className="footer-social"><span className="footer-label">STAY CONNECTED</span><p>Thoughtful introductions, straight to your feed.</p><div className="social-links"><a href="https://facebook.com" aria-label="Facebook"><Icon name="facebook" size={17} /></a><a href="https://instagram.com" aria-label="Instagram"><Icon name="instagram" size={17} /></a><a href="https://youtube.com" aria-label="YouTube"><Icon name="youtube" size={17} /></a><a href="https://x.com" aria-label="X"><Icon name="x" size={16} /></a></div></div></div><div className="footer-bottom"><span>© 2026 Trust Forever Marriage Bureau. All rights reserved.</span><div><Link href="/contact">Privacy Policy</Link><Link href="/contact">Terms &amp; Conditions</Link></div><span className="footer-country">Made with care in Pakistan <b>✳</b></span></div></footer>; }
