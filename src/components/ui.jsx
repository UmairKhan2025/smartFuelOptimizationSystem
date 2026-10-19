import React from "react";

export function Icon({ name, size = 18 }) {
  const paths = {
    home: <><rect x="3.5" y="3.5" width="7" height="7" rx="1.4" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.4" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.4" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.4" /></>,
    car: <><path d="m5 11 1.5-4h11l1.5 4" /><path d="M3.5 11h17v7h-17zM6.5 18v2m11-2v2M6 14h.01M18 14h.01" /></>,
    bike: <><circle cx="6" cy="16" r="3" /><circle cx="18" cy="16" r="3" /><path d="m6 16 4-7h3l5 7M9 12h6m-3-3 2-2" /></>,
    fuel: <><path d="M5 21V4h10v17M3 21h14M8 8h4M17 9h2l2 2v7a2 2 0 0 1-4 0v-3" /><path d="M15 6h2l2 2v3" /></>,
    route: <><circle cx="6" cy="18" r="2.2" /><circle cx="18" cy="6" r="2.2" /><path d="M8.5 18h3a3 3 0 0 0 3-3V9a3 3 0 0 1 3-3" /></>,
    wallet: <><rect x="3" y="5" width="18" height="15" rx="2" /><path d="M3 8h18M16 14h2" /></>,
    chart: <><path d="M4 19V5m0 14h17" /><path d="m7 15 4-4 3 2 5-6" /></>,
    alert: <><path d="m12 3 9 17H3z" /><path d="M12 9v5m0 3h.01" /></>,
    bell: <><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-8 12h4" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="m19 13 1.4 1.1-1.4 2.5-1.8-.5a7 7 0 0 1-1.5.9l-.4 1.8h-3l-.4-1.8a7 7 0 0 1-1.5-.9l-1.8.5-1.4-2.5L6.6 13a6 6 0 0 1 0-2L5.2 9.9l1.4-2.5 1.8.5a7 7 0 0 1 1.5-.9l.4-1.8h3l.4 1.8a7 7 0 0 1 1.5.9l1.8-.5 1.4 2.5L19 11a6 6 0 0 1 0 2Z" /></>,
    search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    chevron: <path d="m8 10 4 4 4-4" />,
    arrow: <><path d="M5 12h14m-6-6 6 6-6 6" /></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    leaf: <><path d="M20 4c-9 0-15 4-15 11a5 5 0 0 0 5 5c7 0 11-7 10-16Z" /><path d="M4 21c2-5 6-8 12-11" /></>,
    download: <><path d="M12 3v12m-5-5 5 5 5-5M4 20h16" /></>,
    filter: <><path d="M4 6h16M7 12h10m-7 6h4" /></>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    logout: <><path d="M10 17l5-5-5-5m5 5H3" /><path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
    sparkles: <><path d="m12 3 1.2 5.8L19 11l-5.8 1.2L12 18l-1.2-5.8L5 11l5.8-2.2L12 3Zm7 12 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z" /></>,
    more: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
    edit: <><path d="m4 16-.8 4.8L8 20l11-11-4-4L4 16Z" /><path d="m13.5 6.5 4 4" /></>,
    target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>,
    users: <><path d="M16 20v-1.5a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4V20m12-13a3 3 0 0 1 0 6m4 7v-1.5a4 4 0 0 0-3-3.9" /><circle cx="10" cy="8" r="3" /></>,
    shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18m0-18a15 15 0 0 0 0 18" /></>,
    dot: <circle cx="12" cy="12" r="4" />
  };
  return <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.dot}</svg>;
}

export function Button({ children, variant = "primary", icon, onClick, className = "", type = "button" }) {
  return <button type={type} className={`button button-${variant} ${className}`} onClick={onClick}>{icon && <Icon name={icon} size={16} />}{children}</button>;
}

export function Badge({ children, tone = "green", dot = false }) {
  return <span className={`badge badge-${tone}`}>{dot && <i />}{children}</span>;
}

export function MetricCard({ icon, label, value, change, tone = "green", note }) {
  const [amount, unit] = value.split("|");
  return <article className="metric-card panel">
    <div className={`metric-icon ${tone}`}><Icon name={icon} size={18} /></div>
    <div className="metric-label">{label}</div>
    <div className="metric-value">{amount}{unit && <> <small>{unit}</small></>}</div>
    <div className="metric-foot"><span className="positive">{change}</span><span>{note}</span></div>
  </article>;
}

export function PanelHeading({ title, note, select, action }) {
  return <div className="panel-heading"><div><h2>{title}</h2>{note && <p>{note}</p>}</div>{select ? <select aria-label={`Filter ${title}`} defaultValue={select}><option>{select}</option><option>This month</option><option>Last month</option></select> : action}</div>;
}

export function LineChart({ label = "Weekly fuel consumption trend" }) {
  return <div className="line-chart" role="img" aria-label={label}>
    <div className="chart-y-labels"><span>40 L</span><span>30 L</span><span>20 L</span><span>10 L</span></div>
    <svg viewBox="0 0 620 180" preserveAspectRatio="none">
      <defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#55a886" stopOpacity=".2" /><stop offset="100%" stopColor="#55a886" stopOpacity="0" /></linearGradient></defs>
      <path d="M0 130 L90 92 L180 117 L270 52 L360 77 L450 108 L540 70 L620 89 L620 180 L0 180Z" fill="url(#area)" />
      <path d="M0 130 L90 92 L180 117 L270 52 L360 77 L450 108 L540 70 L620 89" fill="none" stroke="#238362" strokeWidth="3" vectorEffect="non-scaling-stroke" />
      {[["0","130"],["90","92"],["180","117"],["270","52"],["360","77"],["450","108"],["540","70"],["620","89"]].map(([cx, cy]) => <circle key={cx} cx={cx} cy={cy} r="4" fill="#fff" stroke="#238362" strokeWidth="2" vectorEffect="non-scaling-stroke" />)}
    </svg>
    <div className="chart-x-labels"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
  </div>;
}

export function BarChart({ values = [56, 70, 64, 83, 74, 92], months = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"] }) {
  return <div className="bar-chart" role="img" aria-label="Monthly fuel cost">
    <div className="chart-y-labels"><span>₹ 8k</span><span>₹ 6k</span><span>₹ 4k</span><span>₹ 2k</span></div>
    <div className="bars">{values.map((height, index) => <div className="bar-column" key={months[index]}><div className={`bar ${index === values.length - 1 ? "bar-current" : ""}`} style={{ height: `${height}%` }} /><span>{months[index]}</span></div>)}</div>
  </div>;
}

export function MapPreview({ route = "recommended" }) {
  return <div className={`map-preview map-preview-${route}`}>
    <div className="map-water" />
    <div className="map-grid-lines"><i /><i /><i /><i /><i /><i /></div>
    <div className="map-road road-one" /><div className="map-road road-two" /><div className="map-road road-three" />
    {route === "optimized" && <div className="map-route-alternative" />}
    <div className="map-route"><span className="map-pin start">A</span><span className="map-pin end"><Icon name="pin" size={13} /></span></div>
    {route === "optimized" && <><span className="map-route-label map-route-label-a">Route A · Shortest</span><span className="map-route-label map-route-label-b">Route B · Fuel efficient</span></>}
    <div className="map-place place-one">Cubbon Park</div><div className="map-place place-two">MG Road</div><div className="map-place place-three">Ulsoor Lake</div>
    <div className="map-caption"><span className="map-legend" /> Recommended route</div>
    <div className="map-controls"><button aria-label="Zoom in">+</button><button aria-label="Zoom out">−</button></div>
  </div>;
}
