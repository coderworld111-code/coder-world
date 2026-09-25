import { ServiceCard } from "@/components/service-card";
const data=[
["</>","Software Development","Custom software, SaaS, CRM, ERP, management systems, APIs, backend services and data-driven applications."],
["WEB","Web Development","Corporate websites, web applications, e-commerce, client portals, booking systems, CMS and admin panels."],
["UX","UI/UX Design","User research, flows, wireframes, prototypes, design systems, responsive UI and product design."],
["APP","Mobile Development","Android, iOS and cross-platform applications connected to secure backend services."],
["AI","AI & Automation","AI API integrations, assistants, workflow automation, document processing and intelligent business tools."],
["CLOUD","Cloud & Backend","APIs, authentication, databases, storage, deployment, backups, monitoring and infrastructure foundations."],
["BIZ","Business Systems","CRM, ERP, inventory, billing, HR, appointments, project management and reporting systems."],
["BUILD","Digital Business","Idea validation, branding direction, website, software, automation, launch and technology support."],
];
export default function Services(){return <main><section className="page-hero"><div className="container"><span className="eyebrow">Capabilities</span><h1>Technology services for <span className="gradient">real workflows.</span></h1><p>Choose one capability or combine several into a complete business technology solution.</p></div></section><section className="section"><div className="container grid grid-3">{data.map(([i,t,d])=><ServiceCard key={t} icon={i} title={t} text={d}/>)}</div></section></main>}
