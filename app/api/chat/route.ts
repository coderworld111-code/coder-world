import { NextResponse } from "next/server";
import { requireAdminSession, requireClientSession } from "@/lib/auth";
import { adminDb } from "@/lib/firebase-admin";

function conversationRef(uid:string){ return adminDb().collection("conversations").doc(uid); }
export async function GET(req:Request){
 const url=new URL(req.url); const requested=url.searchParams.get("clientId"); const admin=await requireAdminSession(); const client=admin?null:await requireClientSession();
 const uid=admin ? requested : client?.userId;
 if(!uid) return NextResponse.json({success:false,error:{message:"Unauthorized."}},{status:401});
 const snap=await conversationRef(uid).collection("messages").orderBy("createdAt","asc").limitToLast(100).get();
 return NextResponse.json({success:true,clientId:uid,messages:snap.docs.map(d=>({id:d.id,...d.data(),createdAt:d.data().createdAt?.toDate?.()?.toISOString?.()||null}))});
}
export async function POST(req:Request){
 const admin=await requireAdminSession(); const client=admin?null:await requireClientSession(); const body=await req.json(); const uid=admin?String(body.clientId||""):client?.userId;
 const message=String(body.message||"").trim(); if(!uid)return NextResponse.json({success:false,error:{message:"Unauthorized."}},{status:401}); if(message.length<1||message.length>4000)return NextResponse.json({success:false,error:{message:"Message must be 1-4000 characters."}},{status:422});
 const now=new Date(); const conv=conversationRef(uid); await conv.set({clientId:uid,updatedAt:now,lastMessage:message,lastSender:admin?"ADMIN":"CLIENT"},{merge:true}); const ref=await conv.collection("messages").add({senderId:admin?.userId||client!.userId,senderRole:admin?"ADMIN":"CLIENT",message,createdAt:now,read:false}); return NextResponse.json({success:true,id:ref.id});
}
