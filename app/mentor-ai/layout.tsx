import { ForceLightMode } from "./force-light-mode";

export default function MentorAiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.setAttribute('data-theme','light')`,
        }}
      />
      <ForceLightMode />
      {children}
    </>
  );
}
