import { ScrollAnimation } from "@/components/ScrollAnimation";
import { motion } from "framer-motion";
import {
  Activity,
  BarChart2,
  Clock,
  Eye,
  MessageSquare,
  RefreshCw,
  Repeat2,
  Terminal,
  TrendingUp,
  Users
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const API_URL = import.meta.env.VITE_API_URL || "";

// ── Shared Helpers ────────────────────────────────────────────────────────────

const RANGES_5 = [
  { key: "today", label: "Today" },
  { key: "1week", label: "1 Week" },
  { key: "1month", label: "1 Month" },
  { key: "6months", label: "6 Months" },
  { key: "1year", label: "1 Year" },
];

const RANGES_3 = [
  { key: "today", label: "Today" },
  { key: "1month", label: "1 Month" },
  { key: "1year", label: "1 Year" },
];

const FilterTabs = ({ periods, active, onChange }) => (
  <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none flex-shrink-0">
    {periods.map(({ key, label }) => (
      <button
        key={key}
        onClick={() => onChange(key)}
        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
          active === key
            ? "bg-white text-black"
            : "bg-white/10 text-gray-400 hover:bg-white/15 hover:text-white"
        }`}
      >
        {label}
      </button>
    ))}
  </div>
);

// ── Components ──────────────────────────────────────────────────────────────

const SummaryCard = ({ icon: Icon, title, value, subtext, color }) => (
  <div className="bg-gray-800/50 border border-white/5 rounded-xl p-5 flex flex-col backdrop-blur-sm relative overflow-hidden group">
    <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity ${color}`} />
    <div className="flex items-center gap-3 mb-4">
      <div className={`p-2 rounded-lg bg-white/5 ${color.replace('bg-', 'text-')}`}>
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="text-sm font-medium text-gray-400">{title}</h3>
    </div>
    <div className="mt-auto">
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      {subtext && <p className="text-xs text-gray-500">{subtext}</p>}
    </div>
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border border-white/10 p-3 rounded-lg shadow-xl">
        <p className="text-gray-400 text-xs mb-1">{label}</p>
        <p className="text-white font-bold">{payload[0].value} {payload[0].name}</p>
      </div>
    );
  }
  return null;
};

// ── Main Page ───────────────────────────────────────────────────────────────

const Analytics = () => {
  const [globalError, setGlobalError] = useState("");
  const [lastRefreshed, setLastRefreshed] = useState(new Date());
  
  // Data States
  const [summary, setSummary] = useState(null);
  const [endpoints, setEndpoints] = useState([]);
  const [repeatVisitors, setRepeatVisitors] = useState(null);
  
  const [visitorTrends, setVisitorTrends] = useState([]);
  const [visitorTrendsRange, setVisitorTrendsRange] = useState("today");
  
  const [trafficOverview, setTrafficOverview] = useState([]);
  const [trafficRange, setTrafficRange] = useState("today");

  const [pages, setPages] = useState([]);
  const [pagesRange, setPagesRange] = useState("today");

  // Modular fetchers
  const fetchGlobal = useCallback(async () => {
    try {
      const [sumRes, endRes, repRes] = await Promise.all([
        fetch(`${API_URL}/api/v1/analytics/summary`),
        fetch(`${API_URL}/api/v1/analytics/endpoints`),
        fetch(`${API_URL}/api/v1/analytics/repeat-visitors`)
      ]);
      
      const [sum, end, rep] = await Promise.all([sumRes.json(), endRes.json(), repRes.json()]);
      setSummary(sum.data);
      setEndpoints(end.data || []);
      setRepeatVisitors(rep.data || null);
      setLastRefreshed(new Date());
      setGlobalError("");
    } catch (e) {
      setGlobalError("Unable to load analytics.");
    }
  }, []);

  const fetchVisitorTrends = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/v1/analytics/visitor-trends?range=${visitorTrendsRange}`);
      const json = await res.json();
      
      const formatted = (json.data || []).map(d => {
        let label = d._id;
        if (visitorTrendsRange === 'today') {
          const hr = parseInt(d._id.split(' ')[1], 10);
          label = hr === 0 ? '12am' : hr < 12 ? `${hr}am` : hr === 12 ? '12pm' : `${hr-12}pm`;
        } else if (visitorTrendsRange === '1month' || visitorTrendsRange === '1week') {
          const date = new Date(d._id);
          label = `${date.getDate()} ${date.toLocaleString('en-US', {month: 'short'})}`;
        } else {
          const [yr, mo] = d._id.split('-');
          const date = new Date(yr, parseInt(mo)-1);
          label = date.toLocaleString('en-US', {month: 'short'});
        }
        return { ...d, label };
      });
      setVisitorTrends(formatted);
    } catch (e) {
      console.error(e);
    }
  }, [visitorTrendsRange]);

  const fetchTrafficOverview = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/v1/analytics/visitor-trends?range=${trafficRange}`);
      const json = await res.json();
      
      const formatted = (json.data || []).map(d => {
        let label = d._id;
        if (trafficRange === 'today') {
          const hr = parseInt(d._id.split(' ')[1], 10);
          label = hr === 0 ? '12am' : hr < 12 ? `${hr}am` : hr === 12 ? '12pm' : `${hr-12}pm`;
        } else if (trafficRange === '1month') {
          const date = new Date(d._id);
          label = `${date.getDate()} ${date.toLocaleString('en-US', {month: 'short'})}`;
        } else if (trafficRange === '1year') {
          const [yr, mo] = d._id.split('-');
          const date = new Date(yr, parseInt(mo)-1);
          label = date.toLocaleString('en-US', {month: 'short'});
        }
        return { ...d, label };
      });
      setTrafficOverview(formatted);
    } catch (e) {
      console.error(e);
    }
  }, [trafficRange]);

  const fetchPages = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/v1/analytics/pages?range=${pagesRange}`);
      const json = await res.json();
      setPages(json.data || []);
    } catch (e) {
      console.error(e);
    }
  }, [pagesRange]);

  // Initial loads and refresh
  useEffect(() => { fetchGlobal(); }, [fetchGlobal]);
  useEffect(() => { fetchVisitorTrends(); }, [fetchVisitorTrends]);
  useEffect(() => { fetchTrafficOverview(); }, [fetchTrafficOverview]);
  useEffect(() => { fetchPages(); }, [fetchPages]);

  const handleRefresh = () => {
    fetchGlobal();
    fetchVisitorTrends();
    fetchTrafficOverview();
    fetchPages();
  };

  const maxPageViews = pages.length ? Math.max(...pages.map(p => p.views)) : 1;
  const currentTrendSum = visitorTrends.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="min-h-screen pt-20 px-3 sm:px-4 max-w-6xl mx-auto pb-20">
      
      {/* Header */}
      <ScrollAnimation>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <BarChart2 className="w-8 h-8 text-white" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Analytics</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-gray-400 text-xs bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
              <Clock className="w-3.5 h-3.5" />
              <span>Updated {lastRefreshed.toLocaleTimeString()}</span>
            </div>
            <button onClick={handleRefresh} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors text-sm border border-white/5">
              <RefreshCw className="w-3.5 h-3.5" /> Refresh
            </button>
          </div>
        </div>
      </ScrollAnimation>

      {globalError && (
        <div className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          {globalError} <button onClick={handleRefresh} className="underline ml-2">Try Again</button>
        </div>
      )}

      {!summary ? (
        <div className="flex justify-center h-64 items-center text-gray-500">Loading analytics...</div>
      ) : (
        <>
          {/* Summary Cards */}
          <ScrollAnimation>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <SummaryCard icon={Users} title="Total Visitors" value={summary?.totalVisitors || 0} subtext={`${summary?.todayVisitors || 0} today`} color="bg-blue-500" />
              <SummaryCard icon={Eye} title="Page Views" value={summary?.totalPageViews || 0} color="bg-purple-500" />
              <SummaryCard icon={Activity} title="API Requests" value={summary?.totalApiRequests || 0} subtext={`${summary?.avgResponseTime || 0}ms avg`} color="bg-green-500" />
              <SummaryCard icon={MessageSquare} title="Contacts" value={summary?.contactSubmissions || 0} color="bg-orange-500" />
            </div>
          </ScrollAnimation>

          {/* Visitor Count Chart */}
          <ScrollAnimation>
            <div className="bg-gray-800/50 border border-white/5 rounded-xl p-5 backdrop-blur-sm mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-white">Visitor Count</h3>
                  <span className="text-sm text-gray-400">{currentTrendSum} visitors · {RANGES_3.find(r => r.key === visitorTrendsRange)?.label}</span>
                </div>
                <FilterTabs periods={RANGES_3} active={visitorTrendsRange} onChange={setVisitorTrendsRange} />
              </div>
              <div className="h-64 w-full">
                {visitorTrends.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-sm text-gray-500">No analytics data available for this period.</div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={visitorTrends} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="label" stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                      <YAxis stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} dx={-10} allowDecimals={false} />
                      <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)' }} />
                      <Line type="monotone" dataKey="count" name="visitors" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: '#fff' }} />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </ScrollAnimation>

          {/* Traffic Overview & Most Visited Pages */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <ScrollAnimation>
              <div className="bg-gray-800/50 border border-white/5 rounded-xl p-5 backdrop-blur-sm h-full">
                <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-gray-400" />
                    <h3 className="text-lg font-semibold text-white">Traffic Overview</h3>
                  </div>
                  <FilterTabs periods={RANGES_3} active={trafficRange} onChange={setTrafficRange} />
                </div>
                <div className="h-64 w-full">
                  {trafficOverview.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-sm text-gray-500">No analytics data available for this period.</div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={trafficOverview} margin={{ top: 5, right: 0, bottom: 5, left: -20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis dataKey="label" stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                        <YAxis stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                        <Bar dataKey="count" name="visitors" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation>
              <div className="bg-gray-800/50 border border-white/5 rounded-xl p-5 backdrop-blur-sm h-full">
                <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
                  <div className="flex items-center gap-2">
                    <Repeat2 className="w-5 h-5 text-gray-400" />
                    <h3 className="text-lg font-semibold text-white">Most Visited Pages</h3>
                  </div>
                  <FilterTabs periods={RANGES_5} active={pagesRange} onChange={setPagesRange} />
                </div>
                <div className="overflow-y-auto pr-2 max-h-64 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                  {pages.length === 0 ? (
                    <div className="h-48 flex items-center justify-center text-sm text-gray-500">No analytics data available for this period.</div>
                  ) : (
                    <div className="space-y-4 mt-2">
                      {pages.map((p, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-24 text-right truncate text-xs text-gray-400 flex-shrink-0" title={p.path}>
                            {p.path === "/" ? "/home" : p.path}
                          </div>
                          <div className="flex-1 h-5 bg-white/5 rounded overflow-hidden flex items-center">
                            <motion.div 
                              initial={{ width: 0 }} 
                              animate={{ width: `${(p.views / maxPageViews) * 100}%` }}
                              transition={{ duration: 0.5, ease: "easeOut" }}
                              className="h-full bg-white/70 rounded"
                            />
                          </div>
                          <div className="w-10 text-xs font-semibold text-white">{p.views}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </ScrollAnimation>
          </div>

          {/* Repeat Visitors */}
          <ScrollAnimation>
            <div className="bg-gray-800/50 border border-white/5 rounded-xl p-5 backdrop-blur-sm mb-6">
              <h3 className="text-lg font-semibold text-white mb-1">Repeat Visitors</h3>
              <p className="text-xs text-gray-400 mb-5">(visitCount &gt; 1)</p>
              
              {!repeatVisitors ? (
                 <div className="h-20 flex items-center justify-center text-sm text-gray-500">Loading...</div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  {RANGES_5.map(r => {
                    const stats = repeatVisitors[r.key] || { totalUnique: 0, repeatVisitors: 0, percentage: 0 };
                    return (
                      <div key={r.key} className="bg-black/20 rounded-lg p-4 border border-white/5">
                        <div className="text-sm text-gray-400 mb-2">{r.label}</div>
                        <div className="text-2xl font-bold text-white mb-1">{stats.repeatVisitors}</div>
                        <div className="text-xs text-gray-500">
                          {stats.percentage}% of {stats.totalUnique}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </ScrollAnimation>

          {/* API Endpoints */}
          <ScrollAnimation>
            <div className="bg-gray-800/50 border border-white/5 rounded-xl p-5 backdrop-blur-sm mb-6">
              <div className="flex items-center gap-2 mb-6">
                <Terminal className="w-5 h-5 text-gray-400" />
                <h3 className="text-lg font-semibold text-white">API Endpoints</h3>
                {summary.errorRate > 0 && (
                  <span className="ml-auto text-xs px-2 py-1 bg-red-500/10 text-red-400 rounded-full border border-red-500/20">
                    {summary.errorRate}% Error Rate
                  </span>
                )}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead>
                    <tr className="border-b border-white/5 text-xs text-gray-500 uppercase tracking-wider">
                      <th className="px-4 py-3 font-medium w-24">Method</th>
                      <th className="px-4 py-3 font-medium">Endpoint</th>
                      <th className="px-4 py-3 font-medium text-right w-20">Hits</th>
                      <th className="px-4 py-3 font-medium text-right w-20">Errors</th>
                      <th className="px-4 py-3 font-medium text-right w-24">Avg Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm">
                    {endpoints?.map((ep, i) => {
                      const colors = {
                        GET: "bg-blue-500/10 text-blue-400 border-blue-500/20",
                        POST: "bg-green-500/10 text-green-400 border-green-500/20",
                        PUT: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
                        PATCH: "bg-orange-500/10 text-orange-400 border-orange-500/20",
                        DELETE: "bg-red-500/10 text-red-400 border-red-500/20",
                      };
                      const colorClass = colors[ep.method] || "bg-gray-500/10 text-gray-400 border-gray-500/20";
                      
                      return (
                        <tr key={i} className="hover:bg-white/5 transition-colors">
                          <td className="px-4 py-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${colorClass}`}>
                              {ep.method}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-300 font-mono text-xs">{ep.endpoint}</td>
                          <td className="px-4 py-3 text-right text-gray-300">{ep.count}</td>
                          <td className="px-4 py-3 text-right">
                            <span className={ep.errorCount > 0 ? "text-red-400" : "text-gray-500"}>
                              {ep.errorCount}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right text-gray-400">{ep.avgResponseTime}ms</td>
                        </tr>
                      );
                    })}
                    {(!endpoints || !endpoints.length) && (
                      <tr>
                        <td colSpan="5" className="px-4 py-8 text-center text-gray-500">No API data available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollAnimation>
        </>
      )}
    </div>
  );
};

export default Analytics;
