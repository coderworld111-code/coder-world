"use client";
import Link from "next/link"; import {useState} from "react";
const links=[['About','/about'],['Services','/services'],['Solutions','/solutions'],['Work','/portfolio'],['Process','/process'],['Technologies','/technologies'],['Blog','/blog']];
export function MobileMenu(){const [open,setOpen]=useState(false);return <><button className="btn btn-small mobile-menu" aria-label="Navigation menu" aria-expanded={open} onClick={()=>setOpen(!open)}>☰</button>{open&&<div className="mobile-panel">{links.map(([label,href])=><Link key={href} href={href} onClick={()=>setOpen(false)}>{label}</Link>)}<Link href="/login" onClick={()=>setOpen(false)}>Client Login</Link></div>}</>}
