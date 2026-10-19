import React, { useState } from "react";
import { Badge, Button, Icon, MapPreview, PanelHeading } from "../components/ui.jsx";
import { RouteMap } from "./LandingPage.jsx";

function TripForm({ onOptimize, onCrisis }) {
  const [origin, setOrigin] = useState("Indiranagar, Bengaluru");
  const [destination, setDestination] = useState("Airport terminal, Bengaluru");
  return <section className="panel trip-form-panel">
    <PanelHeading title="Plan your trip" note="Compare the journey, not just the distance." />
    <label className="field-label">Starting Location<input value={origin} onChange={(event) => setOrigin(event.target.value)} /></label>
    <label className="field-label">Destination<input value={destination} onChange={(event) => setDestination(event.target.value)} /></label>
    <label className="field-label">Select Vehicle<select defaultValue="Honda City · 18 km/l"><option>Honda City · 18 km/l</option><option>Suzuki Swift · 16 km/l</option><option>Tata Ace · 12 km/l</option><option>Mahindra XUV300 · 14 km/l</option></select></label>
    <label className="field-label">Travel Purpose<select defaultValue="Airport pickup · Essential"><option>Airport pickup · Essential</option><option>Daily commute</option><option>Personal journey</option><option>Delivery</option></select></label>
    <label className="field-label">Departure<input type="datetime-local" defaultValue="2026-10-06T17:00" /></label>
    <Button icon="route" onClick={onOptimize}>Optimize Route</Button>
    <div className="trip-fuel-available"><Icon name="sparkles" size={17} /><div><strong>Enough fuel for this trip</strong><p>24 liters available. Estimated route fuel: 2.00–2.50 liters.</p></div></div>
    <p className="trip-form-footnote">Edit locations or drag the map pins. Route estimates are modeled demo data, not live traffic or navigation.</p>
    <button className="trip-crisis-link" onClick={onCrisis}>Planning during a fuel shortage? <u>Open Crisis Mode</u></button>
  </section>;
}

function RouteContext({ optimized, onViewRoute, onAnalytics }) {
  const [selectedRoute, setSelectedRoute] = useState("B");
  return <>
    <section className="panel trip-context-panel"><PanelHeading title="Route context" note={optimized ? "Route options · Fuel-efficient route recommended" : "Shortest-route preview · Before optimization"} /><div className="trip-context-metrics"><div><strong>28 km</strong><span>Distance</span></div><div><strong>52 min</strong><span>Estimated Travel Time</span></div><div><strong>2.50 liters</strong><span>Fuel Required</span></div><div><strong>₹250</strong><span>Estimated Cost</span></div></div></section>
    <div className="trip-route-alert"><Icon name="alert" size={17} /><div><strong>The shortest route may use more fuel</strong><p>{optimized ? "Compare route alternatives to balance distance, travel time and fuel use." : "City-center stop-start traffic raises the modeled fuel requirement. Optimize to compare a smoother alternative."}</p></div></div>
    <div className={`trip-route-options ${optimized ? "show-routes" : ""}`}>
      <section className={`panel trip-route-option ${selectedRoute === "B" ? "selected" : ""}`}><div className="trip-option-heading"><div><Icon name="sparkles" size={16} /><strong>Route B Fuel Efficient Route</strong></div><Badge tone="green">Recommended</Badge></div><RouteOptionStats distance="32 km" time="48 min" fuel="2.00 liters" cost="₹200" note="Outer Ring Road · Smoother speeds, fewer stops" /><Button onClick={() => { setSelectedRoute("B"); onViewRoute(); }}>Use Recommended Route</Button></section>
      <section className={`panel trip-route-option ${selectedRoute === "A" ? "selected" : ""}`}><div className="trip-option-heading"><div><Icon name="route" size={16} /><strong>Route A Shortest Route</strong></div><Badge tone="sand">Higher Fuel Consumption</Badge></div><RouteOptionStats distance="28 km" time="52 min" fuel="2.50 liters" cost="₹250" note="MG Road · Shorter distance, stop-start city traffic" /><Button variant="outline" onClick={() => setSelectedRoute("A")}>{selectedRoute === "A" ? "Route A Selected" : "Select Route A"}</Button></section>
      <section className="panel trip-why-route"><PanelHeading title="Why Route B?" /><p>Outer Ring Road avoids city-center stop-start traffic. Estimated 2.0 liters instead of 2.5 liters.</p><p>18 km/l vehicle baseline adjusted to 16 km/l (B) and 11.2 km/l (A) for modeled conditions.</p><p>24 liters available. Check suitability and fuel availability before travel. Not live navigation.</p><button className="small-control" onClick={onAnalytics}>View Analytics</button></section>
    </div>
  </>;
}

function RouteOptionStats({ distance, time, fuel, cost, note }) {
  return <><div className="trip-option-stats"><div><span>Distance</span><strong>{distance}</strong></div><div><span>Estimated Travel Time</span><strong>{time}</strong></div><div><span>Fuel Required</span><strong>{fuel}</strong></div><div><span>Estimated Cost</span><strong>{cost}</strong></div></div><p className="trip-option-note">{note}</p></>;
}

export default function TripPlannerPage({ optimized, onOptimize, onCrisis, onViewRoute, onAnalytics }) {
  return <>
    <div className="trip-planner-layout">
      <TripForm onOptimize={onOptimize} onCrisis={onCrisis} />
      <div className="trip-results-column">
        <div className="trip-map-panel"><div className="trip-map-heading"><span><Icon name="globe" size={15} /> Map · Demo</span><Badge tone={optimized ? "green" : "blue"}>{optimized ? "Optimized routes" : "Initial route preview"}</Badge></div><RouteMap overview /></div>
        <RouteContext optimized={optimized} onViewRoute={onViewRoute} onAnalytics={onAnalytics} />
      </div>
    </div>
    {!optimized && <section className="panel trip-before-go desktop-trip-before"><PanelHeading title="Before you go" /><div><span><Icon name="car" size={16} /><strong>Vehicle ready</strong><small>Honda City · 24 liters · 432 km baseline range</small></span><span><Icon name="wallet" size={16} /><strong>Budget aware</strong><small>₹3,600 remaining in October</small></span><span><Icon name="pin" size={16} /><strong>Route ready</strong><small>A: Indiranagar → B: Airport terminal</small></span></div></section>}
  </>;
}
