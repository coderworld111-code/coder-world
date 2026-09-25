type Entry={count:number;reset:number};
const store=new Map<string,Entry>();
export function rateLimit(key:string,limit=8,windowMs=60_000){const now=Date.now();const e=store.get(key);if(!e||e.reset<=now){store.set(key,{count:1,reset:now+windowMs});return true;}if(e.count>=limit)return false;e.count++;return true;}
