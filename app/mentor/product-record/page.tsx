import type { Metadata } from "next";
import { MentorTopBar } from "@/components/mentor/MentorTopBar";
import { MentorProductRecordView } from "@/components/mentor/MentorProductRecordView";
import { getMentorProductRecordAppHtml } from "@/lib/mentor-product-record";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "MENTOR — Product record",
    robots: { index: false, follow: false },
  };
}

export default async function MentorProductRecordPage() {
  const html = await getMentorProductRecordAppHtml();

  return (
    <div className="relative min-h-screen overflow-hidden bg-bg">
      <div className="pointer-events-none absolute inset-0 bg-architecture-grid opacity-25 [mask-image:radial-gradient(ellipse_at_top,black_15%,transparent_60%)]" />
      <MentorTopBar />
      <div className="relative z-0 overflow-x-auto px-4 pb-10 pt-24 sm:px-6 md:pt-28">
        <div className="mx-auto w-full max-w-7xl">
          <MentorProductRecordView html={html} />
        </div>
      </div>
    </div>
  );
}
