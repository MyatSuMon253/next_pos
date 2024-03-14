"use client";

import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "./_features/_users/store";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>{children}
        <Toaster /></Provider>
      </body>
    </html>
  );
}
