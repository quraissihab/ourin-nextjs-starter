import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ourin - Next.js Boilerplate",
  description: "An opinionated collection of components, hooks, and utilities for your Next.js project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
