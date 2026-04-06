import { WHATSAPP_WA_ME } from "@/lib/site-config";
import type { CartItem } from "@/types/cart";
import { formatLkr } from "@/lib/format";
import { formatWeightGrams } from "@/lib/format";

export interface OrderMessageInput {
  items: CartItem[];
  booksSubtotalLkr: number;
  totalWeightGrams: number;
  shippingLkr: number;
  grandTotalLkr: number;
  customerName: string;
  phone: string;
  address: string;
}

export function buildOrderWhatsAppMessage(input: OrderMessageInput): string {
  const lines: string[] = [
    "Hi Librica Med team, I'd like to place this order:",
    "",
    "Items:",
  ];

  for (const item of input.items) {
    const lineTotal = item.price_lkr * item.quantity;
    lines.push(
      `• ${item.title} × ${item.quantity} — ${formatLkr(lineTotal)}`,
    );
  }

  lines.push(
    "",
    `Books subtotal: ${formatLkr(input.booksSubtotalLkr)}`,
    `Total weight: ${formatWeightGrams(input.totalWeightGrams)}`,
    `Shipping: ${formatLkr(input.shippingLkr)}`,
    `Grand total: ${formatLkr(input.grandTotalLkr)}`,
    "",
    `Name: ${input.customerName}`,
    `Phone: ${input.phone}`,
    `Delivery address: ${input.address}`,
  );

  return lines.join("\n");
}

export function buildWhatsAppUrlWithText(plainText: string): string {
  return `${WHATSAPP_WA_ME}?text=${encodeURIComponent(plainText)}`;
}

export function buildWhatsAppOrderUrl(message: string): string {
  return buildWhatsAppUrlWithText(message);
}

export interface ContactWhatsAppInput {
  name: string;
  phone: string;
  topic: string;
  message: string;
}

export function buildContactWhatsAppMessage(input: ContactWhatsAppInput): string {
  const name = input.name.trim();
  const phone = input.phone.trim();
  const topic = input.topic.trim();
  const body = input.message.trim();
  const lines = [
    "Hi Librica Med team,",
    "",
    `Name: ${name}`,
    `Phone: ${phone}`,
  ];
  if (topic) lines.push(`Topic: ${topic}`);
  lines.push("", "Message:", body);
  return lines.join("\n");
}
