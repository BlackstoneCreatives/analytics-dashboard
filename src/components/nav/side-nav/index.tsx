// src/components/nav/side-nav/index.tsx

import Link from "next/link";

export default function SideNav() {
  return (
    <nav style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '18px',
      padding: '36px 0 0 16px',
      minWidth: '220px',
      background: '#1e293b',
      height: '100vh'
    }}>
      <Link href="/dashboard">
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 20 }}>Dashboard</span>
      </Link>
      <Link href="/overview">
        <span style={{ color: '#cbd5e1' }}>Overview</span>
      </Link>
      <Link href="/donor-campaigns">
        <span style={{ color: '#cbd5e1' }}>Donor Campaigns</span>
      </Link>
      <Link href="/volunteer-engagement">
        <span style={{ color: '#cbd5e1' }}>Volunteer Engagement</span>
      </Link>
      <Link href="/fundraising-reports">
        <span style={{ color: '#cbd5e1' }}>Fundraising Reports</span>
      </Link>
      <Link href="/settings">
        <span style={{ color: '#cbd5e1' }}>Settings</span>
      </Link>
    </nav>
  );
}