import Link from "next/link";
import { ContactBand } from "@/components/page-elements";
import { StaticContentPage } from "@/components/static-content-page";
import { getStaticPage } from "@/content/pages";
import { createMetadata } from "@/lib/metadata";

const page = getStaticPage("/research")!;
export const metadata = createMetadata({ title: page.title, description: page.description, path: page.path });
export default function ResearchPage() {
  return <><StaticContentPage page={page} showContact={false} /><div className="shell inline-actions research-index-link"><Link className="button" href="/research/exist-2026">Abrir la ficha completa de EXIST 2026</Link></div><ContactBand /></>;
}
