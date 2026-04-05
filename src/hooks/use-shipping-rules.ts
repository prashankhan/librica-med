"use client";

import { useEffect, useState } from "react";
import type { ShippingRule } from "@/types/shipping";
import { MOCK_SHIPPING_RULES } from "@/lib/mock-data";

export function useShippingRules(): ShippingRule[] {
  const [rules, setRules] = useState<ShippingRule[]>(MOCK_SHIPPING_RULES);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/shipping-rules")
      .then((r) => r.json())
      .then((data: { rules?: ShippingRule[] }) => {
        if (!cancelled && data.rules?.length)
          setRules(data.rules);
      })
      .catch(() => {
        /* keep mock fallback */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return rules;
}
