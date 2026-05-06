import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ChatWidget } from "@/components/ChatWidget";
import { showChatWidget } from "@/lib/chat-config";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  const seo = content.seo;

  return {
    metadataBase: new URL(seo.siteUrl || "https://www.zamandesigns.com"),
    title: {
      default: seo.title,
      template: `%s | ${content.hero.name}`,
    },
    description: seo.description,
    keywords: seo.keywords.split(",").map((k) => k.trim()),
    authors: [{ name: content.hero.name }],
    creator: content.hero.name,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: seo.siteUrl,
      siteName: content.hero.name,
      title: seo.title,
      description: seo.description,
      images: seo.ogImage
        ? [{ url: seo.ogImage, width: 1200, height: 630, alt: seo.title }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      ...(seo.twitterHandle ? { creator: seo.twitterHandle } : {}),
      images: seo.ogImage ? [seo.ogImage] : [],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    ...(seo.googleVerification
      ? { verification: { google: seo.googleVerification } }
      : {}),
    alternates: {
      canonical: seo.siteUrl,
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Anti-flash: set theme before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');document.documentElement.setAttribute('data-theme',t||'light')}catch(e){document.documentElement.setAttribute('data-theme','light')}})()`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          {children}
          {showChatWidget() ? <ChatWidget /> : null}
        </ThemeProvider>
      </body>
    </html>
  );
}
