import React from 'react';

/** Line-art iceberg cross-section, in the same blueprint register as the
    ship schematic in the comparison slider. Color comes from the wrapping
    element (currentColor) so it follows the site's accent like everything
    else, instead of being hardcoded. */
export const IcebergBlueprint: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 1600 900"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    role="img"
    aria-label="Iceberg cross-section schematic"
  >
    <style>{'path{vector-effect:non-scaling-stroke}'}</style>
    {/* waterline */}
    <g strokeWidth="1.5" opacity=".7">
      <path d="M0 300 Q50 286 100 300 T200 300 T300 300 T400 300 T500 300 T600 300 T700 300 T800 300 T900 300 T1000 300 T1100 300 T1200 300 T1300 300 T1400 300 T1500 300 T1600 300" />
    </g>
    <g strokeWidth="1" opacity=".3">
      <path d="M0 318 Q50 306 100 318 T200 318 T300 318 T400 318 T500 318 T600 318 T700 318 T800 318 T900 318 T1000 318 T1100 318 T1200 318 T1300 318 T1400 318 T1500 318 T1600 318" />
    </g>

    <g transform="translate(197 0) scale(0.78 1)">
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

      {/* body under water: wide at the waterline, tapering to a rounded bottom */}
      <path
        strokeWidth="3"
        d="M400 300 C375 380 400 480 450 570 C520 700 640 810 800 878 C870 900 930 895 1000 862 C1130 800 1220 720 1300 610 C1360 520 1410 400 1390 300"
      />

      {/* inner ice ridges and arch cavities (dashed) */}
      <g strokeWidth="1.6" opacity=".6" strokeDasharray="10 9">
        <path d="M520 330 C470 500 500 700 700 820" />
        <path d="M640 790 C560 560 580 380 700 360 C800 350 850 450 820 570 C805 650 750 720 640 790" />
        <path d="M900 335 C950 500 910 700 860 880" />
        <path d="M1250 340 C1310 520 1210 720 1050 850" />
        <path d="M1010 370 C1060 480 1050 620 960 735" />
        <path d="M1150 330 C1190 430 1170 540 1110 620" />
        <path d="M440 480 C520 470 600 500 640 560" />
        <path d="M1390 420 C1330 440 1290 470 1260 520" />
      </g>
    </g>

    {/* scale bracket: above / below the waterline */}
    <g strokeWidth="1.5" opacity=".8">
      <path d="M1500 50 L1500 892" />
      <path d="M1488 50 L1512 50" />
      <path d="M1488 300 L1512 300" />
      <path d="M1488 892 L1512 892" />
      <path d="M1494 175 L1506 175" />
      <path d="M1494 440 L1506 440" />
      <path d="M1494 580 L1506 580" />
      <path d="M1494 720 L1506 720" />
      <path d="M1494 810 L1506 810" />
    </g>
  </svg>
);
