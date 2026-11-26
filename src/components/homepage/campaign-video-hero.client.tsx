"use client";

import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { useLocale } from "@/components/i18n/locale-provider.client";
import styles from "@/components/homepage/campaign-video-hero.module.css";
import { beyondCollectionHero } from "@/data/beyond-collection";

const DESKTOP_VIDEO = "/videos/beyond-hero-desktop.mp4";
const MOBILE_VIDEO = "/videos/beyond-hero-mobile.mp4";
const MOBILE_QUERY = "(max-width: 47.999rem)";
const LOAD_TIMEOUT_MS = 15_000;

type PlaybackState = "poster" | "loading" | "playing" | "paused" | "error";

type NetworkInformation = {
  downlink?: number;
  effectiveType?: string;
  saveData?: boolean;
};

function shouldDeferAutoplay() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;

  return reducedMotion || connection?.saveData === true;
}

export function CampaignVideoHero() {
  const { locale } = useLocale();
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPausedRef = useRef(false);
  const mutedRef = useRef(true);
  const loadTimerRef = useRef<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [source, setSource] = useState<string | null>(null);
  const [playbackState, setPlaybackState] = useState<PlaybackState>("poster");
  const [hasDecodedFrame, setHasDecodedFrame] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const copy = locale === "de"
    ? {
        eyebrow: "RA & RA / COLLECTION 01",
        title: "BEYOND",
        description: "Vier Perspektiven. Eine Kollektion.",
        cta: "Kollektion entdecken",
        play: "Kampagnenfilm abspielen",
        pause: "Kampagnenfilm pausieren",
        unmute: "Ton einschalten",
        mute: "Ton ausschalten",
        loading: "Kampagnenfilm wird geladen",
        unavailable: "Kampagnenfilm nicht verfügbar. Kampagnenbild wird angezeigt.",
      }
    : {
        eyebrow: "RA & RA / COLLECTION 01",
        title: "BEYOND",
        description: "Four perspectives. One collection.",
        cta: "Discover the collection",
        play: "Play campaign film",
        pause: "Pause campaign film",
        unmute: "Turn sound on",
        mute: "Mute campaign film",
        loading: "Loading campaign film",
        unavailable: "Campaign film unavailable. Showing campaign image.",
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
    let requestTimer: number | null = null;
    const syncViewport = () => {
      if (requestTimer !== null) window.clearTimeout(requestTimer);
      const nextIsMobile = media.matches;
      setIsMobile(nextIsMobile);
      setHasDecodedFrame(false);
      setSource(null);
      setPlaybackState("poster");
      userPausedRef.current = false;
      requestTimer = window.setTimeout(() => requestVideo(), 350);
    };

    syncViewport();
    media.addEventListener("change", syncViewport);
    return () => {
      if (requestTimer !== null) window.clearTimeout(requestTimer);
      media.removeEventListener("change", syncViewport);
    };
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
      setPlaybackState("error");
    }, LOAD_TIMEOUT_MS);

    video.muted = mutedRef.current;
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

  function toggleSound() {
    const video = videoRef.current;
    if (!video || !hasDecodedFrame) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    mutedRef.current = nextMuted;
    setIsMuted(nextMuted);

    if (!nextMuted && video.paused) {
      userPausedRef.current = false;
      void playVideo();
    }
  }

  const posterAsset = isMobile
    ? beyondCollectionHero.mobile
    : beyondCollectionHero.desktop;
  const isPlaying = playbackState === "playing";

  return (
    <section
      aria-labelledby="homepage-video-hero-title"
      className={styles.hero}
      data-has-frame={hasDecodedFrame}
    >
      <Image
        alt={posterAsset.alt}
        className={styles.poster}
        fill
        priority
        sizes="100vw"
        src={posterAsset.url}
      />
      <video
        aria-hidden="true"
        className={styles.video}
        data-visible={hasDecodedFrame}
        disablePictureInPicture
        loop
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
        muted={isMuted}
        onPause={() => {
          if (hasDecodedFrame) setPlaybackState("paused");
        }}
        onPlaying={() => {
          clearLoadTimer();
          setHasDecodedFrame(true);
          setPlaybackState("playing");
        }}
        playsInline
        poster={posterAsset.url}
        preload={source ? "auto" : "none"}
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

      <div className={styles.mediaControls}>
        <button
          aria-label={isPlaying ? copy.pause : copy.play}
          className={styles.mediaControl}
          onClick={togglePlayback}
          title={isPlaying ? copy.pause : copy.play}
          type="button"
        >
          {isPlaying ? <Pause aria-hidden="true" size={18} /> : <Play aria-hidden="true" size={18} />}
        </button>

        {hasDecodedFrame ? (
          <button
            aria-label={isMuted ? copy.unmute : copy.mute}
            aria-pressed={!isMuted}
            className={styles.mediaControl}
            onClick={toggleSound}
            title={isMuted ? copy.unmute : copy.mute}
            type="button"
          >
            {isMuted ? <VolumeX aria-hidden="true" size={18} /> : <Volume2 aria-hidden="true" size={18} />}
          </button>
        ) : null}
      </div>

      <p aria-live="polite" className={styles.liveStatus}>
        {playbackState === "loading"
          ? copy.loading
          : playbackState === "error"
            ? copy.unavailable
            : ""}
      </p>
    </section>
  );
}
