import Link from "next/link";
export function ServiceCard({icon,title,text}:{icon:string,title:string,text:string}){return <article className="card service-card"><div className="service-icon">{icon}</div><h3>{title}</h3><p>{text}</p><Link href="/services">Explore service →</Link></article>}
