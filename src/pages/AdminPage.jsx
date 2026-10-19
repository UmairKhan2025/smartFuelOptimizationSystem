import React, { useMemo, useState } from "react";
import { Badge, Icon, LineChart, PanelHeading } from "../components/ui.jsx";

const users = [
  { name: "Aditi Mehra", email: "aditi.mehra@email.com", type: "Individual", organization: "—", status: "Active" },
  { name: "Rahul Nair", email: "rahul.nair@email.com", type: "Individual", organization: "—", status: "Active" },
  { name: "Northstar Mobility", email: "fleet@northstar.io", type: "Organization", organization: "Northstar", status: "Active" },
  { name: "Kavya Rao", email: "kavya.rao@email.com", type: "Individual", organization: "—", status: "Pending" },
  { name: "Greenline Logistics", email: "ops@greenline.io", type: "Organization", organization: "Greenline", status: "Active" }
];

const activities = [
  ["10:42 AM", "A new organization workspace was created"],
  ["10:28 AM", "Trip optimization request completed"],
  ["09:56 AM", "Fuel record verified and saved"]
];

export default function AdminPage({ onNotify }) {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All types");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const filteredUsers = useMemo(() => users.filter((user) =>
    `${user.name} ${user.email} ${user.organization}`.toLowerCase().includes(query.trim().toLowerCase())
    && (typeFilter === "All types" || user.type === typeFilter)
    && (statusFilter === "All statuses" || user.status === statusFilter)
  ), [query, statusFilter, typeFilter]);

  return <>
    <div className="admin-summary-grid">
      <article><span className="admin-summary-icon mint"><Icon name="users" size={18} /></span><span>Total users</span><strong>6,800</strong><small>↑ 12% this month</small></article>
      <article><span className="admin-summary-icon blue"><Icon name="car" size={18} /></span><span>Active vehicles</span><strong>120</strong><small>Across all accounts</small></article>
      <article><span className="admin-summary-icon gold"><Icon name="route" size={18} /></span><span>Trips optimized</span><strong>6,400</strong><small>↑ 18% this month</small></article>
    </div>
    <section className="panel admin-analytics"><PanelHeading title="System analytics" note="Platform-wide resource impact" select="This month" /><div className="impact-grid"><div><strong>256,000 L</strong><span>Fuel consumed</span></div><div><strong>48,200</strong><span>Total trips</span></div><div><strong>12,800 L</strong><span>Estimated fuel saved</span></div></div><div className="admin-impact-note"><Icon name="leaf" size={15} /> Savings are modeled estimates from the demo dataset, not verified impact.</div></section>
    <section className="panel table-panel admin-users"><PanelHeading title="User management" note="Review and manage workspace access" action={<div className="admin-user-filters"><label className="admin-search"><Icon name="search" size={14} /><input aria-label="Search users" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search users" /></label><select aria-label="Filter by user type" value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}><option>All types</option><option>Individual</option><option>Organization</option></select><select aria-label="Filter by status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option>All statuses</option><option>Active</option><option>Pending</option></select></div>} /><div className="table-scroll"><table><thead><tr><th>USER</th><th>EMAIL</th><th>USER TYPE</th><th>ORGANIZATION</th><th>STATUS</th><th>ACTION</th></tr></thead><tbody>{filteredUsers.map((user) => <tr key={user.email}><td><span className="table-main"><span className="table-avatar">{user.name.split(" ").map((part) => part[0]).join("")}</span>{user.name}</span></td><td>{user.email}</td><td>{user.type}</td><td>{user.organization}</td><td><Badge tone={user.status === "Active" ? "green" : "sand"} dot>{user.status}</Badge></td><td><button className="text-button" onClick={() => onNotify(`Manage access for ${user.name}.`)}>Manage <Icon name="chevron" size={13} /></button></td></tr>)}</tbody></table>{filteredUsers.length === 0 && <p className="admin-empty-state">No users match these filters.</p>}</div></section>
    <div className="content-grid admin-lower"><section className="panel"><PanelHeading title="System activity" note="Recent events across the platform" action={<button className="small-control" onClick={() => onNotify("Showing the latest system activity.")}>View all <Icon name="arrow" size={13} /></button>} />{activities.map(([time, event]) => <div className="activity-row" key={event}><span className="activity-time">{time}</span><span className="activity-dot" />{event}</div>)}</section><section className="panel chart-panel"><PanelHeading title="Platform activity" note="Optimized trips over time" select="This month" /><LineChart label="Platform trips over time" /><div className="chart-summary"><span><i className="legend-dot" /> Optimized trips</span><strong>6,400 <small>this month</small></strong></div></section></div>
  </>;
}
