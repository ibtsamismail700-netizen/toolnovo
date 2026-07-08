"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <h2 className="mb-4 text-xl font-bold mt-10">Send Us a Message</h2>

      {submitted ? (
        <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 p-6 text-center">
          <p className="text-lg font-semibold text-emerald-700">
            Message Sent!
          </p>
          <p className="mt-2 text-gray-600">
            Thank you for reaching out. We will get back to you at{" "}
            <span className="font-semibold">{email || "your email"}</span>{" "}
            within 24-48 hours.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can we help?"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-700 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <button
            type="submit"
            className="rounded-lg bg-emerald-600 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-emerald-700"
          >
            Send Message
          </button>
        </form>
      )}

      <h2 className="mb-4 text-xl font-bold mt-10">
        Frequently Asked Questions
      </h2>

      <div className="mb-4 space-y-6">
        <div>
          <h3 className="mb-2 font-semibold text-gray-800">
            Are the tools free to use?
          </h3>
          <p className="mb-4 text-gray-600 leading-relaxed">
            Yes, all tools on ToolNovo are 100% free. There are no premium
            tiers, hidden fees, or paywalls. You can use any tool as many times
            as you like without creating an account.
          </p>
        </div>

        <div>
          <h3 className="mb-2 font-semibold text-gray-800">
            Is my data safe?
          </h3>
          <p className="mb-4 text-gray-600 leading-relaxed">
            Absolutely. All of our tools run entirely in your browser. Your text,
            files, and data are never sent to our servers. We do not collect or
            store any personal information from tool usage. For more details,
            please read our{" "}
            <Link
              href="/privacy-policy"
              className="text-emerald-600 hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        <div>
          <h3 className="mb-2 font-semibold text-gray-800">
            How can I suggest a new tool?
          </h3>
          <p className="mb-4 text-gray-600 leading-relaxed">
            We love hearing from our users! You can suggest a new tool by using
            the contact form above or by emailing us at{" "}
            <span className="font-semibold text-gray-700">
              support@toolnovo.net
            </span>
            . We review all suggestions and do our best to add the most
            requested tools to the platform. Return to our{" "}
            <Link href="/" className="text-emerald-600 hover:underline">
              homepage
            </Link>{" "}
            to see all available tools.
          </p>
        </div>
      </div>
    </>
  );
}