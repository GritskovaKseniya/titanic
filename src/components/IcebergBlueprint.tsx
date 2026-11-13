import React from 'react';

/** Line-art iceberg cross-section, in the same blueprint register as the
    ship schematic in the comparison slider. Color comes from the wrapping
    element (currentColor) so it follows the site's accent like everything
    else, instead of being hardcoded. Waterline sits at y=300 of a 1060-tall
    viewBox (≈28.3% down) — used by Details.tsx to align it to the real
    About/Details seam via -translate-y-[28.3%].
    viewBox is cropped to the shape's own footprint (x 480–1320, the full
    1600-wide original just had empty waterline on both sides) so the
    container around it can be a normal, modestly-sized box instead of
    needing huge vw-based widths and large % translates to compensate. */
export const IcebergBlueprint: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="480 0 840 1060"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    role="img"
    aria-label="Iceberg cross-section schematic"
  >
    <style>{'path{vector-effect:non-scaling-stroke}'}</style>
    {/* waterline — single line only: a second, fainter companion line 18
        units below it used to sit here, but it read as a second "sea line"
        a few px below the real seam, which is what this is aligned to. */}
    <g strokeWidth="1.5" opacity=".7">
      <path d="M0 300 L1600 300" />
    </g>

    <g transform="translate(251 0) scale(0.72 1)">
      {/* tip above water: silhouette of the iceberg that sank Titanic (1912 photo) */}
      <path
        strokeWidth="3"
        d="M400 300 L420 259 L480 222 L540 197 L580 197 L630 209 L690 203 L750 175 L820 106 L874 50 L914 88 L954 144 L994 169 L1070 200 L1140 209 L1210 212 L1270 200 L1320 187 L1366 200 L1386 237 L1390 300"
      />
      <g strokeWidth="1.6" opacity=".85">
        <path d="M874 50 L850 150 L800 215 L790 300" />
        <path d="M874 50 L900 175 L930 245 L910 300" />
        <path d="M820 106 L790 190 L750 175" />
        <path d="M850 150 L930 245 L1010 230 L994 169" />
        <path d="M630 209 L650 260 L610 300" />
        <path d="M540 197 L520 260 L470 300" />
        <path d="M690 203 L720 250 L700 300" />
        <path d="M1140 209 L1120 260 L1150 300" />
        <path d="M1270 200 L1250 250 L1290 300" />
        <path d="M1320 187 L1340 245 L1330 300" />
      </g>
    </g>

    {/* body under water: wide at the waterline, jagged sides, tapering to a pointed bottom */}
    <path
      strokeWidth="3"
      d="M539 300 L554 398 L541 440 L547 482 L585 530 L613 580 L640 620 L657 656 L693 734 L735 790 L777 860 L850 958 L898 1000
      L978 958 L1051 860 L1090 800 L1124 734 L1160 670 L1183 608 L1216 496 L1228 450 L1241 398 L1252 300"
    />

    {/* inner arch cavity, ridges (dashed) */}
    <g strokeWidth="1.8" opacity=".7" strokeDasharray="10 9">
      <path d="M736 750 C720 660 702 520 740 430 C770 370 830 360 880 372 C940 386 970 480 978 650 C982 740 975 800 970 832" />
    </g>
    <g strokeWidth="1.6" opacity=".55" strokeDasharray="10 9">
      <path d="M770 760 C760 640 770 520 800 460 C830 420 880 420 900 480 C920 560 925 680 918 780" />
      <path d="M1070 340 C1110 450 1110 600 1060 740 C1030 820 1000 880 960 940" />
      <path d="M630 340 C610 440 620 540 680 640 C720 710 760 790 790 850" />
      <path d="M1180 330 C1190 430 1170 520 1130 600" />
      <path d="M1000 420 C1030 500 1040 600 1010 700" />
      <path d="M550 500 L650 525" />
      <path d="M1228 520 L1150 560" />
      <path d="M690 700 L760 720" />
    </g>
  </svg>
);
