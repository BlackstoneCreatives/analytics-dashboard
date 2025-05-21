// Note: The sidebar border is handled in the sidebar component, not here.
"use client";
import { useEffect, useState } from "react";

// Simulate the Google Ads API (replace with real API call)
async function fetchGoogleAdsMetrics(userId: string) {
  // Simulate API not being ready by toggling this flag:
  const apiActive = false; // Set to true when API is ready and connected
  if (!apiActive) throw new Error("API under review");
  // Example of a successful fetch:
  return {
    impressions: "17,200",
    clicks: "1,980",
    adSpend: "$8,620",
    conversions: "217",
  };
}

const demoMetrics = {
  impressions: "15,430",
  clicks: "2,010",
  adSpend: "$9,280",
  conversions: "312",
  ctr: "13.0%",
  avgCpc: "$1.47",
  conversionRate: "15.5%",
};

export default function DashboardPage() {
  const userId = "demo-user"; // Replace with live session/user context
  const [metrics, setMetrics] = useState<any>(null);
  const [usingDemo, setUsingDemo] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetchGoogleAdsMetrics(userId)
      .then((data) => {
        if (isMounted) {
          setMetrics(data);
          setUsingDemo(false);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setMetrics(demoMetrics);
          setUsingDemo(true);
          setLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, [userId]);

  return (
    <div style={{ background: "#0f172a", minHeight: "100vh", color: "#fff", paddingLeft: 16 }}>
      <header style={{
        background: "#1e293b",
        padding: "28px 0 20px 0",
        textAlign: "center",
        borderBottom: "2px solid #334155",
        marginBottom: 36
      }}>
        <h1 style={{ margin: 0, fontWeight: 800, fontSize: 32, letterSpacing: '1px', color: '#60a5fa' }}>
        AdvanceAI Dashboard
        </h1>
        <p style={{ margin: 8, color: "#cbd5e1", fontSize: 16 }}>
          {usingDemo
            ? "This is a demo preview of your nonprofit’s marketing analytics. Full integration coming soon."
            : "You’re seeing a preview of what’s coming. Live analytics are launching soon."}
        </p>
      </header>
      <main
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: 32,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ display: "flex", gap: 32, justifyContent: "space-between", flexWrap: "nowrap", marginBottom: 24 }}>
          <StatCard label="Impressions" value={metrics?.impressions || "-"} color="#fbbf24" loading={loading} />
          <StatCard label="Clicks" value={metrics?.clicks || "-"} color="#34d399" loading={loading} />
          <StatCard label="Ad Spend (Grant)" value={metrics?.adSpend || "-"} color="#38bdf8" loading={loading} />
          <StatCard label="Conversions" value={metrics?.conversions || "-"} color="#f87171" loading={loading} />
        </div>
        <div style={{ display: "flex", gap: 32, justifyContent: "space-between", flexWrap: "nowrap", marginBottom: 24 }}>
          <StatCard label="CTR" value={metrics?.ctr || "13.0%"} color="#a78bfa" loading={loading} />
          <StatCard label="Avg CPC" value={metrics?.avgCpc || "$1.47"} color="#f472b6" loading={loading} />
          <StatCard label="Conversion Rate" value={metrics?.conversionRate || "15.5%"} color="#60a5fa" loading={loading} />
        </div>
        <div
          style={{
            marginTop: 48,
            background: "#222b3b",
            borderRadius: 18,
            padding: 40,
            minHeight: 200,
            boxShadow: "0 2px 16px #0002",
            width: "100%",
            maxWidth: 900,
          }}
        >
          <h3 style={{ color: "#60a5fa", fontWeight: 600, marginBottom: 12 }}>
            Performance Chart {usingDemo && "(Demo Mode)"}
          </h3>
          {/* You can add chart/graph code here */}
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value, color, loading }: { label: string, value: string, color: string, loading: boolean }) {
  return (
    <div style={{
      width: 220,
      background: "#1e293b",
      borderRadius: 16,
      padding: 32,
      boxShadow: "0 2px 16px #0002",
      marginBottom: 24,
      opacity: loading ? 0.4 : 1,
      transition: "opacity 0.4s"
    }}>
      <h2 style={{ color, fontSize: 28, margin: 0 }}>{value}</h2>
      <p style={{ color: "#e0e7ef", marginTop: 6 }}>{label}</p>
    </div>
  );
}