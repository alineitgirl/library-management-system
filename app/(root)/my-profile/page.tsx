// app/profile/page.tsx (или ваш путь)
import { Button } from "@/components/ui/button";
import { handleLogout } from "@/lib/actions/auth";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";


export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  const userRecord = await db
    .select({ role: users.role })
    .from(users)
    .where(eq(users.id, session.user.id as string)) 
    .limit(1);

  const isAdmin = userRecord[0]?.role === "ADMIN"; 

  return (
      <div className="flex p-2 justify-end">

        {isAdmin && (
          <Link href="/admin">
            <Button className="shadow-lg shadow-dark-400">
              Перейти на админ панель
            </Button>
          </Link>
        )}
      </div>
  );
}