import React, { useMemo, useState } from "react";
import { Badge, Button, Icon } from "../components/ui.jsx";

function amount(value) {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

function parseNumber(value) {
  return Number(String(value || "").replace(/[^\d.]/g, "")) || 0;
}

export default function AddFuelRecordPage({ vehicles, budget, spending, purchasedLiters, record, onSave, onCancel }) {
  const [vehiclePlate, setVehiclePlate] = useState(() => vehicles.find((vehicle) => vehicle.name === record?.vehicle)?.plate || vehicles[0]?.plate || "");
  const selectedVehicle = vehicles.find((vehicle) => vehicle.plate === vehiclePlate) || vehicles[0];
  const capacity = selectedVehicle?.tankCapacity || 40;
  const currentFuel = selectedVehicle ? Math.round((capacity * selectedVehicle.level) / 100) : 0;
  const availableCapacity = Math.max(0, capacity - currentFuel);
  const [quantity, setQuantity] = useState(() => record ? String(parseNumber(record.liters)) : "10");
  const [unitPrice, setUnitPrice] = useState(() => record ? String(parseNumber(record.price)) : "100");
  const [fuelType, setFuelType] = useState(record?.fuelType || selectedVehicle?.fuel || "Petrol");
  const [date, setDate] = useState(() => record ? new Date(record.date).toISOString().slice(0, 10) : "2026-10-06");
  const [station, setStation] = useState(record?.station || "City Fuel Station · Receipt 061026-08");
  const [notes, setNotes] = useState(record?.notes || "Evening refuel before airport pickup");
  const [error, setError] = useState("");
  const liters = Number(quantity) || 0;
  const price = Number(unitPrice) || 0;
  const total = useMemo(() => liters * price, [liters, price]);
  const fuelAfterSave = record ? currentFuel : Math.min(capacity, currentFuel + liters);
  const spendingAfterSave = spending + total - (Number(record?.cost) || 0);
  const remainingBudget = Math.max(0, budget - spendingAfterSave);

  function submit(event) {
    event.preventDefault();
    if (!selectedVehicle) {
      setError("Add a vehicle before recording a fuel purchase.");
      return;
    }
    if (liters <= 0 || price <= 0 || (!record && liters > availableCapacity)) {
      setError(`Enter a valid purchase quantity${record ? "" : ` up to ${availableCapacity} liters for this vehicle`}.`);
      return;
    }
    onSave({
      date: new Date(`${date}T12:00:00`).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      vehicle: selectedVehicle.name,
      station: station.trim(),
      liters: `${liters} liters`,
      price: `${amount(price)} / liter`,
      cost: total,
      fuelType,
      notes: notes.trim(),
      status: "Verified"
    }, selectedVehicle.plate, fuelAfterSave);
  }

  return <div className="entry-page-layout fuel-entry-layout">
    <form className="panel entry-form-panel fuel-entry-form" onSubmit={submit}>
      <div className="entry-panel-heading"><h2>Purchase details</h2><p>{record ? "Editing saved purchase" : "Draft record · Not included in current totals"}</p></div>
      <div className="entry-form-grid">
        <label className="field-label">Vehicle<select value={vehiclePlate} onChange={(event) => { setVehiclePlate(event.target.value); setFuelType(vehicles.find((vehicle) => vehicle.plate === event.target.value)?.fuel || "Petrol"); }} required>{vehicles.map((vehicle) => <option value={vehicle.plate} key={vehicle.plate}>{vehicle.name} · {vehicle.plate}</option>)}</select></label>
        <label className="field-label">Date<input type="date" value={date} onChange={(event) => setDate(event.target.value)} required /></label>
        <label className="field-label">Fuel Quantity<input type="number" min="0.1" max={record ? undefined : availableCapacity} step="0.1" value={quantity} onChange={(event) => setQuantity(event.target.value)} required /><small>{record ? "liters · Editing saved purchase history" : `liters · Capacity available: ${availableCapacity} liters`}</small></label>
        <label className="field-label">Price<input type="number" min="0.01" step="0.01" value={unitPrice} onChange={(event) => setUnitPrice(event.target.value)} required /><small>INR (₹) per liter</small></label>
        <label className="field-label entry-full-width">Fuel Type<select value={fuelType} onChange={(event) => setFuelType(event.target.value)}><option>Petrol</option><option>Diesel</option><option>Electric</option><option>Hybrid</option></select></label>
        <label className="field-label entry-full-width">Station / Reference<input value={station} onChange={(event) => setStation(event.target.value)} required /></label>
      </div>
      <div className="fuel-total-preview"><span>Total Cost</span><strong>{amount(total)}</strong><small>{liters} liters × {amount(price)} / liter · Automatically calculated</small></div>
      <label className="field-label">Notes (optional)<input value={notes} onChange={(event) => setNotes(event.target.value)} /></label>
      {error && <p className="form-error" role="alert">{error}</p>}
      <div className="entry-form-actions"><Button variant="outline" onClick={onCancel}>Cancel</Button><Button type="submit" icon="check">{record ? "Update Fuel Record" : "Save Fuel Record"}</Button></div>
    </form>
    <aside className="entry-aside fuel-entry-aside">
      <section className="panel entry-aside-card"><h2>After saving</h2><Badge tone="green">Preview only</Badge><small className="preview-caption">{selectedVehicle?.name || "Vehicle"} fuel level</small><strong className="preview-value">{currentFuel} → {fuelAfterSave} liters</strong><div className="entry-progress"><i style={{ width: `${capacity ? (fuelAfterSave / capacity) * 100 : 0}%` }} /></div><p>{capacity ? Math.round((fuelAfterSave / capacity) * 100) : 0}% of {capacity}-liter tank · {Math.round(fuelAfterSave * Number.parseFloat(selectedVehicle?.efficiency || 0))} km modeled range</p><small className="preview-impact">Current month fuel purchased: {purchasedLiters} → {purchasedLiters + liters - (Number(String(record?.liters || "").replace(/[^\d.]/g, "")) || 0)} liters</small></section>
      <section className="panel entry-aside-card fuel-budget-preview"><h2>Budget impact</h2><strong className="preview-value">{amount(spending)} → {amount(spendingAfterSave)}</strong><p>Current spending after this purchase. {amount(remainingBudget)} would remain of {amount(budget)}.</p><div className="entry-progress"><i style={{ width: `${budget ? Math.min(100, (spendingAfterSave / budget) * 100) : 0}%` }} /></div></section>
      <div className="fuel-capacity-notice"><Icon name="sparkles" size={16} /><div><strong>{record ? "Historical purchase edit" : liters <= availableCapacity ? "Within tank capacity" : "Quantity exceeds capacity"}</strong><span>{record ? "Editing saved purchase history does not change the current tank reading." : `${liters}-liter purchase ${liters <= availableCapacity ? "fits the" : "exceeds the"} ${availableCapacity} liters of available capacity.`}</span></div></div>
    </aside>
  </div>;
}
