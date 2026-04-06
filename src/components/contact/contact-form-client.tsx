"use client";

import { useState } from "react";
import {
  buildContactWhatsAppMessage,
  buildWhatsAppUrlWithText,
} from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import {
  PAGE_FIELD_LABEL_CLASS,
  PAGE_PRIMARY_CTA_CLASS,
} from "@/components/layout/page-container";

const topicOptions = [
  { value: "", label: "Select a topic (optional)" },
  { value: "General enquiry", label: "General enquiry" },
  { value: "Book recommendation", label: "Book recommendation" },
  { value: "Stock availability", label: "Stock availability" },
  { value: "Order support", label: "Order support" },
  { value: "Delivery question", label: "Delivery question" },
  { value: "Other", label: "Other" },
] as const;

export function ContactFormClient() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const msg = buildContactWhatsAppMessage({
      name,
      phone,
      topic,
      message,
    });
    window.location.href = buildWhatsAppUrlWithText(msg);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border border-gray-100 bg-white p-8 sm:p-10"
    >
      <h2 className="text-xl font-bold tracking-tight text-[#001f40] md:text-2xl">
        Send us a message
      </h2>
      <p className="text-sm leading-relaxed text-gray-500 md:text-base">
        Fill in the form and we will open WhatsApp with your message ready to
        send. You can edit it there before tapping send.
      </p>

      <div>
        <label htmlFor="contact_name" className={PAGE_FIELD_LABEL_CLASS}>
          Full name
        </label>
        <input
          id="contact_name"
          name="contact_name"
          type="text"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-base text-[#001f40] transition duration-200 ease-out focus:border-[#037eff] focus:outline-none focus:ring-2 focus:ring-[#037eff]/20"
        />
      </div>

      <div>
        <label htmlFor="contact_phone" className={PAGE_FIELD_LABEL_CLASS}>
          Phone number
        </label>
        <input
          id="contact_phone"
          name="contact_phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          placeholder="e.g. 071 620 0863"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 text-base text-[#001f40] transition duration-200 ease-out focus:border-[#037eff] focus:outline-none focus:ring-2 focus:ring-[#037eff]/20"
        />
      </div>

      <div>
        <label htmlFor="contact_topic" className={PAGE_FIELD_LABEL_CLASS}>
          Topic
        </label>
        <select
          id="contact_topic"
          name="contact_topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-base text-[#001f40] transition duration-200 ease-out focus:border-[#037eff] focus:outline-none focus:ring-2 focus:ring-[#037eff]/20"
        >
          {topicOptions.map((opt) => (
            <option key={opt.value || "empty"} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact_message" className={PAGE_FIELD_LABEL_CLASS}>
          Message
        </label>
        <textarea
          id="contact_message"
          name="contact_message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="How can we help?"
          className="mt-2 w-full resize-y rounded-2xl border border-gray-200 px-4 py-3 text-base text-[#001f40] transition duration-200 ease-out focus:border-[#037eff] focus:outline-none focus:ring-2 focus:ring-[#037eff]/20"
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        className={`w-full justify-center ${PAGE_PRIMARY_CTA_CLASS}`}
      >
        Continue to WhatsApp
      </Button>
    </form>
  );
}
