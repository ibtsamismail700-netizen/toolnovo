import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the ToolNovo Terms of Service. By using our free online tools, you agree to these terms. All tools are provided as-is with no warranties.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">Terms of Service</h1>
      <p className="mb-4 text-gray-600 leading-relaxed">
        <strong>Last updated:</strong> July 2025
      </p>

      <p className="mb-4 text-gray-600 leading-relaxed">
        Welcome to ToolNovo. By accessing or using our website and tools, you
        agree to be bound by these Terms of Service. If you do not agree with
        any part of these terms, please do not use our website.
      </p>

      <h2 className="mb-4 text-xl font-bold mt-10">Acceptance of Terms</h2>
      <p className="mb-4 text-gray-600 leading-relaxed">
        By using ToolNovo, you acknowledge that you have read, understood, and
        agree to be bound by these Terms of Service, as well as our{" "}
        <Link
          href="/privacy-policy"
          className="text-emerald-600 hover:underline"
        >
          Privacy Policy
        </Link>
        . These terms apply to all visitors, users, and others who access or use
        our services. We reserve the right to modify these terms at any time,
        and your continued use of the website after any changes constitutes
        acceptance of the new terms.
      </p>

      <h2 className="mb-4 text-xl font-bold mt-10">Use of Services</h2>
      <p className="mb-4 text-gray-600 leading-relaxed">
        ToolNovo provides a collection of free online tools for personal and
        commercial use. All tools are provided free of charge and are available
        without the need for registration or account creation. Our tools are
        offered on an &quot;as-is&quot; and &quot;as-available&quot; basis. We
        do not guarantee that the tools will be available at all times, free
        from errors, or that the results produced will be completely accurate.
        You are responsible for verifying the output of any tool for your
        specific needs.
      </p>

      <h2 className="mb-4 text-xl font-bold mt-10">
        Intellectual Property
      </h2>
      <p className="mb-4 text-gray-600 leading-relaxed">
        All content on the ToolNovo website, including but not limited to text,
        graphics, logos, code, and tool designs, is the property of ToolNovo and
        is protected by applicable intellectual property laws. You may not
        reproduce, distribute, modify, create derivative works from, or
        commercially exploit any content from our website without our prior
        written permission. You may, however, share links to our tools and
        reference our website for personal or educational purposes.
      </p>

      <h2 className="mb-4 text-xl font-bold mt-10">
        User Responsibilities
      </h2>
      <p className="mb-4 text-gray-600 leading-relaxed">
        When using ToolNovo, you agree not to misuse our services. This includes
        but is not limited to: attempting to disrupt or overload the website
        through automated means, using our tools for any unlawful purpose,
        attempting to reverse-engineer or tamper with the underlying code, or
        using our services in any way that could harm ToolNovo, its users, or
        third parties. We reserve the right to restrict or block access to any
        user who violates these terms.
      </p>

      <h2 className="mb-4 text-xl font-bold mt-10">
        Disclaimer of Warranties
      </h2>
      <p className="mb-4 text-gray-600 leading-relaxed">
        ToolNovo is provided on an &quot;as-is&quot; and
        &quot;as-available&quot; basis without any warranties of any kind,
        either express or implied. We do not warrant that the website will be
        uninterrupted, timely, secure, or error-free. We make no guarantees
        about the accuracy, reliability, or completeness of any results produced
        by our tools. You acknowledge that your use of the services is at your
        sole risk.
      </p>

      <h2 className="mb-4 text-xl font-bold mt-10">
        Limitation of Liability
      </h2>
      <p className="mb-4 text-gray-600 leading-relaxed">
        To the fullest extent permitted by applicable law, ToolNovo and its
        operators shall not be liable for any indirect, incidental, special,
        consequential, or punitive damages, including but not limited to loss of
        profits, data, or other intangible losses, resulting from your use of or
        inability to use our services. This limitation applies regardless of the
        legal theory under which the liability is claimed, whether in contract,
        tort, negligence, strict liability, or otherwise.
      </p>

      <h2 className="mb-4 text-xl font-bold mt-10">Third-Party Links</h2>
      <p className="mb-4 text-gray-600 leading-relaxed">
        Our website may contain links to third-party websites or services that
        are not owned or controlled by ToolNovo. We have no control over and
        assume no responsibility for the content, privacy policies, or practices
        of any third-party websites. We recommend that you review the terms and
        privacy policies of any third-party sites you visit. Your interactions
        with third-party websites are governed solely by their respective terms
        and policies.
      </p>

      <h2 className="mb-4 text-xl font-bold mt-10">Changes to These Terms</h2>
      <p className="mb-4 text-gray-600 leading-relaxed">
        We reserve the right to update or modify these Terms of Service at any
        time without prior notice. Any changes will be effective immediately upon
        posting to this page with an updated &quot;Last updated&quot; date. Your
        continued use of the website following any changes means that you accept
        and agree to the revised terms. We encourage you to review this page
        periodically for any updates.
      </p>

      <h2 className="mb-4 text-xl font-bold mt-10">Contact Us</h2>
      <p className="mb-4 text-gray-600 leading-relaxed">
        If you have any questions about these Terms of Service, please contact
        us at{" "}
        <Link href="/contact" className="text-emerald-600 hover:underline">
          support@toolnovo.net
        </Link>{" "}
        or visit our{" "}
        <Link href="/contact" className="text-emerald-600 hover:underline">
          Contact page
        </Link>
        . Return to our{" "}
        <Link href="/" className="text-emerald-600 hover:underline">
          homepage
        </Link>
        .
      </p>
    </main>
  );
}