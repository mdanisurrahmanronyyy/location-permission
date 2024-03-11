import UserInfo from "@/components/UserInfo";
import Link from "next/link";
import { getServerAuthSession } from "../server/auth";

export default async function HomePage() {
  const authSession = await getServerAuthSession();

  return (
    <main className="flex h-screen items-center justify-center">
      {authSession?.user && <UserInfo user={authSession?.user} />}
      {!authSession?.user && (
        <Link
          className="mt-2 font-medium text-blue-600 hover:underline"
          href="/"
        >
          Login
        </Link>
      )}
    </main>
  );
}
