import React from "react";
import { Badge, Button, Icon, LineChart, BarChart, PanelHeading } from "../components/ui.jsx";

const trips = [
  { name: "Office commute", distance: "18 km", fuel: "1.00 L", cost: "₹100", score: "92 / 100" },
  { name: "Weekend errands", distance: "24 km", fuel: "1.40 L", cost: "₹140", score: "88 / 100" },
  { name: "Airport pickup", distance: "32 km", fuel: "2.00 L", cost: "₹200", score: "95 / 100" },
  { name: "Client meeting", distance: "36 km", fuel: "2.00 L", cost: "₹200", score: "91 / 100" }
];

function CurrentFuelCard() {
  return <section className="panel dashboard-status-card">
    <PanelHeading title="Current Fuel Status" note="Honda City · Updated 06 Oct, 08:30" />
    <div className="dashboard-fuel-metrics"><div><strong>24 liters</strong><span>Remaining Fuel</span></div><div><strong>18 km/l</strong><span>Average Consumption</span></div><div><strong>432 km</strong><span>Estimated Remaining Distance</span></div></div>
    <div className="dashboard-progress"><i style={{ width: "60%" }} /></div>
    <p className="dashboard-footnote">60% of 40-liter tank · Range modeled from average mileage</p>
  </section>;
}

function MonthlyBudgetCard({ budget, spending }) {
  const remaining = Math.max(0, budget - spending);
  const percent = budget ? Math.min(100, Math.round((spending / budget) * 100)) : 0;
  const currency = (amount) => `₹${Math.round(amount).toLocaleString("en-IN")}`;
  return <section className="panel dashboard-status-card">
    <PanelHeading title="Monthly Budget" note="October 2026 · Individual workspace" />
    <div className="dashboard-budget-metrics"><div><strong>{currency(budget)}</strong><span>Total Budget</span></div><div><strong>{currency(spending)}</strong><span>Used Amount</span></div><div><strong>{currency(remaining)}</strong><span>Remaining Amount</span></div></div>
    <div className="dashboard-progress"><i style={{ width: `${percent}%` }} /></div>
    <p className="dashboard-footnote positive">{percent}% used · {currency(remaining)} available this month</p>
  </section>;
}

function RecentTripsCard() {
  return <section className="panel dashboard-trips-card">
    <PanelHeading title="Recent Trips" note="Most recent journeys · Calculated estimates" />
    <div className="table-scroll"><table><thead><tr><th>Trip Name</th><th>Distance</th><th>Fuel Used</th><th>Cost</th><th>Efficiency Score</th></tr></thead><tbody>{trips.map((trip) => <tr key={trip.name}><td>{trip.name}</td><td>{trip.distance}</td><td>{trip.fuel}</td><td>{trip.cost}</td><td>{trip.score}</td></tr>)}</tbody></table></div>
  </section>;
}

function SmartRecommendations() {
  return <section className="panel dashboard-recommendations">
    <PanelHeading title="Smart Recommendations" />
    <div className="dashboard-recommendation-grid">
      <article className="dashboard-recommendation success"><Icon name="sparkles" size={18} /><div><strong>Combine nearby trips to save 15% fuel</strong><p>Your grocery stop and pharmacy pickup are 2 km apart. Plan them together; modeled estimate.</p></div></article>
      <article className="dashboard-recommendation warning"><Icon name="alert" size={18} /><div><strong>Your vehicle efficiency decreased this month</strong><p>Honda City: 18 km/l vs 19 km/l in September. Check tire pressure and idling habits.</p></div></article>
    </div>
  </section>;
}

export default function DashboardPage({ budget, spending, onPlanTrip, onAddFuel }) {
  return <>
    <div className="dashboard-actions"><Button icon="route" onClick={onPlanTrip}>Plan Trip</Button><Button variant="outline" icon="plus" onClick={onAddFuel}>Add Fuel Record</Button></div>
    <div className="dashboard-status-grid"><CurrentFuelCard /><MonthlyBudgetCard budget={budget} spending={spending} /></div>
    <div className="content-grid charts-row dashboard-chart-grid">
      <section className="panel chart-panel"><PanelHeading title="Weekly consumption" note="28 Sep – 04 Oct · Honda City" /><LineChart label="Weekly fuel consumption, in liters" /><div className="chart-summary"><span><i className="legend-dot" /> Actual · Demo data</span><strong>24.8 L <small>this week</small></strong></div></section>
      <section className="panel chart-panel"><PanelHeading title="Monthly cost" note="Fuel purchases · INR (₹)" /><BarChart /><div className="chart-summary"><span><i className="legend-dot" /> Actual · Demo data</span><strong>₹{Math.round(spending).toLocaleString("en-IN")} <small>this month</small></strong></div></section>
    </div>
    <RecentTripsCard />
    <SmartRecommendations />
  </>;
}
