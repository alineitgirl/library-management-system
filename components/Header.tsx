"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Session } from "next-auth";
import { getInitials } from "@/lib/utils";
import { handleLogout } from "@/lib/actions/auth";

const Header = ({ session }: { session: Session }) => {
  const pathName = usePathname();

  return (
    <header className="my-10 flex items-center gap-5">
      <Link href="/">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
      </Link>
      <h1 className="text-2xl font-semibold text-white">BookWise</h1>

      <div className="ml-auto flex items-center gap-8">
        <ul className="flex items-center gap-8">
          <li>
            <Link
              href="/"
              className={cn(
                "text-base cursor-pointer capitalize",
                pathName === "/" ? "text-light-200" : "text-light-100"
              )}
            >
              Главная
            </Link>
          </li>

          <li>
            <Link
              href="/search"
              className={cn(
                "text-base cursor-pointer capitalize",
                pathName === "/search" ? "text-light-200" : "text-light-100"
              )}
            >
              Поиск
            </Link>
          </li>

          <li>
            <Link href="/my-profile">
              <Avatar>
                <AvatarFallback className="bg-amber-100">
                  {getInitials(session?.user?.name || "IN")}
                </AvatarFallback>
              </Avatar>
            </Link>
          </li>
        </ul>

        <button onClick={handleLogout} className="cursor-pointer p-2">
          <Image src="/icons/logout.svg" alt="logout" width={25} height={25} />
        </button>
      </div>
    </header>
  );
};

export default Header;
