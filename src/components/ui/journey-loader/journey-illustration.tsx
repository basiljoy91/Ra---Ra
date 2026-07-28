import styles from "./journey-loader.module.css";

export function JourneyIllustration() {
  return (
    <svg
      aria-hidden="true"
      className={styles.illustration}
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 720 280"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        className={styles.pawPrints}
        data-part="paw-print-group"
        transform="translate(-72 0)"
      >
        <g className={`${styles.paw} ${styles.paw1}`} data-part="paw">
          <ellipse cx="340" cy="239" rx="4.8" ry="6.4" />
          <ellipse cx="330" cy="234" rx="2.6" ry="3.5" />
          <ellipse cx="337" cy="229" rx="2.7" ry="3.7" />
          <ellipse cx="343" cy="229" rx="2.7" ry="3.7" />
          <ellipse cx="350" cy="234" rx="2.6" ry="3.5" />
        </g>
        <g className={`${styles.paw} ${styles.paw2}`} data-part="paw">
          <ellipse cx="365" cy="230" rx="4.8" ry="6.4" />
          <ellipse cx="355" cy="225" rx="2.6" ry="3.5" />
          <ellipse cx="362" cy="220" rx="2.7" ry="3.7" />
          <ellipse cx="368" cy="220" rx="2.7" ry="3.7" />
          <ellipse cx="375" cy="225" rx="2.6" ry="3.5" />
        </g>
        <g className={`${styles.paw} ${styles.paw3}`} data-part="paw">
          <ellipse cx="391" cy="239" rx="4.8" ry="6.4" />
          <ellipse cx="381" cy="234" rx="2.6" ry="3.5" />
          <ellipse cx="388" cy="229" rx="2.7" ry="3.7" />
          <ellipse cx="394" cy="229" rx="2.7" ry="3.7" />
          <ellipse cx="401" cy="234" rx="2.6" ry="3.5" />
        </g>
        <g className={`${styles.paw} ${styles.paw4}`} data-part="paw">
          <ellipse cx="417" cy="230" rx="4.8" ry="6.4" />
          <ellipse cx="407" cy="225" rx="2.6" ry="3.5" />
          <ellipse cx="414" cy="220" rx="2.7" ry="3.7" />
          <ellipse cx="420" cy="220" rx="2.7" ry="3.7" />
          <ellipse cx="427" cy="225" rx="2.6" ry="3.5" />
        </g>
        <g className={`${styles.paw} ${styles.paw5}`} data-part="paw">
          <ellipse cx="443" cy="239" rx="4.8" ry="6.4" />
          <ellipse cx="433" cy="234" rx="2.6" ry="3.5" />
          <ellipse cx="440" cy="229" rx="2.7" ry="3.7" />
          <ellipse cx="446" cy="229" rx="2.7" ry="3.7" />
          <ellipse cx="453" cy="234" rx="2.6" ry="3.5" />
        </g>
        <g className={`${styles.paw} ${styles.paw6}`} data-part="paw">
          <ellipse cx="469" cy="230" rx="4.8" ry="6.4" />
          <ellipse cx="459" cy="225" rx="2.6" ry="3.5" />
          <ellipse cx="466" cy="220" rx="2.7" ry="3.7" />
          <ellipse cx="472" cy="220" rx="2.7" ry="3.7" />
          <ellipse cx="479" cy="225" rx="2.6" ry="3.5" />
        </g>
      </g>

      <g
        className={styles.characterGroup}
        data-part="character-group"
        fill="none"
        stroke="var(--loader-line)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
        transform="translate(-72 0)"
      >
        <g className={styles.owner} data-part="owner">
          <g className={styles.ownerBody} data-part="owner-body">
            <path d="M215 83c12-9 26-12 39-5 11 6 18 17 22 30l9 43c-21 8-50 8-70 1l5-43c1-12-1-21-5-26Z" />
            <path d="M227 87c-4 14-7 29-8 45" />
            <path d="M246 80c10 9 16 20 21 33" />
            <path d="M217 151c18 6 48 6 68 0" />
            <path d="M225 112c7 8 15 12 24 12" />
            <path d="M248 119c-5 5-6 12-2 18" />
          </g>

          <g className={styles.ownerHair} data-part="owner-hair">
            <path d="M222 85c-8-8-9-21-5-33 5-15 18-25 34-25 17 0 29 11 30 27 0 8-3 16-9 23" />
            <path d="M269 37c8 4 12 10 12 18l8 4-8 7" />
            <path d="M223 48c-13 0-22 7-24 17-2 8 1 15-8 22" />
            <path d="M221 56c-12 5-16 14-14 25 1 8-2 14-10 20" />
            <path d="M232 50c-7 9-9 19-7 30 1 8-2 15-10 22" />
            <path d="M248 75c7 4 15 4 21-1" />
          </g>

          <g className={styles.ownerLeashArm} data-part="owner-leash-arm">
            <path d="M262 96c9 16 18 30 29 42l23 14" />
            <path d="M268 93c10 14 19 27 30 38l23 14" />
            <path d="M313 152c4 8 11 11 17 7" />
            <path d="M321 145c8 0 14 4 16 11-3 6-9 8-15 4" />
          </g>

          <g className={styles.ownerFreeArm} data-part="owner-free-arm">
            <path d="M220 94c-7 14-12 30-13 46" />
            <path d="M207 140c1 7 4 12 9 16" />
          </g>

          <g className={styles.ownerBackLeg} data-part="owner-back-leg">
            <path d="M237 153c-7 22-16 44-26 65l-13 25" />
            <path d="M198 243c4 8 14 13 25 13 5 0 8-3 5-7l-14-13" />
            <path d="M200 239c6 6 13 9 20 10" />
          </g>

          <g className={styles.ownerFrontLeg} data-part="owner-front-leg">
            <path d="M264 153c6 21 14 43 23 65l8 22" />
            <path d="M295 240c9 0 18 2 25 8 4 4 2 7-3 8-13 2-24-1-31-9" />
            <path d="M291 236c6 8 14 12 23 13" />
          </g>

          <path d="M224 164c16 4 38 4 53 0" />
        </g>

        <path
          className={styles.leash}
          data-part="leash"
          d="M331 157c70 43 145 57 207 31 21-9 36-19 54-20"
          stroke="var(--loader-leash)"
          strokeWidth="2.4"
        />

        <g className={styles.dog} data-part="dog">
          <g className={styles.dogTail} data-part="dog-tail">
            <path d="M493 181c-18 1-34-4-48-14 4 8 10 14 17 19-8-1-15-4-21-8 6 10 15 17 26 20-7 0-13-1-18-3 12 10 28 15 44 14" />
            <path d="M491 195c-14 0-27-4-38-10" />
          </g>

          <g className={styles.dogBody} data-part="dog-body">
            <path d="M592 171c-20-8-42-12-65-9-18 2-32 9-40 20-5 8-6 17-2 26" />
            <path d="M487 182c2 10 7 19 16 26" />
            <path d="M503 209c12 3 24 7 36 12l6-4 6 6 8-4 10 6 8-4 12 2" />
            <path d="M590 171c10 12 13 27 8 43" />
            <path d="M513 169c-4 12-3 24 2 35" />
            <path d="M491 194c-4 7-5 14-3 22" />
            <path d="M581 177c5 8 8 17 7 27" />
            <path d="M596 187l-6 7 5-1-4 8 6-2-2 9" />
            <path d="M520 218l-3 7 6-3 2 7" />
            <path d="M565 221l3 7 4-5 4 6" />
          </g>

          <g className={styles.dogHead} data-part="dog-head">
            <path d="M591 169c-2-8-1-16 3-23 6-11 16-17 28-17 14 0 25 8 29 20l17 3c7 1 10 5 8 9-3 6-11 9-20 9h-9" />
            <path d="M647 170c7 1 13 4 17 9-5 5-12 7-18 5" />
            <g className={styles.dogEar} data-part="dog-ear">
              <path d="M608 137c-9 3-14 10-13 19 1 8 6 15 13 18 8-10 11-22 7-35" />
              <path d="M612 135c-3 11-1 21 4 31" />
            </g>
            <path d="M633 145h.1" strokeWidth="4" />
            <path d="M672 157h.1" strokeWidth="4" />
            <path d="M651 169c4 2 8 3 12 2" />
            <path d="M646 184c-4 0-8-1-11-4" />
            <path d="M591 168c8 4 16 5 25 4" stroke="var(--loader-leash)" />
            <path d="M607 173c-1 7-4 13-9 19" />
            <path d="M648 151c4 2 7 5 9 9" />
          </g>

          <g className={styles.dogRearBackLeg} data-part="dog-rear-back-leg">
            <path d="M504 207c-3 12-6 25-7 38l-3 5" />
            <path d="M494 250c6 5 14 5 20 1" />
          </g>
          <g className={styles.dogRearFrontLeg} data-part="dog-rear-front-leg">
            <path d="M526 216c0 11 4 22 10 32" />
            <path d="M536 248c6 5 13 6 19 2" />
          </g>
          <g className={styles.dogFrontBackLeg} data-part="dog-front-back-leg">
            <path d="M581 219c-4 10-4 20 1 30" />
            <path d="M582 249c5 4 12 5 18 1" />
          </g>
          <g className={styles.dogFrontLeg} data-part="dog-front-leg">
            <path d="M598 210c4 13 10 25 18 36" />
            <path d="M616 246c6 5 14 7 22 4" />
          </g>
        </g>
      </g>
    </svg>
  );
}
