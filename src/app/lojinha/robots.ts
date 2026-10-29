import type { MetadataRoute } from "next";
import { carregarSeo } from "@/lib/lojinha/seo";

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const seo = await carregarSeo();
  return {
    // Com a indexação desligada no admin, nenhum buscador entra
    rules: seo.indexar
      ? { userAgent: "*", allow: "/lojinha", disallow: ["/lojinha/admin", "/lojinha/carrinho", "/lojinha/pedido/"] }
      : { userAgent: "*", disallow: "/" },
    sitemap: `${seo.urlSite}/sitemap.xml`,
  };
}
