"use client";

import { notFound } from "next/navigation";

export default function SharedPage({ params, searchParams }) {
  const { id } = params;
  const { activity, time, from, to } = searchParams;

  if (!activity || !time || !from || !to) {
    return notFound();
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Shared Activity</h2>
      <p>
        I will do: <strong>{activity}</strong>
      </p>
      <p>
        For: <strong>{time}</strong> mins daily
      </p>
      <p>Date Range:</p>
      <ul className="ml-4">
        <li>From: {new Date(from).toLocaleDateString()}</li>
        <li>To: {new Date(to).toLocaleDateString()}</li>
      </ul>
      <p className="mt-4">
        If I miss a day, I owe you <strong>$5</strong>
      </p>
    </div>
  );
}
