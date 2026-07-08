import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the ToolNovo Privacy Policy to understand how we handle your data. All tools run in your browser — we do not collect personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="mb-8 text-3xl font-bold">Privacy Policy</h1>
      <p className="mb-4 text-gray-600 leading-relaxed">
        <strong>Last updated:</strong> July 2025
      </p>

      <p className="mb-4 text-gray-600 leading-relaxed">
        At ToolNovo, we are committed to protecting your privacy. This Privacy
        Policy explains how we handle information when you visit and use our
        website. We encourage you to read this policy carefully to understand
        our practices regarding your data.
      </p>

      <h2 className="mb-4 text-xl font-bold mt-10">
        Information We Collect
      </h2>
      <p className="mb-4 text-gray-600 leading-relaxed">
        We do not collect personal data. All of our tools run entirely in your
        browser, which means the text, files, and data you input are never sent
        to our servers. We do not require you to create an account, and we do
        not ask for your name, email address, or any other personally
        identifiable information to use our tools.
      </p>
      <p className="mb-4 text-gray-600 leading-relaxed">
        When you use our contact form, any information you provide — such as
        your name, email address, and message — is used solely for the purpose
        of responding to your inquiry.
      </p>

      <h2 className="mb-4 text-xl font-bold mt-10">
        How We Use Information
      </h2>
      <p className="mb-4 text-gray-600 leading-relaxed">
        Since we do not collect personal data through our tools, there is very
        little information to use. Any data submitted through the contact form
        is used only to respond to your message and is not stored beyond what is
        necessary to address your inquiry. We do not sell, share, or distribute
        any information you provide to third parties for marketing purposes.
      </p>

      <h2 className="mb-4 text-xl font-bold mt-10">Cookies &amp; Tracking</h2>
      <p className="mb-4 text-gray-600 leading-relaxed">
        Our website uses cookies and similar tracking technologies to serve
        advertisements through Google AdSense. These cookies are used by Google
        to display relevant ads based on your browsing history and preferences.
        Google may use the DoubleClick DART cookie and other technologies to
        serve ads based on visits to this and other websites on the internet.
      </p>
      <p className="mb-4 text-gray-600 leading-relaxed">
        You can opt out of personalized advertising by visiting{" "}
        <Link
          href="https://www.google.com/settings/ads"
          className="text-emerald-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Ad Settings
        </Link>
        . You may also disable cookies in your browser settings, though this
        may affect your experience on some websites.
      </p>

      <h2 className="mb-4 text-xl font-bold mt-10">
        Third-Party Services
      </h2>
      <p className="mb-4 text-gray-600 leading-relaxed">
        We use Google AdSense to display advertisements on our website. Google
        AdSense may collect cookies and use web beacons to serve ads based on
        your prior visits to our site and other websites. Google&#39;s use of
        advertising cookies enables it and its partners to serve ads based on
        your visit to our site and/or other sites on the Internet. You may
        opt out of personalized advertising by visiting{" "}
        <Link
          href="https://www.google.com/settings/ads"
          className="text-emerald-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google&#39;s Ad Settings
        </Link>
        .
      </p>

      <h2 className="mb-4 text-xl font-bold mt-10">Data Security</h2>
      <p className="mb-4 text-gray-600 leading-relaxed">
        We take reasonable measures to ensure the security of our website.
        Since our tools process all data locally in your browser, your
        information never travels to our servers, which significantly reduces
        any security risk. We use HTTPS to encrypt connections to our website,
        protecting your browsing activity from interception.
      </p>

      <h2 className="mb-4 text-xl font-bold mt-10">
        Children&#39;s Privacy
      </h2>
      <p className="mb-4 text-gray-600 leading-relaxed">
        Our website is not directed at children under the age of 13. We do not
        knowingly collect personal information from children. If you are a
        parent or guardian and believe that your child has provided us with
        personal information through the contact form, please contact us so we
        can take appropriate action.
      </p>

      <h2 className="mb-4 text-xl font-bold mt-10">Changes to This Policy</h2>
      <p className="mb-4 text-gray-600 leading-relaxed">
        We may update this Privacy Policy from time to time to reflect changes
        in our practices or for other operational, legal, or regulatory reasons.
        Any changes will be posted on this page with an updated &quot;Last
        updated&quot; date. We encourage you to review this policy periodically
        to stay informed about how we protect your privacy.
      </p>

      <h2 className="mb-4 text-xl font-bold mt-10">Contact Us</h2>
      <p className="mb-4 text-gray-600 leading-relaxed">
        If you have any questions or concerns about this Privacy Policy, please
        reach out to us at{" "}
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