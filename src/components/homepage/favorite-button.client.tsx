"use client";

import { Heart } from "lucide-react";
import { useState } from "react";

import styles from "@/components/homepage/homepage.module.css";

export function FavoriteButton({ productName }: { productName: string }) {
  const [selected, setSelected] = useState(false);

  return (
    <button
      type="button"
      aria-label={`${selected ? "Remove" : "Add"} ${productName} ${selected ? "from" : "to"} favourites`}
      aria-pressed={selected}
      className={styles.favoriteButton}
      onClick={() => setSelected((current) => !current)}
    >
      <Heart aria-hidden="true" fill={selected ? "currentColor" : "none"} size={16} strokeWidth={1.5} />
    </button>
  );
}
