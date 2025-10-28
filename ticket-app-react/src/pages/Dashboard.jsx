import React from "react";
import { ChartBarIcon, ClockIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import ticketService from "../services/ticketService";

export default function Dashboard() {
  const tickets = ticketService.list();
  const counts = tickets.reduce((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, {});

  const stats = [
    {
      title: "Open Tickets",
      count: counts.open || 0,
      color: "from-rose-400 to-pink-500",
      icon: <ChartBarIcon className="h-8 w-8 text-white" />,
    },
    {
      title: "Pending Tickets",
      count: counts.pending || 0,
      color: "from-amber-400 to-orange-500",
      icon: <ClockIcon className="h-8 w-8 text-white" />,
    },
    {
      title: "Closed Tickets",
      count: counts.closed || 0,
      color: "from-emerald-400 to-teal-500",
      icon: <CheckCircleIcon className="h-8 w-8 text-white" />,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">📊 Ticket Analytics</h3>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`rounded-xl bg-gradient-to-br ${s.color} p-5 text-white shadow-lg hover:scale-105 transform transition`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">{s.title}</p>
                  <p className="text-3xl font-bold mt-1">{s.count}</p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">{s.icon}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">🎟️ Recent Tickets</h3>

        {tickets.length === 0 ? (
          <p className="text-gray-500 text-sm">No tickets yet — create your first one!</p>
        ) : (
          <ul className="divide-y divide-gray-100">
            {tickets.slice(0, 5).map((t) => (
              <li
                key={t.id}
                className="py-4 flex items-center justify-between hover:bg-slate-50 transition rounded px-2"
              >
                <div>
                  <p className="font-semibold text-gray-800">{t.title}</p>
                  <p className="text-sm text-gray-500">{t.description.slice(0, 60)}...</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    t.status === "open"
                      ? "bg-rose-100 text-rose-600"
                      : t.status === "pending"
                      ? "bg-amber-100 text-amber-600"
                      : "bg-emerald-100 text-emerald-600"
                  }`}
                >
                  {t.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

