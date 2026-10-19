import React, { useEffect, useRef, useState } from "react";
import "../landing.css";

const asset = (name) => `/assets/landing-${name}.svg`;

function Logo({ footer = false }) {
  return <a className={`sf-logo${footer ? " sf-logo-footer" : ""}`} href="#top" aria-label="Smart Fuel Optimization System home">
    <span className="sf-logo-mark"><img src={asset("fuel")} alt="" /></span>
    <strong>Smart Fuel Optimization System</strong>
  </a>;
}

function SmallIcon({ name, className = "" }) {
  return <span className={`sf-icon ${className}`}><img src={asset(name)} alt="" /></span>;
}

export function RouteMap({ overview = false, auth = false }) {
  const viewport = useRef(null);
  const [scale, setScale] = useState(1);
  const baseWidth = auth ? 468 : overview ? 736 : 656;
  useEffect(() => {
    const element = viewport.current;
    if (!element) return undefined;
    const update = () => setScale(Math.min(1, element.clientWidth / baseWidth));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, [baseWidth]);
  return <div ref={viewport} className={`sf-map-viewport${overview ? " sf-map-overview" : ""}${auth ? " sf-map-auth" : ""}`}>
    <div className={`sf-map-art${overview ? " sf-map-art-overview" : ""}${auth ? " sf-map-art-auth" : ""}`} style={{ transform: `scale(${scale})` }}>
      <div className="sf-map-district" />
      <div className="sf-map-park" />
      <div className="sf-map-river" />
      <div className="sf-map-layer sf-map-streets"><img src={asset(auth ? "auth-street-network" : overview ? "street-network1" : "street-network")} alt="" /></div>
      <div className="sf-map-layer sf-map-main-road"><img src={asset(auth ? "auth-main-road" : overview ? "main-road1" : "main-road")} alt="" /></div>
      <div className="sf-map-layer sf-map-route-a"><img src={asset(auth ? "auth-route-a-shortest" : overview ? "route-a-shortest1" : "route-a-shortest")} alt="" /></div>
      <div className="sf-map-layer sf-map-route-b"><img src={asset(auth ? "auth-route-b-fuel-efficient" : overview ? "route-b-fuel-efficient1" : "route-b-fuel-efficient")} alt="" /></div>
      <span className="sf-map-label sf-map-city">Bengaluru</span>
      <span className="sf-map-label sf-map-indiranagar">Indiranagar</span>
      <span className="sf-map-label sf-map-park-label">Central Park</span>
      <span className="sf-map-label sf-map-mg">MG Road</span>
      <span className="sf-map-label sf-map-airport">Airport terminal</span>
      <span className="sf-map-label sf-map-ring">Outer Ring Road</span>
      <span className="sf-map-pin sf-map-pin-a">A</span><span className="sf-map-pin sf-map-pin-b">B</span>
      <div className="sf-map-toolbar"><SmallIcon name="layers" /><span>Map · Demo</span></div>
      <div className="sf-map-controls"><SmallIcon name="plus" /><SmallIcon name="minus" /><SmallIcon name="locate-fixed" /></div>
      <span className="sf-map-caption">Illustrative map · Not live navigation <b>━</b> 2 km</span>
    </div>
  </div>;
}

const features = [
  ["fuel1", "Smart Route Optimization", "Compare routes by distance, estimated fuel use and travel cost."],
  ["fuel", "Fuel Consumption", "Track vehicle usage and keep a clear record of every fill-up."],
  ["wallet", "Budget Management", "Set monthly fuel budgets and see spending before it adds up."],
  ["shield-alert", "Crisis Mode", "Put essential journeys first when resources are constrained."],
  ["chart-no-axes-combined", "Analytics Dashboard", "Understand trends across vehicles, trips and fuel costs."]
];

function TrendChart() {
  return <div className="sf-trend-chart" aria-label="Illustrative fuel consumption trend chart">
    <img className="sf-chart-grid" src={asset("grid-lines")} alt="" />
    <img className="sf-chart-line" src={asset("consumption-trend")} alt="" />
    <div className="sf-chart-labels"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
  </div>;
}

export default function LandingPage({ onGetStarted, onSignIn }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  return <div className="sf-landing" id="top">
    <header className="sf-navbar">
      <Logo />
      <button className="sf-menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>☰</button>
      <nav className={menuOpen ? "sf-nav sf-nav-open" : "sf-nav"} aria-label="Marketing navigation">
        <a href="#features" onClick={closeMenu}>Features</a><a href="#how-it-works" onClick={closeMenu}>How it works</a><a href="#teams" onClick={closeMenu}>For teams</a><a href="#sustainability" onClick={closeMenu}>Sustainability</a>
      </nav>
      <div className="sf-nav-actions"><button className="sf-button sf-button-light" onClick={onSignIn}>Login</button><button className="sf-button sf-button-green" onClick={onGetStarted}>Get Started</button></div>
    </header>

    <main>
      <section className="sf-hero">
        <div className="sf-hero-copy">
          <span className="sf-eyebrow-pill">SMARTER JOURNEYS. LESS WASTE.</span>
          <h1>Optimize Fuel.<br />Reduce Cost.<br />Travel Smarter.</h1>
          <p>A clearer way to manage fuel, plan efficient trips and stay within budget. When resources are limited, crisis optimization helps you put essential journeys first.</p>
          <div className="sf-hero-actions"><button className="sf-button sf-button-green" onClick={onGetStarted}><SmallIcon name="arrow-right" />Get Started</button><button className="sf-button sf-button-light" onClick={onSignIn}>Login</button></div>
          <div className="sf-promises"><span><SmallIcon name="circle-check" />For individuals &amp; teams</span><span><SmallIcon name="circle-check" />One connected workspace</span></div>
        </div>
        <article className="sf-route-card">
          <div className="sf-route-card-head"><strong>Your next journey, optimized.</strong><span className="sf-eyebrow-pill">Demo route</span></div>
          <RouteMap />
          <div className="sf-route-stats"><div><strong>32 km</strong><span>Efficient route</span></div><div><strong>2.00 liters</strong><span>Estimated fuel</span></div><div><strong>₹200</strong><span>Estimated cost</span></div></div>
          <div className="sf-route-note"><SmallIcon name="leaf" /><span><strong>Plan with a little more clarity.</strong><small>Illustrative estimates · No live fuel availability</small></span></div>
        </article>
      </section>

      <section className="sf-metrics" aria-label="Illustrative workspace metrics">
        <div><strong>12,800 liters</strong><span>Modeled fuel savings</span></div><div><strong>48,200</strong><span>Illustrative demo trips</span></div><div><strong>6,400</strong><span>Active demo users</span></div><div><strong>18%</strong><span>Modeled efficiency</span></div>
        <small>Illustrative demo data · Modeled estimates, not verified impact claims.</small>
      </section>

      <section className="sf-features" id="features">
        <div className="sf-section-heading"><span className="sf-section-kicker">YOUR FUEL WORKSPACE</span><h2>One system. Every fuel decision.</h2><p>Bring vehicles, trips and budgets together for a clearer view of your resources.</p></div>
        <div className="sf-feature-grid">{features.map(([icon, title, copy]) => <article className="sf-feature-card" key={title}><SmallIcon name={icon} /><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </section>

      <section className="sf-overview">
        <div className="sf-section-heading"><span className="sf-section-kicker">A CLEARER MONTHLY PICTURE</span><h2>From the dashboard to the road.</h2><p>A view of route options, fuel use and monthly spending in one place.</p></div>
        <div className="sf-overview-grid">
          <article className="sf-overview-route"><div className="sf-panel-heading"><div><strong>Plan the journey</strong><small>Route options at a glance</small></div><span className="sf-status-chip">Route plan</span></div><RouteMap overview /><div className="sf-legend"><span><i className="sf-dot sf-dot-blue" />Shortest route</span><span><i className="sf-dot sf-dot-green" />Fuel efficient</span><span>32 km · 2.00 liters · ₹200</span></div></article>
          <article className="sf-overview-trend"><div className="sf-panel-heading"><div><strong>Keep the month on track.</strong><small>Fuel use across your workspace</small></div><span className="sf-status-chip">This month</span></div><div className="sf-spend-total"><strong>₹6,400</strong><span>fuel spend</span></div><div className="sf-budget-progress"><i /></div><div className="sf-budget-labels"><span>₹3,600 remaining</span><span>₹10,000 budget</span></div><TrendChart /><div className="sf-chart-foot"><span><i className="sf-dot sf-dot-green" />Consumption trend</span><strong>Within budget</strong></div></article>
        </div>
        <article className="sf-mobile-budget-card"><div><span>October workspace</span><span className="sf-status-chip">Within budget</span></div><strong>₹6,400 spent</strong><div className="sf-budget-progress"><i /></div><p>₹3,600 remaining of ₹10,000 budget</p><small>Honda City · 24 liters · 432 km range</small></article>
      </section>

      <section className="sf-steps" id="how-it-works"><div className="sf-steps-inner"><span className="sf-section-kicker">HOW IT WORKS</span><h2>A smarter routine in three steps.</h2><div className="sf-steps-grid"><article><strong>01</strong><h3>Connect your vehicles</h3><p>Add your vehicles and keep mileage, fuel and capacity in one place.</p></article><article><strong>02</strong><h3>Plan with context</h3><p>Compare routes with modeled fuel estimates before each journey.</p></article><article><strong>03</strong><h3>Learn and adjust</h3><p>Review your trends and make informed choices over time.</p></article></div></div></section>

      <section className="sf-teams" id="teams">
        <div className="sf-section-heading"><span className="sf-section-kicker">FLEXIBLE BY DESIGN</span><h2>Personal clarity. Organization-wide control.</h2><p>Purpose-built workspaces keep decisions in view for both individuals and teams.</p></div>
        <div className="sf-team-grid"><article><SmallIcon name="user" /><span className="sf-team-label">Individual Users</span><h3>Make room for the journeys that matter.</h3><p>Track your fuel, keep everyday travel costs clear and plan with confidence.</p><ul><li><SmallIcon name="check" />Track fuel and vehicle usage</li><li><SmallIcon name="check" />Plan routes before you travel</li><li><SmallIcon name="check" />Review your monthly budget</li></ul></article><article><SmallIcon name="building2" /><span className="sf-team-label">Organization Users</span><h3>Give every resource a clear purpose.</h3><p>Coordinate vehicles, trip priorities and fuel budgets across your organization.</p><ul><li><SmallIcon name="check" />Manage a mixed vehicle fleet</li><li><SmallIcon name="check" />Keep team journeys visible</li><li><SmallIcon name="check" />Plan resources across teams</li></ul></article></div>
      </section>

      <section className="sf-sustainability" id="sustainability"><div className="sf-sustainability-inner"><img src="/assets/landing-electric-green-city.png" alt="A car traveling along a tree-lined urban street" /><div className="sf-sustainability-copy"><span className="sf-section-kicker">A LIGHTER FOOTPRINT</span><h2>Use less.<br />Understand more.</h2><p>Smarter planning can help reduce unnecessary driving and make fuel use easier to understand. Compare modeled routes, review your habits and make room for more efficient journeys.</p><p>Figures shown are illustrative estimates based on modeled comparisons.</p><a href="#features">Explore how it works <span>→</span></a></div></div></section>

      <section className="sf-crisis"><div className="sf-crisis-copy"><span className="sf-section-kicker">WHEN EVERY JOURNEY MATTERS</span><h2><span className="sf-crisis-title-desktop">When fuel is limited, priorities become clearer.</span><span className="sf-crisis-title-mobile">Prepared, not panicked.</span></h2><p>Focus on essential trips and use scenario estimates to make informed plans when resources are constrained.</p><span className="sf-crisis-link"><SmallIcon name="shield-alert1" />Prepared with a plan</span></div><article className="sf-forecast-card"><div><strong>Fuel Availability Forecast</strong><span className="sf-status-chip">Demo scenario</span></div><small>Based on a modeled scenario, not live availability data</small><strong className="sf-forecast-days">8 days</strong><span className="sf-forecast-caption">Estimated supply runway</span><div className="sf-budget-progress"><i /></div><small>Prioritize essential journeys to conserve fuel.</small></article></section>

      <section className="sf-final-cta"><h2>Start with your next journey.</h2><p>Build a clearer picture of fuel, cost and the routes ahead.</p><div><button className="sf-button sf-button-white" onClick={onGetStarted}>Get Started</button><button className="sf-button sf-button-outline-white" onClick={onSignIn}>Login</button></div></section>
    </main>

    <footer className="sf-footer"><div className="sf-footer-main"><Logo footer /><div><strong>Product</strong><a href="#features">Features</a><a href="#how-it-works">Trip Planner</a><a href="#features">Analytics</a><a href="#features">Crisis Mode</a></div><div><strong>Solutions</strong><a href="#teams">Individual Users</a><a href="#teams">Organization Users</a><a href="#teams">Resource Management</a></div><div><strong>Support</strong><a href="#top">Help Center</a><a href="#top">Contact</a><a href="#top">Privacy</a><a href="#top">Terms</a></div></div><p>© 2026 Smart Fuel Optimization System. Academic demonstration · No live fuel availability or verified impact claims.</p></footer>
  </div>;
}
