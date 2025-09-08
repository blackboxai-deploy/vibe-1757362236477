import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jogo Educativo - Armazenamento de Medicamentos",
  description: "Aprenda sobre o armazenamento correto de medicamentos em casa através de um jogo interativo educativo.",
  keywords: "medicamentos, armazenamento, educação, saúde, segurança farmacêutica",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
          {children}
        </div>
      </body>
    </html>
  );
}