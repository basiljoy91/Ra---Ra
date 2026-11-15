"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import styles from "@/components/homepage/homepage.module.css";
import { beyondDesigns } from "@/data/beyond-collection";

const slides = beyondDesigns.map((design) => ({
  title: design.title,
  note: design.corePhilosophy,
  src: design.hero.desktop.url,
  alt: design.hero.desktop.alt,
  href: `/products/${design.handle}`,
}));

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setCurrent((index) => (index + 1) % slides.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [paused]);

  const activeSlide = slides[current] ?? slides[0]!;

  function move(direction: -1 | 1) {
    setCurrent((index) => (index + direction + slides.length) % slides.length);
  }

  return (
    <section
      className={styles.heroCarousel}
      aria-roledescription="carousel"
      aria-label="ra&ra campaign stories"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className={styles.heroSlides} aria-live="polite">
        {slides.map((slide, index) => (
          <div
            className={styles.heroSlide}
            data-active={index === current}
            aria-hidden={index !== current}
            key={slide.src}
          >
            <Image
              alt={index === current ? slide.alt : ""}
              className={styles.heroCampaignImage}
              fill
              priority={index === 0}
              sizes="100vw"
              src={slide.src}
            />
          </div>
        ))}
      </div>

      <div className={styles.heroCarouselShade} />
      <div className={styles.heroCarouselControls}>
        <p>
          <span>{String(current + 1).padStart(2, "0")}</span>
          <span aria-hidden="true">/</span>
          <span>{String(slides.length).padStart(2, "0")}</span>
        </p>
        <div className={styles.heroArrowGroup}>
          <button type="button" onClick={() => move(-1)} aria-label="Previous campaign">
            <ArrowLeft aria-hidden="true" size={18} />
          </button>
          <button type="button" onClick={() => move(1)} aria-label="Next campaign">
            <ArrowRight aria-hidden="true" size={18} />
          </button>
        </div>
      </div>

      <div className={styles.heroCarouselAction}>
        <p>{activeSlide.note}</p>
        <Link href={activeSlide.href}>
          Explore {activeSlide.title}
          <ArrowRight aria-hidden="true" size={16} />
        </Link>
      </div>

      <div className={styles.heroDots} role="group" aria-label="Choose campaign">
        {slides.map((slide, index) => (
          <button
            type="button"
            aria-label={`Show ${slide.title}`}
            aria-current={index === current ? "true" : undefined}
            data-active={index === current}
            key={slide.src}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </section>
  );
}
