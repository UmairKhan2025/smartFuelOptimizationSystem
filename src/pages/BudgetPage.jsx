import React, { useEffect, useState } from "react";
import { Badge, BarChart, Icon, PanelHeading } from "../components/ui.jsx";

const spendByVehicle = [
  { vehicle: "Honda City", liters: "22 liters", amount: "₹2,200", share: "34.4%" },
  { vehicle: "Suzuki Swift", liters: "20 liters", amount: "₹2,000", share: "31.3%" },
  { vehicle: "Tata Ace", liters: "8 liters", amount: "₹800", share: "12.5%" },
  { vehicle: "XUV300", liters: "14 liters", amount: "₹1,400", share: "21.9%" }
];

function ExpenseTrendChart() {
  return <div className="expense-trend-chart" role="img" aria-label="Fuel expenses increasing from October 1 to October 6">
    <div className="expense-chart-axis"><span>8,000</span><span>6,000</span><span>4,000</span><span>2,000</span><span>0</span></div>
    <svg viewBox="0 0 620 180" preserveAspectRatio="none" aria-hidden="true">
      <path className="expense-chart-grid" d="M0 20H620M0 56H620M0 92H620M0 128H620M0 164H620" />
      <path className="expense-chart-line" d="M0 145 124 119 248 98 372 68 496 32 620 7" />
    </svg>
    <div className="expense-chart-dates"><span>01 Oct</span><span>02 Oct</span><span>03 Oct</span><span>04 Oct</span><span>05 Oct</span><span>06 Oct</span></div>
  </div>;
}

function BudgetSummaryCard({ icon, title, value, note, tone }) {
  return <article className="panel budget-summary-card"><div className={`budget-summary-icon ${tone}`}><Icon name={icon} size={17} /></div><span>{title}</span><strong>{value}</strong><small>{note}</small></article>;
}

export default function BudgetPage({ budget, spending = 6400, onUpdate }) {
  const [draft, setDraft] = useState(String(budget));
  useEffect(() => setDraft(String(budget)), [budget]);
  const percent = budget > 0 ? Math.min(100, Math.round((spending / budget) * 100)) : 0;
  function submit(event) {
    event.preventDefault();
    const nextBudget = Number(draft);
    if (Number.isFinite(nextBudget) && nextBudget > 0) onUpdate(nextBudget);
  }

  return <>
    <div className="budget-summary-grid">
      <BudgetSummaryCard icon="wallet" title="Monthly Fuel Budget" value={`₹${budget.toLocaleString("en-IN")}`} note="Current October limit" tone="green" />
      <BudgetSummaryCard icon="fuel" title="Current Spending" value={`₹${Math.round(spending).toLocaleString("en-IN")}`} note="Recorded fuel purchases" tone="blue" />
      <BudgetSummaryCard icon="check" title="Remaining Balance" value={`₹${Math.max(0, budget - spending).toLocaleString("en-IN")}`} note={`${Math.max(0, 100 - percent)}% of monthly budget available`} tone="green" />
    </div>
    <section className="panel budget-progress-panel"><div className="budget-progress-heading"><h2>October budget progress</h2><Badge tone={percent >= 80 ? "sand" : "green"}>{percent >= 80 ? "Near limit" : "Within budget"}</Badge></div><div className="budget-progress-track"><i style={{ width: `${percent}%` }} /></div><p>{percent}% used · {percent >= 80 ? "Above" : "Below"} your 80% alert threshold</p></section>
    <div className="budget-analytics-grid">
      <section className="panel chart-panel"><PanelHeading title="Expense trends" note="Fuel purchase cost · 01–06 Oct" /><div className="budget-chart-unit">INR (₹)</div><ExpenseTrendChart /><div className="chart-summary"><span><i className="legend-dot" /> Actual · Demo data</span><strong>₹{Math.round(spending).toLocaleString("en-IN")} <small>this month</small></strong></div></section>
      <section className="panel chart-panel"><PanelHeading title="Monthly comparison" note="Fuel purchase cost · Previous and current months" /><div className="budget-chart-unit">INR (₹)</div><BarChart /><div className="chart-summary"><span><i className="legend-dot" /> Actual · Demo data</span><strong>₹{Math.round(spending).toLocaleString("en-IN")} <small>this month</small></strong></div></section>
    </div>
    <div className="budget-management-grid">
      <section className="panel budget-update-panel"><PanelHeading title="Update your monthly limit" /><form onSubmit={submit}>
        <label className="field-label">Month<select defaultValue="October 2026"><option>October 2026</option><option>November 2026</option></select></label>
        <label className="field-label">Monthly Fuel Budget<input type="number" min="1" value={draft} onChange={(event) => setDraft(event.target.value)} required /></label>
        <button className="button button-primary" type="submit">Update Budget</button>
      </form><p className="budget-form-note">Updates change this month’s limit, not existing purchase records.</p></section>
      <section className="panel budget-vehicle-panel"><PanelHeading title="Spending by vehicle" /><div className="table-scroll"><table><thead><tr><th>Vehicle</th><th>Fuel purchased</th><th>Current Spending</th><th>Share</th></tr></thead><tbody>{spendByVehicle.map((row) => <tr key={row.vehicle}><td>{row.vehicle}</td><td>{row.liters}</td><td>{row.amount}</td><td>{row.share}</td></tr>)}</tbody></table></div></section>
    </div>
    <section className="panel budget-alerts-panel"><PanelHeading title="Budget alert examples" note="Contextual historical states · These are not current October alerts" /><div className="budget-alert-grid">
      <article className="budget-alert warning"><Icon name="alert" size={17} /><div><strong>80% budget consumed</strong><p>June 2026: ₹8,100 spent against a ₹10,000 budget. A threshold alert was issued at ₹8,000.</p></div></article>
      <article className="budget-alert danger"><Icon name="alert" size={17} /><div><strong>Budget exceeded</strong><p>September 2026: ₹8,200 spent against an ₹8,000 limit. The month closed ₹200 over budget.</p></div></article>
    </div></section>
  </>;
}
