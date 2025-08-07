import config from "@/config/config.json";
import GoogleTagManager from "@/helpers/TagManager";
import "@/styles/main.css";
import { Inter } from "next/font/google";
import Script from "next/script";

const fontPrimary = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-primary",
  preload: true,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning={true} lang="en" className="dark">
      <GoogleTagManager />
      <head>
        {/* responsive meta */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />

        {/* favicon */}
        <link rel="shortcut icon" href={config.site.favicon} />
        {/* theme meta */}
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#fff"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#000"
        />

        {/* Partnero script */}
        <Script
          strategy="beforeInteractive"
          type="application/javascript"
          id="partnero-script"
          dangerouslySetInnerHTML={{
            __html: `(function(p,t,n,e,r,o){ p['__partnerObject']=r;function f(){
    var c={ a:arguments,q:[]};var r=this.push(c);return "number"!=typeof r?r:f.bind(c.q);}
    f.q=f.q||[];p[r]=p[r]||f.bind(f.q);p[r].q=p[r].q||f.q;o=t.createElement(n);
    var _=t.getElementsByTagName(n)[0];o.async=1;o.src=e+'?v'+(~~(new Date().getTime()/1e6));
    _.parentNode.insertBefore(o,_);})(window, document, 'script', 'https://app.partnero.com/js/universal.js', 'po');
    po('settings', 'assets_host', 'https://assets.partnero.com');
    po('program', '2DJBEWR1', 'load');
      `,
          }}
        />
      </head>

      <body
        suppressHydrationWarning={true}
        className={`${fontPrimary.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
