import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth";
import { adminDb } from "@/lib/firebase-admin";
export async function GET(){ const s=await requireAdminSession(); if(!s)return NextResponse.json({success:false,error:{message:"Unauthorized."}},{status:401}); const snap=await adminDb().collection("conversations").orderBy("updatedAt","desc").get(); const items=[]; for(const d of snap.docs){const u=await adminDb().collection("users").doc(d.id).get();items.push({clientId:d.id,...d.data(),client:u.data()||{}});} return NextResponse.json({success:true,conversations:items}); }
