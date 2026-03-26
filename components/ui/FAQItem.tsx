import { ChevronDown } from "lucide-react";

type FAQItemProps = {
  question: string;
  answer: string;
};

export default function FAQItem({ question, answer }: FAQItemProps) {
  return (
    <details className="group panel rounded-[28px] p-5 sm:p-6">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
        <span className="font-display text-lg font-semibold tracking-[-0.03em] text-mavik-text">{question}</span>
        <span className="flex h-10 w-10 items-center justify-center rounded-[14px] border border-mavik-line bg-white/[0.04] text-mavik-muted-strong transition duration-200 group-hover:border-[rgba(123,103,255,0.22)] group-open:text-mavik-copper">
          <ChevronDown className="h-5 w-5 transition duration-200 group-open:rotate-180" aria-hidden />
        </span>
      </summary>
      <div className="mt-4 border-t border-mavik-line pt-4">
        <p className="text-base leading-8 text-mavik-muted">{answer}</p>
      </div>
    </details>
  );
}

