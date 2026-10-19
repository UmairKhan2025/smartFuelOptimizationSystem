import React from "react";
import { Badge, BarChart, Icon, LineChart, MetricCard, PanelHeading } from "../components/ui.jsx";

const fleet = [
  ["Honda City", "Aditi Mehra", "1,432 km", "18.2 km/l", "72%", "On trip"],
  ["Tata Nexon EV", "Rahul Nair", "1,108 km", "7.2 km/kWh", "84%", "Available"],
  ["Royal Enfield", "Kavya Rao", "842 km", "35 km/l", "48%", "Available"],
  ["Hyundai Creta", "Unassigned", "—", "14.8 km/l", "91%", "Available"]
];

export default function OrganizationDashboardPage() {
  return <>
    <div className="metric-grid">
      <MetricCard icon="car" label="Fleet vehicles" value="42" change="38 active" note="across 3 locations" tone="mint" />
      <MetricCard icon="users" label="Team members" value="28" change="↑ 4" note="joined this month" tone="blue" />
      <MetricCard icon="fuel" label="Fuel this month" value="2,840|L" change="↓ 6.4%" note="vs. last month" tone="gold" />
      <MetricCard icon="wallet" label="Fleet spend" value="₹ 2.1L" change="72%" note="of ₹ 2.9L budget" tone="rose" />
    </div>
    <div className="content-grid charts-row">
      <section className="panel chart-panel"><PanelHeading title="Fleet fuel consumption" note="Liters used across your team" select="This month" /><LineChart /><div className="chart-summary"><span><i className="legend-dot" /> Fuel consumed</span><strong>2,840 L <small>this month</small></strong></div></section>
      <section className="panel chart-panel"><PanelHeading title="Monthly fleet spend" note="Your organization's fuel costs" select="6 months" /><BarChart /><div className="chart-summary"><span><i className="legend-dot legend-sand" /> Fleet spend</span><strong>₹ 2.1L <small>this month</small></strong></div></section>
    </div>
    <section className="panel table-panel admin-users"><PanelHeading title="Fleet overview" note="Vehicle health and team usage" action={<button className="text-button">Manage fleet <Icon name="arrow" size={14} /></button>} /><div className="table-scroll"><table><thead><tr><th>VEHICLE</th><th>ASSIGNED TO</th><th>DISTANCE THIS MONTH</th><th>FUEL EFFICIENCY</th><th>FUEL STATUS</th><th>STATUS</th></tr></thead><tbody>{fleet.map(([vehicle, member, distance, efficiency, fuel, status]) => <tr key={vehicle}><td><span className="table-main"><span className="table-icon"><Icon name="car" size={15} /></span>{vehicle}</span></td><td>{member}</td><td>{distance}</td><td>{efficiency}</td><td><span className="fleet-fuel-level"><i><b style={{ width: fuel }} /></i>{fuel}</span></td><td><Badge tone={status === "On trip" ? "blue" : "green"} dot>{status}</Badge></td></tr>)}</tbody></table></div></section>
    <div className="organization-note"><span className="impact-icon mint"><Icon name="leaf" size={17} /></span><div><strong>Your fleet's efficiency is up 6.4% this month.</strong><p>Smart route planning helped your team save an estimated 186 liters of fuel.</p></div><Badge tone="green">Good progress</Badge></div>
  </>;
}
