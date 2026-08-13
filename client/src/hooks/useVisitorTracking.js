import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// The backend endpoints might be under VITE_TRACKER_API_URL or standard API_URL/api/v1
const API_URL = import.meta.env.VITE_TRACKER_API_URL || (import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL + '/api/v1' : '');

const EXCLUDED_PATHS = ["/analytics"];

const getOrCreateVisitorId = () => {
  let vid = localStorage.getItem("visitor_id");
  if (!vid) {
    vid = crypto.randomUUID();
    localStorage.setItem("visitor_id", vid);
  }
  return vid;
};

const getOrCreateSessionId = () => {
  let sid = sessionStorage.getItem("session_id");
  if (!sid) {
    sid = crypto.randomUUID();
    sessionStorage.setItem("session_id", sid);
  }
  return sid;
};

export const useVisitorTracking = () => {
  const location = useLocation();
  const visitorId = getOrCreateVisitorId();
  const sessionId = getOrCreateSessionId();
  
  const prevPathRef = useRef(null);

  useEffect(() => {
    if (!API_URL || EXCLUDED_PATHS.includes(location.pathname)) return;
    
    // Simple deduplication to avoid double counting from React Strict Mode
    if (prevPathRef.current === location.pathname) return;

    const referrer = prevPathRef.current || document.referrer || null;
    prevPathRef.current = location.pathname;

    fetch(`${API_URL}/visitors/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: location.pathname,
        visitorId,
        sessionId,
        referrer,
      }),
    }).catch(() => {});
  }, [location.pathname, visitorId, sessionId]);

  useEffect(() => {
    if (!API_URL) return;
    const interval = setInterval(() => {
      fetch(`${API_URL}/visitors/heartbeat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitorId }),
      }).catch(() => {});
    }, 30000);
    return () => clearInterval(interval);
  }, [visitorId]);
};
