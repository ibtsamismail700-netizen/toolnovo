import Link from "next/link";

const tools = [
  { name: "Word Counter", slug: "word-counter", desc: "Count words, characters, sentences, and paragraphs instantly.", color: "bg-emerald-100 text-emerald-700" },
  { name: "Password Generator", slug: "password-generator", desc: "Generate strong, secure passwords with custom options.", color: "bg-amber-100 text-amber-700" },
  { name: "QR Code Generator", slug: "qr-code-generator", desc: "Create QR codes from text or URLs for sharing.", color: "bg-violet-100 text-violet-700" },
  { name: "Case Converter", slug: "case-converter", desc: "Convert text to uppercase, lowercase, title case, and more.", color: "bg-sky-100 text-sky-700" },
  { name: "Lorem Ipsum Generator", slug: "lorem-ipsum-generator", desc: "Generate placeholder text for designs and mockups.", color: "bg-rose-100 text-rose-700" },
  { name: "Age Calculator", slug: "age-calculator", desc: "Calculate your exact age in years, months, and days.", color: "bg-orange-100 text-orange-700" },
  { name: "JSON Formatter", slug: "json-formatter", desc: "Format, validate, and beautify your JSON data.", color: "bg-teal-100 text-teal-700" },
  { name: "Base64 Encoder/Decoder", slug: "base64-encoder", desc: "Encode text to Base64 or decode Base64 strings.", color: "bg-pink-100 text-pink-700" },
  { name: "Color Picker", slug: "color-picker", desc: "Pick colors and convert between HEX, RGB, and HSL.", color: "bg-fuchsia-100 text-fuchsia-700" },
  { name: "Image Compressor", slug: "image-compressor", desc: "Compress images to reduce file size with quality control.", color: "bg-cyan-100 text-cyan-700" },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Free Online Tools</h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-500">
          Fast, free, and easy-to-use tools for developers, students, and everyone. No signup required.
        </p>
      </section>
      <section>
        <h2 className="mb-6 text-2xl font-bold">All Tools</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <Link key={t.slug} href={`/tools/${t.slug}`} className="group">
              <div className="h-full rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg font-bold ${t.color}`}>
                    {t.name[0]}
                  </div>
                  <div className="min-w-0">
                    <h3 className="mb-1 font-semibold group-hover:underline">{t.name}</h3>
                    <p className="text-sm leading-relaxed text-gray-500">{t.desc}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}