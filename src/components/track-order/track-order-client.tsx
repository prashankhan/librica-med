"use client";

import { useState } from "react";
import { formatLkr } from "@/lib/format";
import { formatReadableDate } from "@/lib/utils/format-date";
import { getOrderStatusStyle } from "@/lib/utils/order-status-style";
import type { OrderRecord } from "@/types/order";
import { Button } from "@/components/ui/button";

const statusLabels: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  packed: "Packed",
  completed: "Completed",
  cancelled: "Cancelled",
};

export function TrackOrderClient() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<OrderRecord[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setOrders(null);
    setError(null);
    try {
      const q = encodeURIComponent(phone.trim());
      const res = await fetch(`/api/orders/track?phone=${q}`);
      const data = (await res.json()) as {
        orders?: OrderRecord[];
        error?: string;
      };

      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        setLoading(false);
        return;
      }

      setOrders(Array.isArray(data.orders) ? data.orders : []);
    } catch {
      setError("Could not reach the server. Try again shortly.");
    }
    setLoading(false);
  }

  const list = orders ?? [];

  return (
    <div className="mx-auto max-w-2xl">
      <form onSubmit={handleSearch} className="space-y-4">
        <label htmlFor="track-phone" className="sr-only">
          Phone number used when ordering
        </label>
        <input
          id="track-phone"
          type="tel"
          inputMode="tel"
          required
          placeholder="e.g. 071 620 0863 or +94 71 620 0863"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-full border border-neutral-200 px-5 py-3 text-sm text-[#001f40] focus:border-[#037eff] focus:outline-none focus:ring-2 focus:ring-[#037eff]/20"
        />
        <Button
          type="submit"
          variant="primary"
          className="w-full justify-center"
          disabled={loading}
        >
          {loading ? "Checking…" : "Track order"}
        </Button>
      </form>

      {error ? (
        <p
          className="mt-8 rounded-2xl border border-neutral-200 bg-neutral-50/50 px-5 py-6 text-center text-sm text-[#001f40]/65"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      {orders !== null && list.length === 0 && !error ? (
        <p className="mt-10 rounded-2xl border border-dashed border-neutral-200 bg-white px-6 py-14 text-center text-sm font-medium text-[#001f40]/75">
          No orders found for this phone number yet.
        </p>
      ) : null}

      {list.length > 0 ? (
        <ul className="mt-10 flex flex-col gap-6">
          {list.map((order) => (
            <li key={order.id}>
              <article className="rounded-2xl border border-neutral-200/90 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#001f40]/45">
                      Order ID
                    </p>
                    <p className="mt-1 text-lg font-semibold tracking-tight text-[#001f40]">
                      {order.order_id}
                    </p>
                  </div>
                  <span
                    className={getOrderStatusStyle(order.order_status)}
                    aria-label={`Status: ${statusLabels[order.order_status] ?? order.order_status}`}
                  >
                    {statusLabels[order.order_status] ?? order.order_status}
                  </span>
                </div>

                <dl className="mt-6 space-y-4 text-sm">
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wider text-[#001f40]/45">
                      Placed
                    </dt>
                    <dd className="mt-1 font-medium tabular-nums text-[#001f40]">
                      {formatReadableDate(order.created_time)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wider text-[#001f40]/45">
                      Items
                    </dt>
                    <dd className="mt-1 whitespace-pre-line leading-relaxed text-[#001f40]/80">
                      {order.items_summary || "—"}
                    </dd>
                  </div>
                  <div className="flex flex-wrap items-baseline justify-between gap-2 border-t border-neutral-100 pt-4">
                    <dt className="text-xs font-medium uppercase tracking-wider text-[#001f40]/45">
                      Grand total
                    </dt>
                    <dd className="text-base font-semibold tabular-nums tracking-tight text-[#001f40]">
                      {formatLkr(order.grand_total_lkr)}
                    </dd>
                  </div>
                </dl>
              </article>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
