import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { carregarSeo } from "@/lib/lojinha/seo";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

// Título, descrição e compartilhamento vêm de Admin → Configurações → SEO
export async function generateMetadata(): Promise<Metadata> {
  const seo = await carregarSeo();
  const imagens = seo.imagem ? [{ url: seo.imagem, width: 1200, height: 630, alt: seo.titulo }] : undefined;

  return {
    metadataBase: new URL(seo.urlSite),
    title: { default: seo.titulo, template: `%s · ${seo.titulo}` },
    description: seo.descricao,
    keywords: seo.palavrasChave,
    applicationName: seo.titulo,
    robots: seo.indexar ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: seo.titulo,
      title: seo.titulo,
      description: seo.descricao,
      images: imagens,
    },
    twitter: { card: seo.imagem ? "summary_large_image" : "summary", title: seo.titulo, description: seo.descricao, images: imagens },
    verification: seo.googleVerificacao ? { google: seo.googleVerificacao } : undefined,
    // Mesmo favicon do site principal — é a mesma marca.
    icons: {
      icon: [
        { url: "/favicon/favicon-96x96.png", type: "image/png", sizes: "96x96" },
        { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      ],
      shortcut: "/favicon/favicon.ico",
      apple: { url: "/favicon/apple-touch-icon.png", sizes: "180x180" },
    },
    manifest: "/favicon/site.webmanifest",
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${spaceGrotesk.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
