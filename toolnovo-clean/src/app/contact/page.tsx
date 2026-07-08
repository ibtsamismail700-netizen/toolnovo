import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the ToolNovo team. Send us a message, ask a question, or suggest a new tool. We typically respond within 24-48 hours.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">Contact Us</h1>
      <p className="mb-4 text-gray-600 leading-relaxed">
        We would love to hear from you. Whether you have a question, feedback, or
        a tool suggestion, feel free to reach out using the form below or email
        us directly at{" "}
        <span className="font-semibold text-gray-700">
          support@toolnovo.net
        </span>
        .
      </p>
      <p className="mb-4 text-gray-600 leading-relaxed">
        We typically respond within 24-48 hours.
      </p>

      <ContactForm />
    </main>
  );
}