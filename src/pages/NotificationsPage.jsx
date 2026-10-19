import React, { useState } from "react";
import { Badge, Button, Icon } from "../components/ui.jsx";

const initialNotifications = [
  { icon: "alert", tone: "gold", title: "Fuel shortage mode activated.", text: "You enabled the demo conservation scenario. Essential trips now receive priority in planning.", time: "06 Oct 2026 · 09:12 · 3 min ago", tag: "Crisis Alert", unread: true },
  { icon: "route", tone: "mint", title: "Alternative route can save 20% fuel.", text: "Airport pickup: Route B needs 2.00 liters instead of 2.50 liters. Modeled savings: ₹50.", time: "06 Oct 2026 · 09:05 · 10 min ago", tag: "Recommendation", unread: true },
  { icon: "wallet", tone: "blue", title: "Your fuel purchase was recorded.", text: "Suzuki Swift · 10 liters · ₹1,000. October spending is now ₹6,400.", time: "06 Oct 2026 · 08:30 · 45 min ago", tag: "Fuel record", unread: false },
  { icon: "alert", tone: "rose", title: "Your monthly fuel budget has exceeded.", text: "Previous month: September closed at ₹8,200 against an ₹8,000 limit. Your current October budget is within its limit.", time: "30 Sep 2026 · 18:42 · Previous month", tag: "Warning", unread: false },
  { icon: "target", tone: "mint", title: "Check Honda City’s tire pressure.", text: "Average efficiency is 18 km/l, down from 19 km/l in September. A routine check may help.", time: "01 Oct 2026 · 09:00 · Read", tag: "Recommendation", unread: false }
];

const categories = ["All", "Unread", "Warnings", "Recommendations"];

export default function NotificationsPage({ readNotifications = [], onRead, onReadAll, onNotify }) {
  const [notifications, setNotifications] = useState(() => initialNotifications.map((item) => ({ ...item, unread: item.unread && !readNotifications.includes(item.title) })));
  const [filter, setFilter] = useState("All");
  const [preferences, setPreferences] = useState({ "Budget warnings": true, "Route recommendations": true, "Crisis alerts": true });
  const visible = notifications.filter((item) => filter === "All"
    || (filter === "Unread" && item.unread)
    || (filter === "Warnings" && item.tag === "Warning")
    || (filter === "Recommendations" && item.tag === "Recommendation"));
  const unreadCount = notifications.filter((item) => item.unread).length;

  function markRead(notification) {
    setNotifications((current) => current.map((item) => item.title === notification.title ? { ...item, unread: false } : item));
    onRead?.(notification.title);
  }

  function markAllRead() {
    setNotifications((current) => current.map((item) => ({ ...item, unread: false })));
    onReadAll?.(notifications.map((item) => item.title));
  }

  function togglePreference(name) {
    setPreferences((current) => ({ ...current, [name]: !current[name] }));
  }

  return <>
    <div className="notifications-toolbar"><div className="notification-filter-tabs" role="tablist" aria-label="Notification filters">
      {categories.map((category) => <button type="button" role="tab" aria-selected={filter === category} className={filter === category ? "active" : ""} key={category} onClick={() => setFilter(category)}>{category}{category === "All" ? ` · ${notifications.length}` : category === "Unread" ? ` · ${unreadCount}` : ""}</button>)}
    </div><Button variant="outline" icon="check" onClick={markAllRead}>Mark all as read</Button></div>
    <div className="notifications-layout"><section className="notification-feed" aria-label="Notification list">
      {visible.map((notification) => <button className={`notification-card ${notification.unread ? "is-unread" : ""}`} key={notification.title} onClick={() => markRead(notification)}>
        <span className={`notification-icon ${notification.tone}`}><Icon name={notification.icon} size={18} /></span>
        <span className="notification-content"><Badge tone={notification.tone}>{notification.tag}</Badge><strong>{notification.title}</strong><span>{notification.text}</span><small>{notification.time}</small></span>
        {notification.unread && <i className="notification-unread-dot" aria-label="Unread" />}
      </button>)}
      {visible.length === 0 && <section className="panel empty-state"><Icon name="bell" size={22} /><strong>No notifications in this category</strong><span>Choose another filter to see more updates.</span></section>}
    </section>
    <aside className="notification-aside">
      <section className="panel notification-preferences"><h2>Stay informed</h2><p>Choose the updates that help you make better fuel decisions.</p>
        {Object.entries(preferences).map(([name, enabled]) => <button className={`preference-row ${enabled ? "enabled" : ""}`} type="button" key={name} aria-pressed={enabled} onClick={() => togglePreference(name)}><span>{name} · {enabled ? "Enabled" : "Disabled"}</span><i className={enabled ? "preference-toggle on" : "preference-toggle"}><b /></i></button>)}
        <Button variant="outline" onClick={() => onNotify?.("Notification preferences saved.")}>Manage Preferences</Button>
      </section>
      <section className="panel notification-guide"><h2>Notification guide</h2><p>A green dot marks unread updates. Read notifications stay in your feed for reference.</p><small>Demo timestamps · No live alerts or fuel supply monitoring</small></section>
    </aside></div>
  </>;
}
