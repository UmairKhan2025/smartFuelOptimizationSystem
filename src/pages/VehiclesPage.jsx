import React, { useMemo, useState } from "react";
import { Badge, Button, Icon, MetricCard } from "../components/ui.jsx";

export default function VehiclesPage({ vehicles, onAdd, onEdit, onDelete }) {
  const vehicleType = (value) => value.split(/\s*(?:Â·|·)\s*/)[0];
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All types");
  const [fuelFilter, setFuelFilter] = useState("All fuels");
  const fuelLiters = vehicles.reduce((sum, item) => sum + Math.round(item.tankCapacity * item.level / 100), 0);
  const tankCapacity = vehicles.reduce((sum, item) => sum + item.tankCapacity, 0);
  const types = ["All types", ...new Set(vehicles.map((item) => vehicleType(item.type)))];
  const filtered = useMemo(() => vehicles.filter((item) => {
    const type = vehicleType(item.type);
    return `${item.name} ${item.plate} ${item.type} ${item.fuel}`.toLowerCase().includes(query.toLowerCase()) && (typeFilter === "All types" || type === typeFilter) && (fuelFilter === "All fuels" || item.fuel === fuelFilter);
  }), [vehicles, query, typeFilter, fuelFilter]);

  return <div className="sf-vehicles-page">
    <div className="sf-vehicle-mobile-summary">{vehicles.length} vehicles · {fuelLiters} liters across your fleet</div>
    <div className="sf-vehicle-metrics">
      <MetricCard icon="car" label="Registered vehicles" value={`${vehicles.length}|`} change={`${vehicles.filter((v) => v.fuel === "Petrol").length} petrol · ${vehicles.filter((v) => v.fuel === "Diesel").length} diesel`} note="In your fleet" />
      <MetricCard icon="fuel" label="Current fuel" value={`${fuelLiters}| liters`} change="Across all vehicles" note="Updated fuel levels" />
      <MetricCard icon="target" label="Tank capacity" value={`${tankCapacity}| liters`} change={`${tankCapacity ? Math.round(fuelLiters / tankCapacity * 100) : 0}% combined fuel level`} note="Fleet capacity" />
    </div>
    <section className="panel sf-vehicle-browser">
      <div className="sf-vehicle-tools">
        <label className="sf-vehicle-search"><Icon name="search" size={17} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by vehicle name or registration number" aria-label="Search vehicles" /></label>
        <label className="sf-vehicle-select"><span>Vehicle Type</span><select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>{types.map((type) => <option key={type}>{type}</option>)}</select></label>
        <label className="sf-vehicle-select"><span>Fuel Type</span><select value={fuelFilter} onChange={(e) => setFuelFilter(e.target.value)}><option>All fuels</option><option>Petrol</option><option>Diesel</option><option>Electric</option><option>Hybrid</option></select></label>
      </div>
      <div className="sf-mobile-filters">{["All fuels", "Petrol", "Diesel"].map((fuel) => <button className={fuelFilter === fuel ? "active" : ""} key={fuel} onClick={() => setFuelFilter(fuel)}>{fuel === "All fuels" ? `All · ${vehicles.length}` : `${fuel} · ${vehicles.filter((v) => v.fuel === fuel).length}`}</button>)}</div>
      <div className="sf-vehicle-list">
        {filtered.map((vehicle) => {
          const liters = Math.round(vehicle.tankCapacity * vehicle.level / 100);
          return <article className="sf-vehicle-card" key={vehicle.plate}>
            <div className="sf-vehicle-card-head"><span className="sf-vehicle-icon"><Icon name="car" size={20} /></span><div className="sf-vehicle-name"><h2>{vehicle.name}</h2><span>{vehicle.plate}</span></div><Badge tone="green" dot>Active</Badge></div>
            <div className="sf-vehicle-specs"><div><span>Vehicle type</span><strong>{vehicleType(vehicle.type)}</strong></div><div><span>Fuel type</span><strong>{vehicle.fuel}</strong></div><div><span>Average mileage</span><strong>{vehicle.efficiency}</strong></div><div><span>Tank capacity</span><strong>{vehicle.tankCapacity} liters</strong></div></div>
            <div className="sf-fuel-level"><div><span>Current fuel</span><strong>{liters} / {vehicle.tankCapacity} liters</strong></div><div className="sf-fuel-track"><i style={{ width: `${vehicle.level}%` }} /></div></div>
            <div className="sf-vehicle-actions"><Button variant="outline" icon="car" onClick={() => onEdit(vehicle)}>View details</Button><Button variant="outline" icon="edit" onClick={() => onEdit(vehicle)}>Edit</Button><button className="sf-delete-vehicle" onClick={() => onDelete(vehicle)} aria-label={`Delete ${vehicle.name}`}><Icon name="close" size={16} /></button></div>
          </article>;
        })}
        {!filtered.length && <p className="sf-vehicle-empty">No vehicles match those filters.</p>}
      </div>
    </section>
    <aside className="sf-vehicle-tip"><Icon name="sparkles" size={17} /><div><strong>Keep your vehicle details up to date</strong><p>Range and trip estimates use your average mileage. Update fuel levels after every purchase or journey.</p></div></aside>
  </div>;
}
