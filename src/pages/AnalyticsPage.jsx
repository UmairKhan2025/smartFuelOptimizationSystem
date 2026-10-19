import React, { useState } from "react";
import { Button, Icon } from "../components/ui.jsx";

const vehicles = [
  { name: "City", mileage: 18, previous: "19 km/l", trend: "−5.3%" },
  { name: "Swift", mileage: 20, previous: "20 km/l", trend: "Stable" },
  { name: "Ace", mileage: 12, previous: "11.5 km/l", trend: "+4.3%" },
  { name: "XUV300", mileage: 14, previous: "14 km/l", trend: "Stable" }
];

function AnalyticsLineChart() {
  return <div className="analytics-line-chart" role="img" aria-label="Daily trip fuel consumption, 01 to 06 October">
    <div className="analytics-chart-axis"><span>6</span><span>4.5</span><span>3</span><span>1.5</span><span>0</span></div>
    <svg viewBox="0 0 520 160" preserveAspectRatio="none" aria-hidden="true"><path d="M0 15H520M0 47H520M0 79H520M0 111H520M0 143H520" className="analytics-grid-line" /><path d="M0 112 104 84 208 57 312 112 416 84 520 84" className="analytics-line" /></svg>
    <div className="analytics-chart-dates"><span>01 Oct</span><span>02 Oct</span><span>03 Oct</span><span>04 Oct</span><span>05 Oct</span><span>06 Oct</span></div>
  </div>;
}

function AnalyticsBars({ values, labels, max }) {
  return <div className="analytics-bars" role="img" aria-label="Comparison chart">
    {values.map((value, index) => <div className="analytics-bar-column" key={labels[index]}><span>{value}</span><i style={{ height: `${(value / max) * 100}%` }} /><small>{labels[index]}</small></div>)}
  </div>;
}

function downloadReport(spending) {
  const report = [
    ["Metric", "Value"],
    ["Fuel consumed", "23 liters"],
    ["Fuel purchase cost", `₹${Math.round(spending).toLocaleString("en-IN")}`],
    ["Average trip score", "91 / 100"],
    ["Date range", "01–06 Oct 2026"]
  ].map((row) => row.join(",")).join("\r\n");
  const url = URL.createObjectURL(new Blob([report], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "smart-fuel-analytics.csv";
  link.click();
  URL.revokeObjectURL(url);
}

export default function AnalyticsPage({ spending }) {
  const [dateRange, setDateRange] = useState("01 – 06 Oct 2026");
  const [vehicle, setVehicle] = useState("All vehicles");
  const [tripType, setTripType] = useState("All trip types");
  const [applied, setApplied] = useState({ dateRange, vehicle, tripType });
  const currency = `₹${Math.round(spending).toLocaleString("en-IN")}`;
  const [notice, setNotice] = useState("");

  function applyFilters(event) {
    event.preventDefault();
    setApplied({ dateRange, vehicle, tripType });
    setNotice("Analytics filters applied.");
  }

  return <>
    <div className="analytics-toolbar"><span>Filters</span><Button variant="outline" icon="download" onClick={() => downloadReport(spending)}>Export Report</Button></div>
    <form className="analytics-filter-form" onSubmit={applyFilters}>
      <label className="field-label">Date Range<select value={dateRange} onChange={(event) => setDateRange(event.target.value)}><option>01 – 06 Oct 2026</option><option>01 – 31 Oct 2026</option><option>01 – 30 Sep 2026</option></select></label>
      <label className="field-label">Vehicle<select value={vehicle} onChange={(event) => setVehicle(event.target.value)}><option>All vehicles</option>{vehicles.map((item) => <option key={item.name}>{item.name}</option>)}</select></label>
      <label className="field-label">Trip Type<select value={tripType} onChange={(event) => setTripType(event.target.value)}><option>All trip types</option><option>Commute</option><option>Errands</option><option>Personal</option></select></label>
      <Button type="submit">Apply Filters</Button>
    </form>
    {notice && <p className="analytics-notice" role="status">{notice} Showing {applied.dateRange} · {applied.vehicle} · {applied.tripType.toLowerCase()}.</p>}

    <div className="analytics-summary-grid">
      <article className="panel analytics-summary-card"><Icon name="fuel" size={17} /><span>Fuel consumed</span><strong>23 liters</strong><small>Tracked trips · Not purchased fuel</small></article>
      <article className="panel analytics-summary-card"><Icon name="wallet" size={17} /><span>Fuel purchase cost</span><strong>{currency}</strong><small>Tracked purchases this month</small></article>
      <article className="panel analytics-summary-card"><Icon name="target" size={17} /><span>Average trip score</span><strong>91 / 100</strong><small>Demo model · Higher is better</small></article>
    </div>

    <div className="analytics-visual-grid">
      <section className="panel analytics-chart-card"><h2>Fuel Consumption Over Time</h2><p>Daily trip consumption · {applied.vehicle}</p><small className="analytics-unit">liters</small><AnalyticsLineChart /><span className="analytics-legend"><i /> Actual · Demo data</span></section>
      <section className="panel analytics-chart-card cost-chart-card"><h2>Cost Analysis</h2><p>Fuel purchase spending attributed to trip purpose · Demo allocation</p><div className="cost-analysis-content"><div className="cost-donut"><div><strong>{currency}</strong><small>October cost</small></div></div><ul><li><i className="commute" /><span>Commute<small>60% · ₹{Math.round(spending * .6).toLocaleString("en-IN")}</small></span></li><li><i className="errands" /><span>Errands<small>25% · ₹{Math.round(spending * .25).toLocaleString("en-IN")}</small></span></li><li><i className="personal" /><span>Personal<small>15% · ₹{Math.round(spending * .15).toLocaleString("en-IN")}</small></span></li></ul></div><small className="chart-disclaimer">Allocation by planned use, not a statement of fuel consumed.</small></section>
      <section className="panel analytics-chart-card"><h2>Vehicle Efficiency Comparison</h2><p>Average mileage · Higher values mean more km per liter</p><AnalyticsBars values={[18, 20, 12, 14]} labels={vehicles.map((item) => item.name)} max={24} /><small className="analytics-legend"><i /> Actual · Demo data</small></section>
      <section className="panel analytics-chart-card"><h2>Trip Efficiency Score</h2><p>Score out of 100 · Based on fuel, route and stop-and-start driving</p><AnalyticsBars values={[92, 88, 95, 91]} labels={["Commute", "Errands", "Airport", "Client"]} max={100} /><small className="analytics-legend"><i /> Actual · Demo data</small></section>
    </div>
    <section className="panel analytics-vehicle-table"><h2>Vehicle performance details</h2><div className="table-scroll"><table><thead><tr><th>Vehicle</th><th>Fuel Type</th><th>Average Mileage</th><th>Previous Month</th><th>Trend</th></tr></thead><tbody>
      {vehicles.map((item, index) => <tr key={item.name}><td>{["Honda City", "Suzuki Swift", "Tata Ace", "XUV300"][index]}</td><td>{index < 2 ? "Petrol" : "Diesel"}</td><td>{item.mileage} km/l</td><td>{item.previous}</td><td>{item.trend}</td></tr>)}
    </tbody></table></div></section>
    <div className="analytics-tip"><Icon name="sparkles" size={16} /><span><strong>Make the next trip your most efficient</strong><small>Airport pickup has the highest modeled score (95/100). Its recommended route uses 0.5 liters less than the shortest alternative.</small></span></div>
  </>;
}
