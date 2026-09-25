import { z } from "zod";
export const contactSchema=z.object({name:z.string().trim().min(2).max(120),email:z.string().email().max(180),phone:z.string().trim().max(40).optional(),company:z.string().trim().max(160).optional(),message:z.string().trim().min(10).max(5000)});
export const quoteSchema=contactSchema.extend({service:z.string().trim().max(120).optional(),budget:z.string().trim().max(120).optional(),timeline:z.string().trim().max(120).optional(),projectType:z.string().trim().max(120).optional()});
export const loginSchema=z.object({email:z.string().email(),password:z.string().min(8).max(200)});

export const signupSchema=z.object({name:z.string().trim().min(2).max(120),email:z.string().email().max(180),password:z.string().min(8).max(200),phone:z.string().trim().max(40).optional(),company:z.string().trim().max(160).optional()});
