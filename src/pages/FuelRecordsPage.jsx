import React, { useMemo, useState } from "react";
import { Badge, Button, Icon } from "../components/ui.jsx";

function numeric(value) {
  return Number(String(value).replace(/[^\d.]/g, "")) || 0;
}

function formatCurrency(value) {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

function exportRecords(records) {
  const rows = [
    ["Date", "Vehicle", "Fuel station", "Quantity", "Price per liter", "Total cost"],
    ...records.map((record) => [record.date, record.vehicle, record.station, record.liters, record.price, record.cost])
  ];
  const csv = rows.map((row) => row.map((cell) => `"${String(cell ?? "").replaceAll('"', '""')}"`).join(",")).join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "smart-fuel-records.csv";
  link.click();
  URL.revokeObjectURL(url);
}

export default function FuelRecordsPage({ records, vehicles, budget, onAdd, onEdit, onDelete }) {
  const [vehicleFilter, setVehicleFilter] = useState("All vehicles");
  const [dateFilter, setDateFilter] = useState("01 – 31 Oct 2026");
  const visibleRecords = useMemo(() => records.filter((record) => {
    const matchesVehicle = vehicleFilter === "All vehicles" || record.vehicle === vehicleFilter;
    const matchesDate = dateFilter === "All dates"
      || (dateFilter.includes("Oct") && record.date.includes("Oct"))
      || (dateFilter.includes("Sep") && record.date.includes("Sep"));
    return matchesVehicle && matchesDate;
  }), [records, vehicleFilter, dateFilter]);
  const liters = records.reduce((sum, record) => sum + numeric(record.liters), 0);
  const spend = records.reduce((sum, record) => sum + numeric(record.cost), 0);
  const averagePrice = liters ? spend / liters : 0;
  const byVehicle = vehicles.map((vehicle) => ({
    name: vehicle.name.replace("Maruti Suzuki ", ""),
    liters: records.filter((record) => record.vehicle === vehicle.name).reduce((sum, record) => sum + numeric(record.liters), 0)
  }));
  const maxLiters = Math.max(...byVehicle.map((vehicle) => vehicle.liters), 1);

  return <>
    <div className="fuel-summary-grid">
      <article className="panel fuel-summary-card"><Icon name="fuel" size={18} /><span>Total Fuel Purchased</span><strong>{liters} liters</strong><small>{records.length} recorded purchases this month</small></article>
      <article className="panel fuel-summary-card"><Icon name="wallet" size={18} /><span>Total Amount Spent</span><strong>{formatCurrency(spend)}</strong><small>{budget ? Math.round((spend / budget) * 100) : 0}% of your {formatCurrency(budget)} budget</small></article>
      <article className="panel fuel-summary-card"><Icon name="target" size={18} /><span>Average Fuel Price</span><strong>₹{averagePrice.toFixed(0)} / liter</strong><small>Weighted average across purchases</small></article>
    </div>

    <section className="panel fuel-management-table">
      <div className="fuel-table-heading"><div><h2>Fuel records</h2><p>Purchase totals feed your monthly budget automatically.</p></div><div className="fuel-table-actions"><Button className="fuel-add-mobile" icon="plus" onClick={() => onAdd()}>Add record</Button><Button variant="outline" className="fuel-export-desktop" icon="download" onClick={() => exportRecords(visibleRecords)}>Export CSV</Button></div></div>
      <div className="fuel-record-filters">
        <label className="field-label">Date Range<select value={dateFilter} onChange={(event) => setDateFilter(event.target.value)}><option>01 – 31 Oct 2026</option><option>01 – 30 Sep 2026</option><option>All dates</option></select></label>
        <label className="field-label">Vehicle<select value={vehicleFilter} onChange={(event) => setVehicleFilter(event.target.value)}><option>All vehicles</option>{vehicles.map((vehicle) => <option key={vehicle.plate}>{vehicle.name}</option>)}</select></label>
      </div>
      <div className="table-scroll"><table><thead><tr><th>Date</th><th>Vehicle</th><th>Fuel Quantity</th><th>Price</th><th>Total Cost</th><th>Actions</th></tr></thead><tbody>
        {visibleRecords.map((record, index) => <tr key={`${record.date}-${record.vehicle}-${index}`}><td>{record.date}</td><td>{record.vehicle}</td><td>{record.liters}</td><td>{record.price}</td><td>{formatCurrency(numeric(record.cost))}</td><td><button className="text-button" onClick={() => onEdit(record)}>Edit</button><span className="fuel-action-divider">·</span><button className="text-button" onClick={() => onDelete(record)}>Delete</button></td></tr>)}
      </tbody></table></div>
      {visibleRecords.length === 0 && <div className="empty-state"><Icon name="search" size={22} /><strong>No purchases for this vehicle</strong><span>Choose another vehicle or add a fuel record.</span><Button onClick={() => onAdd()}>Add fuel record</Button></div>}
      <div className="fuel-records-footnote"><span>Showing {visibleRecords.length} of {records.length} records · Demo prices in INR</span><span>Receipts can be edited or deleted</span></div>
    </section>

    <div className="fuel-record-bottom-grid">
      <section className="panel fuel-vehicle-chart"><div><h2>Purchases by vehicle</h2><small>Fuel quantity · liters</small></div><div className="fuel-vehicle-bars" role="img" aria-label="Liters purchased by vehicle">
        {byVehicle.map((vehicle) => <div className="fuel-vehicle-bar" key={vehicle.name}><span>{vehicle.liters || 0}</span><i style={{ height: `${Math.max(8, (vehicle.liters / maxLiters) * 100)}%` }} /><small>{vehicle.name}</small></div>)}
      </div><span className="fuel-chart-legend"><i /> Actual · Demo data</span></section>
      <section className="panel fuel-quality-card"><h2>Record quality</h2><strong>{records.length} / {records.length} records complete</strong><p>Each record includes a vehicle, purchase date, quantity and unit price. Fuel purchased is not the same as fuel consumed.</p><small>Last record added: {records[0]?.date || "No records yet"}</small></section>
    </div>
  </>;
}
