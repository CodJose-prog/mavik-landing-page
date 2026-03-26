import { cn } from "../../lib/cn";

type SectionContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionContainer({ children, className }: SectionContainerProps) {
  return <div className={cn("section-shell", className)}>{children}</div>;
}

