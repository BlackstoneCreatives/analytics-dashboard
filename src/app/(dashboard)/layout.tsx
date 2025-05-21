"use client";
import { TopNav } from "@/components/nav";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClientComponentClient, User } from "@supabase/auth-helpers-nextjs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      }: { data: { user: User | null } } = await supabase.auth.getUser();
      if (user?.email) {
        setUserEmail(user.email);
      }
    };
    fetchUser();
  }, [supabase]);

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      background: "#101828",
      color: "#fff"
    }}>
      
      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <TopNav title="Dashboard" />
        <main style={{ padding: "32px 48px", flex: 1 }}>{children}</main>
      </div>
    </div>
  );
}