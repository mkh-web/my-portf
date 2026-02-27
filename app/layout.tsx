
import { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  metadataBase: new URL("https://mof-yemen.com"),
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="ar">
      <body className={`antialiased`} dir="rtl">
          {children}
      </body>
    </html>
  );
}
