import type { ReactNode } from "react";

import styles from "@/components/homepage/homepage.module.css";
import { cn } from "@/lib/utilities";

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
}

export function RevealOnScroll({
  children,
  className,
}: RevealOnScrollProps) {
  return (
    <div
      className={cn(styles.reveal, className)}
      data-visible="true"
      data-reveal
    >
      {children}
    </div>
  );
}
