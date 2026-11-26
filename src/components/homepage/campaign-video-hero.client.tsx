"use client";

import { Pause, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { useLocale } from "@/components/i18n/locale-provider.client";
import styles from "@/components/homepage/campaign-video-hero.module.css";

const DESKTOP_VIDEO = "/videos/beyond-hero-desktop.mp4";
const MOBILE_VIDEO = "/videos/beyond-hero-mobile.mp4";
const DESKTOP_POSTER = "/videos/beyond-hero-desktop-poster.jpg";
const MOBILE_POSTER = "/videos/beyond-hero-mobile-poster.jpg";
const MOBILE_QUERY = "(max-width: 47.999rem)";
const LOAD_TIMEOUT_MS = 8_000;

type PlaybackState = "poster" | "loading" | "playing" | "paused" | "error";

type NetworkInformation = {
  downlink?: number;
  effectiveType?: string;
  saveData?: boolean;
};

function shouldDeferAutoplay() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  const slowConnection = connection?.effectiveType
    ? ["slow-2g", "2g", "3g"].includes(connection.effectiveType)
    : typeof connection?.downlink === "number" && connection.downlink < 1.5;

  return reducedMotion || connection?.saveData === true || slowConnection;
}

export function CampaignVideoHero() {
  const { locale } = useLocale();
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPausedRef = useRef(false);
  const loadTimerRef = useRef<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [source, setSource] = useState<string | null>(null);
  const [playbackState, setPlaybackState] = useState<PlaybackState>("poster");
  const [hasDecodedFrame, setHasDecodedFrame] = useState(false);

  const copy = locale === "de"
    ? {
        eyebrow: "RA & RA / BEYOND",
        title: "Was wir in uns tragen.",
        description: "Nicht alles, was uns prägt, ist sichtbar.",
        cta: "Kollektion entdecken",
        play: "Kampagnenfilm abspielen",
        pause: "Kampagnenfilm pausieren",
        loading: "Kampagnenfilm wird geladen",
        posterAlt: "Baumwollfasern im warmen Morgenlicht",
      }
    : {
        eyebrow: "RA & RA / BEYOND",
        title: "The things we carry.",
        description: "Not everything that shapes us can be seen.",
        cta: "Explore the collection",
        play: "Play campaign film",
        pause: "Pause campaign film",
        loading: "Loading campaign film",
        posterAlt: "Cotton fibres in warm morning light",
      };

  const clearLoadTimer = useCallback(() => {
    if (loadTimerRef.current === null) return;
    window.clearTimeout(loadTimerRef.current);
    loadTimerRef.current = null;
  }, []);

  const requestVideo = useCallback((force = false) => {
    if (!force && shouldDeferAutoplay()) {
      setPlaybackState("poster");
      return;
    }

    setPlaybackState("loading");
    setSource(window.matchMedia(MOBILE_QUERY).matches ? MOBILE_VIDEO : DESKTOP_VIDEO);
  }, []);

  const playVideo = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      await video.play();
    } catch {
      setPlaybackState(video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA ? "paused" : "poster");
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);
    const syncViewport = () => {
      const nextIsMobile = media.matches;
      setIsMobile(nextIsMobile);
      setHasDecodedFrame(false);
      setSource(null);
      setPlaybackState("poster");
      userPausedRef.current = false;
      window.requestAnimationFrame(() => requestVideo());
    };

    syncViewport();
    media.addEventListener("change", syncViewport);
    return () => media.removeEventListener("change", syncViewport);
  }, [requestVideo]);

  useEffect(() => {
    if (!source) return;
    const video = videoRef.current;
    if (!video) return;

    clearLoadTimer();
    loadTimerRef.current = window.setTimeout(() => {
      if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) return;
      video.pause();
      setSource(null);
      setPlaybackState("poster");
    }, LOAD_TIMEOUT_MS);

    video.load();
    void playVideo();

    return clearLoadTimer;
  }, [clearLoadTimer, playVideo, source]);

  useEffect(() => {
    const hero = videoRef.current?.closest("section");
    const video = videoRef.current;
    if (!hero || !video || !source) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          video.pause();
          return;
        }
        if (!userPausedRef.current) void video.play().catch(() => undefined);
      },
      { threshold: 0.2 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [source]);

  function togglePlayback() {
    const video = videoRef.current;

    if (playbackState === "playing" && video) {
      userPausedRef.current = true;
      video.pause();
      setPlaybackState("paused");
      return;
    }

    userPausedRef.current = false;
    if (!source) {
      requestVideo(true);
      return;
    }
    void playVideo();
  }

  const poster = isMobile ? MOBILE_POSTER : DESKTOP_POSTER;
  const isPlaying = playbackState === "playing";

  return (
    <section
      aria-labelledby="homepage-video-hero-title"
      className={styles.hero}
      data-has-frame={hasDecodedFrame}
    >
      <Image
        alt={copy.posterAlt}
        className={styles.poster}
        fill
        priority
        sizes="100vw"
        src={poster}
      />
      <video
        aria-hidden="true"
        className={styles.video}
        data-visible={hasDecodedFrame}
        disablePictureInPicture
        loop
        muted
        onCanPlay={() => {
          clearLoadTimer();
          setHasDecodedFrame(true);
        }}
        onError={() => {
          clearLoadTimer();
          setHasDecodedFrame(false);
          setSource(null);
          setPlaybackState("error");
        }}
        onPause={() => {
          if (hasDecodedFrame) setPlaybackState("paused");
        }}
        onPlaying={() => {
          clearLoadTimer();
          setHasDecodedFrame(true);
          setPlaybackState("playing");
        }}
        playsInline
        poster={poster}
        preload={source ? "metadata" : "none"}
        ref={videoRef}
        src={source ?? undefined}
      />

      <div aria-hidden="true" className={styles.shade} />

      <div className={styles.copy}>
        <p className={styles.eyebrow}>{copy.eyebrow}</p>
        <h1 id="homepage-video-hero-title">{copy.title}</h1>
        <p className={styles.description}>{copy.description}</p>
        <Link className={styles.cta} href="#designs-title">
          {copy.cta}
        </Link>
      </div>

      <button
        aria-label={isPlaying ? copy.pause : copy.play}
        className={styles.playbackControl}
        onClick={togglePlayback}
        type="button"
      >
        {isPlaying ? <Pause aria-hidden="true" size={17} /> : <Play aria-hidden="true" size={17} />}
        <span>{isPlaying ? copy.pause : copy.play}</span>
      </button>

      <p aria-live="polite" className={styles.liveStatus}>
        {playbackState === "loading" ? copy.loading : ""}
      </p>
    </section>
  );
}
