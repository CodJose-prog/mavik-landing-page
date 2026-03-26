import BadgeTag from "../shared/BadgeTag";

type ProofCardProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function ProofCard({ eyebrow, title, description }: ProofCardProps) {
  return (
    <article className="rounded-[28px] border border-mavik-line bg-white/[0.03] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] transition duration-300 hover:border-[rgba(123,103,255,0.18)]">
      <BadgeTag>{eyebrow}</BadgeTag>
      <h3 className="font-display mt-4 text-lg font-semibold tracking-[-0.04em] text-mavik-text">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-mavik-muted">{description}</p>
    </article>
  );
}

