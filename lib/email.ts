export async function sendAdminEmail(subject:string,text:string){
 const key=process.env.RESEND_API_KEY; const from=process.env.EMAIL_FROM; const to=process.env.ADMIN_EMAIL;
 if(!key||!from||!to)return {sent:false,reason:"email_not_configured"};
 try {
  const r=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:`Bearer ${key}`,"Content-Type":"application/json"},body:JSON.stringify({from,to,subject,text})});
  if(!r.ok){console.error("Email provider error",await r.text());return {sent:false,reason:"provider_error"};}
  return {sent:true};
 } catch(e){console.error("Email provider request failed",e);return {sent:false,reason:"network_error"};}
}
