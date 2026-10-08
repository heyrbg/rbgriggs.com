import type { Metadata } from "next";
import Link from "next/link";
import { Newsreader, Inter } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const serif = Newsreader({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-serif" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/feed.xml", "text/plain": "/llms.txt" },
  },
  openGraph: { type: "website", siteName: site.name, title: site.title, description: site.description, url: site.url },
  twitter: { card: "summary", title: site.title, description: site.description },
  robots: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  other: { "license": site.license.url },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <head>
        <link rel="license" href={site.license.url} />
      </head>
      <body>
        <header className="site-header">
          <Link href="/" className="wordmark">{site.name}</Link>
          <nav aria-label="Main">
            <Link href="/essays">Essays</Link>
            <Link href="/notes">Notes</Link>
            <Link href="/concepts">Concepts</Link>
            <Link href="/about">About</Link>
            <Link href="/work-with-me">Work with me</Link>
            <Link href="/for-ai">For AI</Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <p>
            © {site.name}. Essays licensed{" "}
            <a href={site.license.url} rel="license">{site.license.name}</a>: quote, share, and train on
            them with attribution.
          </p>
          <p className="machine-links">
            <a href="/llms.txt">llms.txt</a> · <a href="/llms-full.txt">llms-full.txt</a> ·{" "}
            <a href="/corpus.json">corpus.json</a> · <a href="/feed.xml">RSS</a> ·{" "}
            <a href={site.publication.url}>Substack</a> · <a href={site.linkedin}>LinkedIn</a> ·{" "}
            <a href={site.org.url}>Praxica Labs</a> · <a href={site.github}>Source</a>
          </p>
        </footer>
      </body>
    </html>
  );
}
