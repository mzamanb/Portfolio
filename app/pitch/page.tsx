import { getContent } from "@/lib/content";
import PitchPage from "./PitchPage";

export const dynamic = "force-dynamic";

export default async function PitchRoute() {
  const content = await getContent();
  return <PitchPage content={content} />;
}
