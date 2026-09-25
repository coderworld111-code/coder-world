import Link from "next/link";
import Image from "next/image";
import { MobileMenu } from "./mobile-menu";

const links = [
  ["About", "/about"], ["Services", "/services"], ["Solutions", "/solutions"], ["Work", "/portfolio"], ["Process", "/process"], ["Technologies", "/technologies"], ["Blog", "/blog"]
];
export function SiteHeader(){return <header className="site-header"><div className="container nav"><Link href="/" className="brand"><Image src="/coder-world-logo.jpeg" alt="CODER WORLD logo" width={42} height={42}/><span>CODER <span className="gradient">WORLD</span></span></Link><nav className="nav-links">{links.map(([label,href])=><Link key={href} href={href}>{label}</Link>)}</nav><div className="nav-cta"><Link className="btn btn-small hide-mobile" href="/login">Client Login</Link><Link className="btn btn-primary btn-small" href="/quote">Start a Project</Link><MobileMenu /></div></div></header>}
