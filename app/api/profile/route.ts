import { NextResponse } from "next/server";
import { requireClientSession } from "@/lib/auth";
import { adminDb } from "@/lib/firebase-admin";
import { signupSchema } from "@/lib/validation";
export async function GET(){ const s=await requireClientSession(); if(!s)return NextResponse.json({success:false,error:{message:"Unauthorized."}},{status:401}); const snap=await adminDb().collection("users").doc(s.userId).get(); return NextResponse.json({success:true,profile:snap.data()||{}}); }
export async function PATCH(req:Request){ const s=await requireClientSession(); if(!s)return NextResponse.json({success:false,error:{message:"Unauthorized."}},{status:401}); try{const p=signupSchema.pick({name:true,phone:true,company:true}).partial().parse(await req.json()); const now=new Date(); await adminDb().collection("users").doc(s.userId).set({...p,updatedAt:now},{merge:true}); await adminDb().collection("clients").doc(s.userId).set({uid:s.userId,email:s.email,...p,updatedAt:now},{merge:true}); return NextResponse.json({success:true});}catch{return NextResponse.json({success:false,error:{message:"Invalid profile details."}},{status:422});}}
