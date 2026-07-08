import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about ToolNovo — a free online platform providing simple, fast, and reliable tools for everyday digital tasks. No signups, no paywalls.",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">About Us</h1>

      <h2 className="mb-4 text-xl font-bold mt-10">Who We Are</h2>
      <p className="mb-4 text-gray-600 leading-relaxed">
        ToolNovo is a free online platform providing simple, fast, and reliable
        tools designed to help you accomplish everyday digital tasks without the
        hassle. Whether you need to count words in a document, generate a secure
        password, or format a block of JSON, ToolNovo has you covered. Our
        platform is built with the belief that essential online utilities should
        be accessible to everyone — no signups, no hidden fees, and no
        unnecessary complexity.
      </p>
      <p className="mb-4 text-gray-600 leading-relaxed">
        We are a small team of developers and designers passionate about
        creating clean, efficient tools that respect your time and privacy.
        Every tool on ToolNovo is crafted to load quickly, work flawlessly, and
        deliver results in seconds.
      </p>

      <h2 className="mb-4 text-xl font-bold mt-10">Our Mission</h2>
      <p className="mb-4 text-gray-600 leading-relaxed">
        Our mission is to make everyday digital tasks easier for everyone,
        without paywalls or signups. We believe that access to basic online
        utilities is a right, not a privilege. That is why every tool on
        ToolNovo is completely free to use, with no account required and no
        limits on usage. We want to be the go-to destination when you need a
        quick solution — and we want that experience to be seamless every single
        time.
      </p>

      <h2 className="mb-4 text-xl font-bold mt-10">What We Offer</h2>
      <p className="mb-4 text-gray-600 leading-relaxed">
        ToolNovo currently provides the following free online tools:
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
        <li>Word Counter</li>
        <li>Password Generator</li>
        <li>QR Code Generator</li>
        <li>Case Converter</li>
        <li>Lorem Ipsum Generator</li>
        <li>Age Calculator</li>
        <li>JSON Formatter</li>
        <li>Base64 Encoder/Decoder</li>
        <li>Color Picker</li>
        <li>Image Compressor</li>
      </ul>
      <p className="mb-4 text-gray-600 leading-relaxed">
        We are constantly working on adding new tools to our collection. If
        there is a tool you would like to see, feel free to{" "}
        <Link href="/contact" className="text-emerald-600 hover:underline">
          get in touch
        </Link>{" "}
        with us.
      </p>

      <h2 className="mb-4 text-xl font-bold mt-10">Why Choose ToolNovo</h2>
      <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-600">
        <li>
          <strong>100% Free</strong> — No premium tiers, no hidden charges, no
          paywalls.
        </li>
        <li>
          <strong>No Signup Required</strong> — Just open a tool and start using
          it instantly.
        </li>
        <li>
          <strong>Privacy-Focused</strong> — All tools run in your browser. We
          do not collect or store your data.
        </li>
        <li>
          <strong>Fast and Reliable</strong> — Lightweight tools that load
          instantly and work every time.
        </li>
        <li>
          <strong>Mobile Friendly</strong> — Fully responsive design so you can
          use our tools on any device.
        </li>
      </ul>

      <p className="mb-4 text-gray-600 leading-relaxed">
        Thank you for choosing ToolNovo. We hope our tools make your day a
        little easier. Visit our{" "}
        <Link href="/" className="text-emerald-600 hover:underline">
          homepage
        </Link>{" "}
        to explore all available tools.
      </p>
    </main>
  );
}