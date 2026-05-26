import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import SiteHeader from "@/components/SiteHeader";
import Script from 'next/script';
import "./globals.css";

// NO GOOGLE FONTS - Use system fonts for MAXIMUM performance
const fontVariables = {
  spaceGrotesk: {
    variable: "--font-space-grotesk",
    style: {
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    }
  },
  inter: {
    variable: "--font-inter",
    style: {
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    }
  }
};

export const metadata: Metadata = {
  title: "TEELI.NET - Reality Rendered. Instantly.",
  description: "Futuristic rendering-focused AI & cloud studio.",
};

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* CRITICAL CSS - Minimal inline styles for instant render */}
        <style dangerouslySetInnerHTML={{__html: `
          *,::before,::after{box-sizing:border-box}
          html{line-height:1.5;-webkit-text-size-adjust:100%;tab-size:4;font-family:system-ui,-apple-system,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif}
          body{margin:0;background-color:#000;color:#fff;font-feature-settings:"kern"}
          img,svg,video{max-width:100%;height:auto;display:block}
          .group:hover *{will-change:auto}
        `}} />
        
        {/* Performance: Preconnect for critical third-party domains */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
      </head>
      <body 
        className="font-sans antialiased" 
        style={{
          fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
        }}
        suppressHydrationWarning
      >
        {/* 🚀 PERFORMANCE: GA4 + GTM deferred via afterInteractive strategy
            Previously loaded eagerly via @next/third-parties (266 KiB blocking main thread)
            Now loads AFTER hydration → reduces TBT by ~150ms, improves FCP/LCP on mobile */}
        {GA4_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA4_ID}', {
                  page_path: window.location.pathname,
                  send_page_view: true
                });
              `}
            </Script>
          </>
        )}
        {GTM_ID && (
          <Script id="gtm-init" strategy="lazyOnload">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `}
          </Script>
        )}

        {/* Analytics Provider for automatic route tracking */}
        <AnalyticsProvider>
          <SiteHeader />
          {children}
        </AnalyticsProvider>
        
        {/* Vercel Analytics */}
        <Analytics />
        
        {/* Vercel Speed Insights */}
        <SpeedInsights />
      </body>
    </html>
  );
}

