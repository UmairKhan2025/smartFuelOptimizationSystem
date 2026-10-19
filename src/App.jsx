import React, { useEffect, useMemo, useState } from "react";
import DashboardScreen from "./pages/DashboardPage.jsx";
import BudgetScreen from "./pages/BudgetPage.jsx";
import CrisisScreen from "./pages/CrisisPage.jsx";
import TripPlannerScreen from "./pages/TripPlannerPage.jsx";
import VehiclesScreen from "./pages/VehiclesPage.jsx";
import FuelRecordsScreen from "./pages/FuelRecordsPage.jsx";
import AddVehicleScreen from "./pages/AddVehiclePage.jsx";
import AddFuelRecordScreen from "./pages/AddFuelRecordPage.jsx";
import AnalyticsScreen from "./pages/AnalyticsPage.jsx";
import NotificationsScreen from "./pages/NotificationsPage.jsx";
import LandingScreen from "./pages/LandingPage.jsx";
import AuthScreen from "./pages/AuthPage.jsx";
import AdminDashboardScreen from "./pages/AdminPage.jsx";
import OrganizationDashboardScreen from "./pages/OrganizationDashboardPage.jsx";
import { Button, Icon } from "./components/ui.jsx";

const navItems = [
  { label: "Dashboard", icon: "home" },
  { label: "Vehicles", icon: "car" },
  { label: "Fuel records", icon: "fuel" },
  { label: "Trip planner", icon: "route" },
  { label: "Budget management", icon: "wallet" },
  { label: "Analytics", icon: "chart" },
  { label: "Crisis mode", icon: "alert" }
];

const appRoutes = [
  "Landing page", "Login", "Register", "Dashboard", "Organization dashboard",
  "Vehicles", "Add Vehicle", "Fuel records", "Add Fuel Record", "Trip planner",
  "Optimized route", "Budget management", "Analytics", "Crisis mode",
  "Notifications", "Admin dashboard"
];

function routeSlug(page) {
  return page.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function pageFromLocation() {
  const pathSlug = window.location.pathname.replace(/^\/+|\/+$/g, "").toLowerCase();
  const legacyHashSlug = window.location.hash.startsWith("#/") ? window.location.hash.slice(2).toLowerCase() : "";
  const slug = pathSlug || legacyHashSlug;
  return appRoutes.find((route) => routeSlug(route) === slug) || "Landing page";
}

const initialVehicles = [
  { name: "Honda City", type: "Sedan Â· Petrol", plate: "KA 03 MN 4821", efficiency: "18 km/l", fuel: "Petrol", level: 60, tankCapacity: 40, color: "mint", icon: "car" },
  { name: "Maruti Suzuki Swift", type: "Hatchback Â· Petrol", plate: "KA 05 AB 2196", efficiency: "20 km/l", fuel: "Petrol", level: 49, tankCapacity: 37, color: "sand", icon: "car" },
  { name: "Tata Ace", type: "Delivery van Â· Diesel", plate: "KA 01 CD 7612", efficiency: "12 km/l", fuel: "Diesel", level: 53, tankCapacity: 30, color: "blue", icon: "car" },
  { name: "Mahindra XUV300", type: "SUV Â· Diesel", plate: "KA 04 EF 3058", efficiency: "14 km/l", fuel: "Diesel", level: 67, tankCapacity: 42, color: "mint", icon: "car" }
];

const initialFuelRecords = [
  { date: "06 Oct 2026", vehicle: "Maruti Suzuki Swift", station: "Indian Oil Â· Koramangala", liters: "10 liters", price: "â‚¹100 / liter", cost: 1000, status: "Verified" },
  { date: "05 Oct 2026", vehicle: "Mahindra XUV300", station: "HP Â· MG Road", liters: "14 liters", price: "â‚¹100 / liter", cost: 1400, status: "Verified" },
  { date: "04 Oct 2026", vehicle: "Honda City", station: "Indian Oil Â· Indiranagar", liters: "10 liters", price: "â‚¹100 / liter", cost: 1000, status: "Verified" },
  { date: "03 Oct 2026", vehicle: "Tata Ace", station: "Indian Oil Â· HSR Layout", liters: "8 liters", price: "â‚¹100 / liter", cost: 800, status: "Verified" },
  { date: "02 Oct 2026", vehicle: "Maruti Suzuki Swift", station: "Shell Â· Koramangala", liters: "10 liters", price: "â‚¹100 / liter", cost: 1000, status: "Verified" },
  { date: "01 Oct 2026", vehicle: "Honda City", station: "HP Â· MG Road", liters: "12 liters", price: "â‚¹100 / liter", cost: 1200, status: "Verified" }
];

function SectionTitle({ eyebrow, title, detail, action }) {
  return <div className="section-title"><div>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h1>{title}</h1>{detail && <p className="muted title-detail">{detail}</p>}</div>{action}</div>;
}

function App() {
  const [page, setPage] = useState(pageFromLocation);
  const [user, setUser] = useState(null);
  const [notice, setNotice] = useState("");
  const [modal, setModal] = useState("");
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [editingFuelRecord, setEditingFuelRecord] = useState(null);
  const [mobileNav, setMobileNav] = useState(false);
  const [search, setSearch] = useState("");
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [records, setRecords] = useState(initialFuelRecords);
  const [budget, setBudget] = useState(10000);
  const [optimized, setOptimized] = useState(false);
  const [crisis, setCrisis] = useState(true);
  const [profileMenu, setProfileMenu] = useState(false);
  const [readNotificationTitles, setReadNotificationTitles] = useState([]);
  const showAllNotifications = readNotificationTitles.length < 2;

  useEffect(() => {
    const path = page === "Landing page" ? "/" : `/${routeSlug(page)}`;
    const legacyHash = window.location.hash.startsWith("#/");
    if (window.location.pathname !== path || legacyHash) {
      window.history.pushState(null, "", `${path}${window.location.search}`);
    }
  }, [page]);

  useEffect(() => {
    function syncPageFromLocation() {
      const nextPage = pageFromLocation();
      setPage((current) => current === nextPage ? current : nextPage);
    }
    window.addEventListener("popstate", syncPageFromLocation);
    return () => window.removeEventListener("popstate", syncPageFromLocation);
  }, []);

  const signedIn = Boolean(user);
  const filteredRecords = useMemo(() => records.filter((record) => `${record.vehicle} ${record.station} ${record.date}`.toLowerCase().includes(search.toLowerCase())), [records, search]);
  const fuelSpend = records.reduce((sum, record) => sum + (Number(record.cost) || 0), 0);
  const fuelLiters = records.reduce((sum, record) => sum + (Number(String(record.liters).replace(/[^\d.]/g, "")) || 0), 0);

  function go(nextPage) {
    const nextPath = nextPage === "Landing page" ? "/" : `/${routeSlug(nextPage)}`;
    if (window.location.pathname !== nextPath) window.history.pushState(null, "", `${nextPath}${window.location.search}`);
    setPage(nextPage);
    setMobileNav(false);
    setSearch("");
  }

  function signIn(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setUser({ name: data.get("name") || "Aditi Mehra", role: data.get("role") || "individual" });
    go("Dashboard");
  }

  function signOut() {
    setUser(null);
    setProfileMenu(false);
    go("Landing page");
  }

  function notify(message) {
    setNotice(message);
    window.clearTimeout(notify.timer);
    notify.timer = window.setTimeout(() => setNotice(""), 3200);
  }

  function exportAdminReport() {
    const rows = [
      ["Metric", "Value"],
      ["Total users", "6800"],
      ["Active vehicles", "120"],
      ["Optimized trips", "6400"],
      ["Fuel consumed (demo)", "256000 L"],
      ["Estimated fuel saved (demo)", "12800 L"]
    ];
    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "smart-fuel-admin-report.csv";
    link.click();
    URL.revokeObjectURL(url);
    notify("Administration report downloaded.");
  }

  function saveVehicle(vehicle) {
    if (editingVehicle) {
      setVehicles((current) => current.map((item) => item.plate === editingVehicle.plate ? vehicle : item));
      notify(`${vehicle.name} was updated.`);
    } else {
      setVehicles((current) => [...current, vehicle]);
      notify(`${vehicle.name} was added to your fleet.`);
    }
    setEditingVehicle(null);
    go("Vehicles");
  }

  function saveFuelRecord(record, plate, fuelLevel) {
    if (editingFuelRecord) {
      setRecords((current) => current.map((item) => item === editingFuelRecord ? record : item));
      notify("Fuel record updated.");
    } else {
      setRecords((current) => [record, ...current]);
      setVehicles((current) => current.map((vehicle) => vehicle.plate === plate
        ? { ...vehicle, level: Math.min(100, Math.round((fuelLevel / (vehicle.tankCapacity || 40)) * 100)) }
        : vehicle));
      notify("Fuel record saved and vehicle fuel level updated.");
    }
    setEditingFuelRecord(null);
    go("Fuel records");
  }

  const startDemo = () => { setUser({ name: "Aditi Mehra", role: "individual" }); go("Dashboard"); };

  if (!signedIn && page === "Landing page") {
    return <LandingScreen onGetStarted={() => go("Login")} onSignIn={() => go("Login")} onDemo={startDemo} />;
  }
  if (!signedIn && (page === "Login" || page === "Register")) {
    return <AuthScreen mode={page} onSwitch={() => go(page === "Login" ? "Register" : "Login")} onSubmit={signIn} onBack={() => go("Landing page")} onDemo={startDemo} />;
  }

  const role = user?.role || "individual";
  const menu = role === "admin"
    ? [...navItems, { label: "Admin dashboard", icon: "shield" }]
    : role === "organization"
      ? [...navItems, { label: "Organization dashboard", icon: "users" }]
      : navItems;
  const displayTitles = {
    Vehicles: "Vehicle Management",
    "Fuel records": "Fuel Purchase Management",
    "Trip planner": "Smart Trip Planner",
    "Optimized route": "Optimized Route",
    "Budget management": "Budget Management",
    Analytics: "Analytics Dashboard",
    "Crisis mode": "Crisis Mode",
    Notifications: "Notifications",
    "Admin dashboard": "Admin Dashboard",
    "Organization dashboard": "Fleet overview"
  };
  const titleIcons = { Dashboard: "home", Vehicles: "car", "Fuel records": "fuel", "Trip planner": "route", "Optimized route": "route", "Budget management": "wallet", Analytics: "chart", "Crisis mode": "alert", Notifications: "bell" };
  const pageEyebrows = { "Add Vehicle": "VEHICLES / NEW VEHICLE", "Add Fuel Record": "FUEL RECORDS / NEW PURCHASE", "Admin dashboard": "SYSTEM ADMINISTRATION", "Organization dashboard": "GREENLINE LOGISTICS / ORGANIZATION" };
  const pageAction = ({
    Vehicles: <Button icon="plus" onClick={() => { setEditingVehicle(null); go("Add Vehicle"); }}>Add vehicle</Button>,
    "Fuel records": <Button icon="plus" onClick={() => { setEditingFuelRecord(null); go("Add Fuel Record"); }}>Add fuel record</Button>,
    "Budget management": <Button icon="edit" variant="outline" onClick={() => setModal("budget")}>Set budget</Button>,
    "Admin dashboard": <Button icon="download" onClick={exportAdminReport}>Generate report</Button>,
    "Organization dashboard": <Button icon="download" onClick={() => notify("Your organization report is ready.")}>Export report</Button>,
    "Optimized route": <Button icon="arrow" variant="outline" onClick={() => go("Trip planner")}>Back to planner</Button>
  })[page];

  return <div className="app-shell">
    <aside className={`sidebar ${mobileNav ? "sidebar-open" : ""}`}>
      <div className="brand-lockup"><div className="brand-symbol"><img src="/assets/landing-fuel.svg" alt="" /></div><div><strong>Smart Fuel Optimization System</strong></div><button className="icon-button sidebar-close" onClick={() => setMobileNav(false)} aria-label="Close navigation"><Icon name="close" /></button></div>
      <button className="workspace-switch"><span className="workspace-avatar"><Icon name={role === "organization" ? "building" : role === "admin" ? "shield" : "user"} size={15} /></span><span><strong>{role === "admin" ? "System administrator" : role === "organization" ? "Greenline Logistics" : "Individual workspace"}</strong></span><Icon name="chevron" size={15} /></button>
      <nav className="side-nav" aria-label="Main navigation">
        {menu.map((item, index) => <div key={item.label}>
          {item.group && <div className="nav-group-label">{item.group}</div>}
          <button className={`side-link ${page === item.label || (page === "Optimized route" && item.label === "Trip planner") ? "selected" : ""}`} onClick={() => go(item.label)}><Icon name={item.icon} size={17} /><span>{item.label}</span></button>
        </div>)}
        <button className="side-link" onClick={() => notify("Settings are up to date.")}><Icon name="settings" size={17} /><span>Settings</span></button>
      </nav>
      <div className="sidebar-bottom"><p className="sidebar-note">Every liter matters.<br />Plan intentionally. Use your resources wisely.</p><span className="sidebar-demo">DEMO WORKSPACE Â· OCT 2026</span></div>
    </aside>
    {mobileNav && <button className="mobile-scrim" aria-label="Close navigation" onClick={() => setMobileNav(false)} />}
    <div className="main-column">
      <header className="topbar">
        <a className="mobile-brand" href="#" onClick={(event) => event.preventDefault()}><Icon name={titleIcons[page] || "home"} size={17} /><strong>{displayTitles[page] || page}</strong></a>
        <button className="icon-button mobile-menu-button" aria-label="Open navigation" onClick={() => setMobileNav(true)}><Icon name="menu" /></button>
        <div className="search-box"><Icon name="search" size={17} /><input aria-label="Search" placeholder="Search vehicles, trips, fuel records..." value={search} onChange={(event) => setSearch(event.target.value)} /><kbd>âŒ˜ K</kbd></div>
        <div className="topbar-right"><span className="top-date">Demo data</span><button className="icon-button notification-button" aria-label="View notifications" onClick={() => go("Notifications")}><Icon name="bell" size={19} />{showAllNotifications && <i />}</button><button className="top-profile" onClick={() => setProfileMenu(!profileMenu)} aria-expanded={profileMenu}><span className="avatar">AM</span><span className="profile-name"><strong>{user?.name || "Aditi Mehta"}</strong><small>{role === "organization" ? "Organization account" : role === "admin" ? "Admin account" : "Individual account"}</small></span><Icon name="chevron" size={14} /></button>{profileMenu && <div className="profile-popover"><button onClick={() => { setUser({ ...user, role: role === "admin" ? "individual" : "admin" }); setProfileMenu(false); notify("Workspace role changed."); }}>Switch to {role === "admin" ? "individual" : "admin"} view</button><button onClick={signOut}><Icon name="logout" size={15} /> Sign out</button></div>}</div>
      </header>
      <main className="page-content">
        <div className="mobile-greeting">Good morning, {user?.name?.split(" ")[0] || "Aditi"} <span>âœ¦</span></div>
        <SectionTitle eyebrow={pageEyebrows[page] || "WORKSPACE"} title={page === "Dashboard" ? `Good morning, ${user?.name?.split(" ")[0] || "Aditi"}` : displayTitles[page] || page} detail={page === "Dashboard" ? "Here's your fuel and spending overview for October 2026." : pageDetails[page] || "A clearer view of your fuel, journeys and impact."} action={pageAction} />
        {page === "Dashboard" && <DashboardScreen budget={budget} spending={fuelSpend} onPlanTrip={() => go("Trip planner")} onAddFuel={() => { setEditingFuelRecord(null); go("Add Fuel Record"); }} />}
        {page === "Vehicles" && <VehiclesScreen vehicles={vehicles} onAdd={() => { setEditingVehicle(null); go("Add Vehicle"); }} onEdit={(vehicle) => { setEditingVehicle(vehicle); go("Add Vehicle"); }} onDelete={(vehicle) => {
          if (window.confirm(`Delete ${vehicle.name} from your fleet?`)) {
            setVehicles((current) => current.filter((item) => item.plate !== vehicle.plate));
            notify(`${vehicle.name} was removed from your fleet.`);
          }
        }} />}
        {page === "Fuel records" && <FuelRecordsScreen records={filteredRecords} vehicles={vehicles} budget={budget} onAdd={() => { setEditingFuelRecord(null); go("Add Fuel Record"); }} onEdit={(record) => { setEditingFuelRecord(record); go("Add Fuel Record"); }} onDelete={(record) => {
          if (window.confirm(`Delete the ${record.liters} purchase for ${record.vehicle}?`)) {
            setRecords((current) => current.filter((item) => item !== record));
            notify("Fuel record deleted.");
          }
        }} />}
        {page === "Add Vehicle" && <AddVehicleScreen vehicle={editingVehicle} vehicleCount={vehicles.length} onSave={saveVehicle} onCancel={() => { setEditingVehicle(null); go("Vehicles"); }} />}
        {page === "Add Fuel Record" && <AddFuelRecordScreen vehicles={vehicles} budget={budget} spending={fuelSpend} purchasedLiters={fuelLiters} record={editingFuelRecord} onSave={saveFuelRecord} onCancel={() => { setEditingFuelRecord(null); go("Fuel records"); }} />}
        {page === "Trip planner" && <TripPlannerScreen optimized={optimized} onOptimize={() => { setOptimized(true); notify("Route optimized â€” youâ€™re ready to go."); }} onCrisis={() => go("Crisis mode")} onViewRoute={() => go("Optimized route")} onAnalytics={() => go("Analytics")} />}
        {page === "Optimized route" && <TripPlannerScreen optimized onOptimize={() => { setOptimized(true); notify("Route options updated."); }} onCrisis={() => go("Crisis mode")} onViewRoute={() => notify("Recommended route selected.")} onAnalytics={() => go("Analytics")} />}
        {page === "Budget management" && <BudgetScreen budget={budget} spending={fuelSpend} onUpdate={(value) => { setBudget(value); notify("Monthly budget updated."); }} />}
        {page === "Analytics" && <AnalyticsScreen spending={fuelSpend} />}
        {page === "Crisis mode" && <CrisisScreen enabled={crisis} onToggle={() => setCrisis(!crisis)} onPlan={() => go("Trip planner")} />}
        {page === "Notifications" && <NotificationsScreen readNotifications={readNotificationTitles} onRead={(label) => {
          setReadNotificationTitles((current) => current.includes(label) ? current : [...current, label]);
          notify(`${label} marked as read.`);
        }} onReadAll={(titles) => {
          setReadNotificationTitles(titles);
          notify("All notifications marked as read.");
        }} onNotify={notify} />}
        {page === "Admin dashboard" && <AdminDashboardScreen onNotify={notify} />}
        {page === "Organization dashboard" && <OrganizationDashboardScreen />}
      </main>
      <footer className="app-footer"><span>Smart Fuel <b>Â·</b> Resource-aware. Human-centered.</span><span>Need a hand? <button onClick={() => notify("Support will be with you shortly.")}>Contact support</button></span></footer>
    </div>
    <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
      {[["Dashboard", "home", "Home"], ["Vehicles", "car", "Vehicles"], ["Trip planner", "route", "Plan Trip"], ["Crisis mode", "alert", "Crisis"]].map(([target, icon, label]) => <button key={target} className={page === target ? "active" : ""} onClick={() => go(target)} aria-current={page === target ? "page" : undefined}><Icon name={icon} size={18} /><span>{label}</span></button>)}
    </nav>
    {notice && <div className="toast" role="status"><span className="toast-check"><Icon name="check" size={14} /></span>{notice}<button aria-label="Dismiss notification" onClick={() => setNotice("")}><Icon name="close" size={15} /></button></div>}
    {modal && <Modal kind={modal} vehicles={vehicles} budget={budget} vehicle={editingVehicle} onClose={() => { setModal(""); setEditingVehicle(null); }} onSave={(value) => {
      if (modal === "vehicle" && editingVehicle) setVehicles((current) => current.map((vehicle) => vehicle.plate === editingVehicle.plate ? value : vehicle));
      else if (modal === "vehicle") setVehicles((current) => [value, ...current]);
      if (modal === "fuel") setRecords((current) => [value, ...current]);
      if (modal === "budget") setBudget(Number(value));
      setModal("");
      setEditingVehicle(null);
      notify(modal === "budget" ? "Monthly budget updated." : modal === "vehicle" && editingVehicle ? "Vehicle details updated." : `${modal === "vehicle" ? "Vehicle" : "Fuel record"} added successfully.`);
    }} />}
  </div>;
}

const pageDetails = {
  Vehicles: "Keep your vehicles and their fuel efficiency in one place.",
  "Fuel records": "Every fill-up, charge and expense â€” all accounted for.",
  "Trip planner": "Plan a journey, find a smarter route and know what it will cost.",
  "Budget management": "Stay on top of your monthly fuel spend.",
  Analytics: "Understand the patterns behind every mile.",
  "Crisis mode": "Plan thoughtfully when fuel availability is limited.",
  Notifications: "The latest updates from your workspace.",
  "Add Vehicle": "Add a vehicle to personalize fuel tracking and trip estimates.",
  "Add Fuel Record": "Record a purchase and keep your fuel and budget totals aligned.",
  "Admin dashboard": "Illustrative platform overview using demo data.",
  "Organization dashboard": "A clear view of your fleet, fuel use and team travel.",
  "Optimized route": "Your recommended route, ready for the road."
};

function Modal({ kind, vehicles, budget, vehicle, onClose, onSave }) {
  const isVehicle = kind === "vehicle";
  const isFuel = kind === "fuel";
  const isEditingVehicle = isVehicle && Boolean(vehicle);
  const vehicleType = vehicle?.type.split(" Â· ")[0] || "Sedan";
  const fuelType = vehicle?.type.split(" Â· ")[1] || vehicle?.fuel || "Petrol";
  const title = isVehicle ? `${isEditingVehicle ? "Edit" : "Add"} a vehicle` : isFuel ? "Add a fuel record" : "Set your monthly budget";
  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (isVehicle) onSave({ ...vehicle, name: data.get("vehicle"), type: `${data.get("type")} Â· ${data.get("fuel")}`, plate: data.get("plate").toUpperCase(), efficiency: data.get("efficiency"), fuel: data.get("fuel"), level: vehicle?.level ?? 75, tankCapacity: vehicle?.tankCapacity ?? 40, color: vehicle?.color || "mint", icon: vehicle?.icon || "car" });
    else if (isFuel) onSave({ date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }), vehicle: data.get("vehicle"), station: data.get("station"), liters: `${data.get("quantity")} L`, price: `â‚¹ ${Number(data.get("cost")).toLocaleString("en-IN")}`, status: "Verified" });
    else onSave(data.get("budget"));
  }
  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div className="modal-heading"><div><span className="eyebrow">SMART FUEL WORKSPACE</span><h2 id="modal-title">{title}</h2></div><button className="icon-button" onClick={onClose} aria-label="Close"><Icon name="close" /></button></div><form onSubmit={submit}>
    {isVehicle && <><label className="field-label">Vehicle name<input name="vehicle" placeholder="e.g. Honda City" defaultValue={vehicle?.name || ""} required /></label><div className="modal-form-grid"><label className="field-label">Vehicle type<select name="type" defaultValue={vehicleType}><option>Sedan</option><option>SUV</option><option>Motorcycle</option><option>Hatchback</option><option>Delivery van</option></select></label><label className="field-label">Fuel type<select name="fuel" defaultValue={fuelType}><option>Petrol</option><option>Diesel</option><option>Electric</option><option>Hybrid</option></select></label></div><div className="modal-form-grid"><label className="field-label">Registration number<input name="plate" placeholder="KA 01 AB 1234" defaultValue={vehicle?.plate || ""} required /></label><label className="field-label">Fuel efficiency<input name="efficiency" placeholder="18 km/l" defaultValue={vehicle?.efficiency || ""} required /></label></div></>}
    {isFuel && <><label className="field-label">Vehicle<select name="vehicle">{vehicles.map((vehicle) => <option key={vehicle.plate}>{vehicle.name}</option>)}</select></label><label className="field-label">Fuel station<input name="station" placeholder="Station name and area" required /></label><div className="modal-form-grid"><label className="field-label">Quantity (liters)<input name="quantity" type="number" min="0.1" step="0.1" required /></label><label className="field-label">Total cost (â‚¹)<input name="cost" type="number" min="1" required /></label></div></>}
    {!isVehicle && !isFuel && <><p className="modal-copy">Choose an amount that feels right for your monthly travel. You can change this any time.</p><label className="field-label">Monthly fuel budget (â‚¹)<div className="currency-input"><span>â‚¹</span><input name="budget" type="number" min="1" defaultValue={budget} required /></div></label></>}
    <div className="modal-actions"><Button variant="outline" onClick={onClose}>Cancel</Button><Button type="submit">{isVehicle ? isEditingVehicle ? "Save changes" : "Save vehicle" : isFuel ? "Save fuel record" : "Save budget"}</Button></div>
  </form></section></div>;
}

export default App;
