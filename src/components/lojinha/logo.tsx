/* eslint-disable @next/next/no-img-element */
// Logo "Lojinha da Cereja Bloom" (public/logo.svg)
export function Logo({ className = "h-12" }: { className?: string }) {
  return <img src="/lojinha/logo.svg" alt="Lojinha da Cereja Bloom" className={`${className} w-auto`} />;
}
