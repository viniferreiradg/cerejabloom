import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { cache } from "react";
import type { Configuracoes } from "@/lib/lojinha/types";

// Leitura pública (sem cookies) para metadados, sitemap e robots
export const carregarSeo = cache(async () => {
  const supabase = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    { auth: { persistSession: false } },
  );
  const { data } = await supabase.from("configuracoes").select("*").eq("id", 1).single();
  const c = (data ?? {}) as Partial<Configuracoes>;
  return {
    titulo: c.seo_titulo || "Lojinha da Cereja Bloom",
    descricao: c.seo_descricao || "Camisetas oficiais da Cereja Bloom.",
    palavrasChave: (c.seo_palavras_chave ?? "")
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean),
    imagem: c.seo_imagem_url || null,
    urlSite: urlBase(c.seo_url_site),
    indexar: c.seo_indexar ?? true,
    googleVerificacao: c.seo_google_verificacao || "",
    googleAnalytics: c.seo_google_analytics || "",
    instagram: (c.seo_instagram || "").replace(/^@/, ""),
  };
});

// Endereço da lojinha: o configurado no admin, senão o site principal + /lojinha
function urlBase(configurada?: string) {
  const url = configurada?.trim()
    ? configurada.trim()
    : `${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"}/lojinha`;
  return url.replace(/\/+$/, "");
}
