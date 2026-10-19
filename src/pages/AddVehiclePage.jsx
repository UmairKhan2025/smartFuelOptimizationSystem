import React, { useMemo, useState } from "react";
import { Badge, Button, Icon } from "../components/ui.jsx";

export default function AddVehiclePage({ vehicle, vehicleCount, onSave, onCancel }) {
  const [form, setForm] = useState(() => ({
    name: vehicle?.name || "Renault Kwid",
    model: vehicle?.model || "Kwid Climber · 2024",
    plate: vehicle?.plate || "KA 03 GH 9204",
    fuel: vehicle?.fuel || "Petrol",
    tank: String(vehicle?.tankCapacity || 28),
    mileage: String(Number.parseFloat(vehicle?.efficiency) || 22),
    type: vehicle?.type?.split(" · ")[0] || "Hatchback",
    level: String(Math.round((vehicle?.tankCapacity || 28) * (vehicle?.level ?? 50) / 100))
  }));
  const [error, setError] = useState("");
  const range = useMemo(() => Number(form.level || 0) * Number(form.mileage || 0), [form.level, form.mileage]);
  const update = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));

  function submit(event) {
    event.preventDefault();
    const capacity = Number(form.tank);
    const currentFuel = Number(form.level);
    const mileage = Number(form.mileage);
    if (currentFuel > capacity) {
      setError("Current fuel cannot exceed the tank capacity.");
      return;
    }
    if (capacity <= 0 || mileage <= 0) {
      setError("Tank capacity and average mileage must be greater than zero.");
      return;
    }
    onSave({
      ...vehicle,
      name: form.name.trim(),
      model: form.model.trim(),
      plate: form.plate.trim().toUpperCase(),
      fuel: form.fuel,
      type: `${form.type} · ${form.fuel}`,
      tankCapacity: capacity,
      efficiency: `${mileage} km/l`,
      level: Math.round((currentFuel / capacity) * 100),
      color: vehicle?.color || "mint",
      icon: "car"
    });
  }

  return <div className="entry-page-layout">
    <form className="panel entry-form-panel" onSubmit={submit}>
      <div className="entry-panel-heading"><h2>Vehicle information</h2><p>Fields marked <b>*</b> are required</p></div>
      <div className="entry-form-grid">
        <label className="field-label">Vehicle Name *<input required value={form.name} onChange={update("name")} /></label>
        <label className="field-label">Model<input value={form.model} onChange={update("model")} /></label>
        <label className="field-label">Registration Number *<input required value={form.plate} onChange={update("plate")} /></label>
        <label className="field-label">Fuel Type<select value={form.fuel} onChange={update("fuel")}><option>Petrol</option><option>Diesel</option><option>Electric</option><option>Hybrid</option></select></label>
        <label className="field-label">Tank Capacity *<input required type="number" min="1" value={form.tank} onChange={update("tank")} /><small>liters · Manufacturer tank capacity</small></label>
        <label className="field-label">Average Mileage *<input required type="number" min="0.1" step="0.1" value={form.mileage} onChange={update("mileage")} /><small>km/l · Used to estimate trip fuel</small></label>
        <label className="field-label entry-full-width">Vehicle Type<select value={form.type} onChange={update("type")}><option>Hatchback</option><option>Sedan</option><option>SUV</option><option>Motorcycle</option><option>Delivery van</option></select></label>
        <label className="field-label entry-full-width">Current Fuel Level *<input required type="number" min="0" step="0.1" max={form.tank} value={form.level} onChange={update("level")} /><small>liters · Must not exceed tank capacity</small></label>
      </div>
      <div className="entry-estimate"><Icon name="sparkles" size={17} /><div><strong>Estimated remaining distance: {Math.round(range)} km</strong><span>{form.level} liters × {form.mileage} km/l. Actual range depends on road and driving conditions.</span></div></div>
      {error && <p className="form-error" role="alert">{error}</p>}
      <div className="entry-form-actions"><Button variant="outline" onClick={onCancel}>Cancel</Button><Button type="submit" icon="check">{vehicle ? "Save Changes" : "Save Vehicle"}</Button></div>
    </form>
    <aside className="entry-aside">
      <section className="panel entry-aside-card"><h2>Ready for smarter estimates</h2><span className="entry-aside-car"><Icon name="car" size={23} /></span><p>Your vehicle’s mileage and tank capacity power trip comparisons and fuel availability forecasts.</p><p>Use a realistic average mileage rather than a best-case manufacturer figure.</p><Badge tone="green">{vehicle ? "Editing vehicle" : "New vehicle · Unsaved"}</Badge></section>
      <section className="panel entry-aside-card"><h2>Your workspace</h2><p><strong>{vehicleCount} saved vehicles</strong></p><p>{vehicle ? `${vehicle.name} will be updated in Vehicle Management after saving.` : `${form.name || "Your vehicle"} will appear in Vehicle Management after saving.`}</p></section>
    </aside>
  </div>;
}
