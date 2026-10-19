import React from "react";
import { Badge, Button, Icon, PanelHeading } from "../components/ui.jsx";

function ForecastChart() {
  return <div className="crisis-forecast" role="img" aria-label="Projected remaining fuel decreases from 24 liters to zero over eight days">
    <div className="crisis-forecast-axis"><span>24</span><span>18</span><span>12</span><span>6</span><span>0</span></div>
    <svg viewBox="0 0 620 170" preserveAspectRatio="none" aria-hidden="true">
      <path className="crisis-forecast-grid" d="M0 10H620M0 47H620M0 84H620M0 121H620M0 158H620" />
      <path className="crisis-forecast-line" d="M0 10 88 28 176 47 264 66 352 84 440 103 528 121 620 158" />
    </svg>
    <div className="crisis-forecast-days"><span>Now</span><span>2d</span><span>4d</span><span>6d</span><span>8d</span></div>
  </div>;
}

const suggestions = [
  ["Combine multiple trips", "Group grocery and pharmacy stops.", "route"],
  ["Avoid unnecessary travel", "Defer weekend leisure journeys.", "check"],
  ["Use fuel-efficient routes", "Route B needs 2.0 liters for airport pickup.", "leaf"]
];

const essentialTrips = [
  ["Office commute", "1.00 L", "High"],
  ["Airport pickup", "2.00 L", "High"],
  ["Medical visit", "0.80 L", "Critical"]
];
const deferredTrips = [
  ["Weekend leisure", "2.40 L", "Deferred"],
  ["Shopping visit", "1.40 L", "Combine"],
  ["Social visit", "1.00 L", "Deferred"]
];

function PriorityTrips() {
  return <section className="panel crisis-priority-panel">
    <PanelHeading title="Priority Trip Management" />
    <div className="priority-group"><Badge tone="green">Essential Trips</Badge>{essentialTrips.map(([trip, fuel, priority]) => <div className="priority-trip" key={trip}><span>{trip} — {fuel}</span><strong className={priority === "Critical" ? "priority-critical" : ""}>{priority}</strong></div>)}</div>
    <div className="priority-group deferred"><Badge tone="blue">Non-essential Trips</Badge>{deferredTrips.map(([trip, fuel, priority]) => <div className="priority-trip" key={trip}><span>{trip} · {fuel}</span><strong>{priority}</strong></div>)}</div>
    <button className="small-control" type="button">Manage Trip Priorities</button>
  </section>;
}

export default function CrisisPage({ enabled, onToggle, onPlan }) {
  return <>
    <div className="crisis-status-banner"><span className="crisis-status-icon"><Icon name="alert" size={17} /></span><div><strong>{enabled ? "Fuel shortage mode activated" : "Fuel availability is moderate"}</strong><p>{enabled ? "Essential journeys are prioritized. Fuel estimates are modeled data." : "Demo scenario, enabled by you. Not a verified local shortage."}</p></div><Badge tone={enabled ? "rose" : "sand"} dot>{enabled ? "ACTIVE" : "DEMO MODE"}</Badge></div>
    <section className="panel crisis-controls-panel"><PanelHeading title="Conservation controls" /><div className="crisis-toggle-row"><span>OFF</span><button className={`toggle ${enabled ? "on" : ""}`} onClick={onToggle} aria-pressed={enabled} aria-label="Toggle crisis mode"><i /></button><strong>ON</strong></div><Badge tone={enabled ? "green" : "sand"}>Conservation {enabled ? "active" : "inactive"}</Badge></section>
    <div className="crisis-information-grid">
      <section className="panel crisis-forecast-panel"><PanelHeading title="Fuel Availability Forecast" note="Honda City · Modeled demo" /><strong className="forecast-days">8 days</strong><p className="forecast-description">24 liters at 3 liters/day. Safety reserve of 6 liters is reached in 6 days.</p><span className="forecast-chart-title">Projected remaining fuel · liters</span><ForecastChart /><div className="forecast-legend"><i /> Modeled · Demo data</div><p className="forecast-disclaimer">No refueling assumed. Not a guarantee of supply.</p></section>
      <div className="crisis-guidance-column">
        <section className="panel crisis-suggestions-panel"><PanelHeading title="Fuel Conservation Suggestions" />{suggestions.map(([title, text, icon]) => <article className="conservation-suggestion" key={title}><Icon name={icon} size={16} /><div><strong>{title}</strong><p>{text}</p></div></article>)}</section>
        <PriorityTrips />
      </div>
    </div>
    <section className="panel emergency-panel"><PanelHeading title="Emergency Recommendations Panel" /><div className="emergency-callout"><Icon name="alert" size={17} /><div><strong>Maintain a 6-liter reserve</strong><p>Keep a buffer for medical and essential travel.</p></div></div><p>Confirm station availability directly before travel. Consider carpooling or public transit.</p><small>For emergencies, contact local emergency services. This is a planning aid, not an emergency response service.</small><Button variant="outline" onClick={onPlan} icon="route">Plan an essential trip</Button></section>
  </>;
}
