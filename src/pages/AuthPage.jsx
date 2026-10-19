import React, { useState } from "react";
import { Icon } from "../components/ui.jsx";
import { RouteMap } from "./LandingPage.jsx";
import "../auth.css";

const authAsset = (name) => `/assets/${name}`;

export default function AuthPage({ mode, onSwitch, onSubmit, onBack, onDemo }) {
  const registering = mode === "Register";
  const [userType, setUserType] = useState("individual");
  const [helpMessage, setHelpMessage] = useState("");
  return <div className={`sf-auth-page${registering ? " sf-auth-register" : ""}`}>
    <header className="sf-auth-mobile-brand"><button className="sf-auth-brand" onClick={onBack}><span><img src={authAsset("landing-fuel.svg")} alt="" /></span><strong>Smart Fuel<br />Optimization System</strong></button></header>
    <aside className="sf-auth-welcome">
      <button className="sf-auth-brand sf-auth-desktop-brand" onClick={onBack}><span><img src={authAsset("landing-fuel.svg")} alt="" /></span><strong>Smart Fuel Optimization System</strong></button>
      <div className="sf-auth-story"><span className="sf-auth-pill">SMARTER RESOURCE DECISIONS</span><span className="sf-auth-mobile-leaf"><img src={authAsset("landing-leaf.svg")} alt="" /></span><h1><span className="sf-auth-desktop-copy">A better journey starts with a clearer picture.</span><span className="sf-auth-mobile-copy">A clearer way to travel.</span></h1><p>Your vehicles, fuel and budget. Connected in one practical workspace.</p></div>
      <div className="sf-auth-map"><RouteMap auth /></div>
      <ul className="sf-auth-promises"><li><img src={authAsset("auth-circle-check.svg")} alt="" />Purpose-built for individuals and teams</li><li><img src={authAsset("auth-circle-check.svg")} alt="" />Route planning with fuel and cost context</li><li><img src={authAsset("auth-circle-check.svg")} alt="" />Essential travel planning in Crisis Mode</li></ul>
      <small className="sf-auth-disclaimer">Academic demo · Illustrative estimates, not live navigation</small>
    </aside>
    <main className="sf-auth-main">
      <section className="sf-auth-card">
        <span className="sf-auth-form-kicker">{registering ? "YOUR NEXT SMARTER STEP" : "WELCOME BACK"}</span>
        <h2>{registering ? "Create Account" : "Login"}</h2>
        <p className="sf-auth-intro">{registering ? "Start tracking fuel and making more informed journeys." : "Continue to your fuel and resource workspace."}</p>
        <form onSubmit={onSubmit}>
          {registering && <label className="sf-auth-field">Full Name<input name="name" autoComplete="name" defaultValue="Aditi Mehta" placeholder="Your full name" required /></label>}
          <label className="sf-auth-field">Email<input name="email" type="email" autoComplete="email" defaultValue={registering ? "aditi.mehta@example.com" : "aditi.mehta@example.com"} placeholder="you@example.com" required /></label>
          <label className="sf-auth-field">Password<input name="password" type="password" autoComplete={registering ? "new-password" : "current-password"} defaultValue="smartfuel26" placeholder="Enter your password" minLength="8" required />{registering && <small>Use at least 8 characters, a number and a symbol.</small>}</label>
          {registering && <fieldset className="sf-auth-type"><legend>User Type</legend><label className={userType === "individual" ? "selected" : ""}><input type="radio" name="role" value="individual" checked={userType === "individual"} onChange={() => setUserType("individual")} /><Icon name="user" size={15} />Individual</label><label className={userType === "organization" ? "selected" : ""}><input type="radio" name="role" value="organization" checked={userType === "organization"} onChange={() => setUserType("organization")} /><Icon name="building" size={15} />Organization</label></fieldset>}
          {registering && <label className="sf-auth-field">Contact Information<input name="contact" type="tel" autoComplete="tel" placeholder="+91 98765 43210" /></label>}
          {!registering && <div className="sf-auth-options"><label><input type="checkbox" defaultChecked />Remember Me</label><button type="button" onClick={() => setHelpMessage("Password recovery is not available in this demo.")}>Forgot Password</button></div>}
          {helpMessage && <p className="sf-auth-help" role="status">{helpMessage}</p>}
          {registering && <p className="sf-auth-terms">By creating an account, you agree to the Terms and Privacy Policy.</p>}
          <button className="sf-auth-submit" type="submit">{registering ? "Create Account" : "Login Button"}{registering && <Icon name="check" size={14} />}</button>
        </form>
        <div className="sf-auth-switch">{registering ? "Already have an account?" : "New to Smart Fuel?"}<button onClick={onSwitch}>{registering ? "Login" : "Create Account"}</button></div>
      </section>
      {!registering && <p className="sf-auth-consent">By continuing, you agree to our Terms and Privacy Policy.</p>}
      {onDemo && <button className="sf-auth-demo" onClick={onDemo}>Continue with demo account</button>}
    </main>
  </div>;
}
