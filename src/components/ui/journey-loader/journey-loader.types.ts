export type JourneyLoaderSize = "small" | "medium" | "large";

export type JourneyLoaderBackground = "transparent" | "surface";

export interface JourneyLoaderProps {
  size?: JourneyLoaderSize;
  fullscreen?: boolean;
  className?: string;
  label?: string;
  background?: JourneyLoaderBackground;
}
