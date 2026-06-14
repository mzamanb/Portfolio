export default function SectionLabel({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <p
      className={`section-eyebrow mb-4 ${dark ? "!text-[rgba(12,12,12,0.45)]" : ""}`}
    >
      {children}
    </p>
  );
}
