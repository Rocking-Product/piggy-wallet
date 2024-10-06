import type { Metadata } from "next";
import "./globals.css";
import PrivyProviderWrapper from "@/components/PrivyProviderWrapper";  
import { Quicksand } from "next/font/google";
import { SmartAccountProvider } from "./hooks/SmartAccountContext";


const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Piggy Investment",
  description: "Piggy Investment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={quicksand.className}>
        <PrivyProviderWrapper>
          <SmartAccountProvider>
            {children}
          </SmartAccountProvider>
        </PrivyProviderWrapper>
      </body>
    </html>
  );
}