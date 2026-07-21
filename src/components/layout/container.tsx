import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utilities";

type ContainerElement =
  | "div"
  | "section"
  | "article"
  | "header"
  | "footer"
  | "nav";

type ContainerWidth = "content" | "wide" | "full";

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ContainerElement;
  width?: ContainerWidth;
}

const widthClasses: Record<ContainerWidth, string> = {
  content: "max-w-[var(--container-content)]",
  wide: "max-w-[var(--container-wide)]",
  full: "max-w-none",
};

export function Container({
  as: Element = "div",
  width = "wide",
  className,
  ...props
}: ContainerProps) {
  return (
    <Element
      className={cn(
        "mx-auto w-full px-[var(--page-gutter)]",
        widthClasses[width],
        className,
      )}
      {...props}
    />
  );
}
