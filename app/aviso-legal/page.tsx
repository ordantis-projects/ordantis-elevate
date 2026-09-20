import { StaticContentPage } from "@/components/static-content-page";
import { getStaticPage } from "@/content/pages";
import { createMetadata } from "@/lib/metadata";

const page = getStaticPage("/aviso-legal")!;
export const metadata = createMetadata({ title: page.title, description: page.description, path: page.path });
export default function LegalPage() { return <StaticContentPage page={page} legalNotice showContact={false} />; }
