'use server';

import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { signIn } from "@/auth";
import ratelimit from "../ratelimit";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { signOut } from "@/auth";


export const signInWithCredentials = async (params: Pick<AuthCredentials, "email" | "password">) => {
    const { email, password } = params;

    try {
        const headersList = await headers();
        const ip = headersList.get("x-forwarded-for") || "127.0.0.1";
        const {success} = await ratelimit.limit(ip);

        if (!success) {
            return redirect("/too-fast");
        }

        const result = await signIn("credentials", {
            email: email,
            password: password,
            redirect: false,
        });

        if (result?.error) {
            return { success: false, error: result.error };
        }

        return { success: true };
        
    } catch (error) {
        console.log(error, "Sign-in error");
        return { success: false, error: "Sign-in error."};
    }
}

export const signUp = async(params : AuthCredentials) => {
    const { fullName, email, universityId, password, universityCard} = params;

    try {
        const headersList = await headers();
        const ip = headersList.get("x-forwarded-for") || "127.0.0.1";
        const {success} = await ratelimit.limit(ip);

        if (!success) {
            return redirect("/too-fast");
        }

        const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

        if (existingUser.length > 0)  {
            return { success: false, error: "User already exists."};
        }

        const hashedPassword = await hash(password, 10);

        await db.insert(users)
        .values({
            fullName,
            email,
            universityId,
            password: hashedPassword,
            universityCard,
        });

        await signInWithCredentials({ email, password});

        return { success: true };
        
    } catch (error) {
        console.log(error, "Sign-up error");
        return { success: false, error: "Signup error."};
    }
};

export const handleLogout = async () => {
    'use server';
    await signOut({ redirect: true, redirectTo: '/sign-in' });
};