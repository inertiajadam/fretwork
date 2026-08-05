import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const alt =
  "Fretwork: free interactive guitar theory tools and lessons";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* The chord-diagram mark, as a data URI so Satori can render it. */
const MARK = `data:image/svg+xml,${encodeURIComponent(
  `<svg width="200" height="200" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#6B5C4C" stroke-width="1" stroke-linecap="round"><line x1="8.5" y1="8" x2="8.5" y2="25"/><line x1="13.83" y1="8" x2="13.83" y2="25"/><line x1="19.17" y1="8" x2="19.17" y2="25"/><line x1="24.5" y1="8" x2="24.5" y2="25"/></g>
    <g stroke="#574838" stroke-width="1" stroke-linecap="round"><line x1="8.5" y1="13.5" x2="24.5" y2="13.5"/><line x1="8.5" y1="19" x2="24.5" y2="19"/><line x1="8.5" y1="24.5" x2="24.5" y2="24.5"/></g>
    <line x1="8" y1="8" x2="25" y2="8" stroke="#EFE6D9" stroke-width="2" stroke-linecap="round"/>
    <g fill="#E8A33D"><circle cx="8.5" cy="21.75" r="2.6"/><circle cx="13.83" cy="16.25" r="2.6"/><circle cx="19.17" cy="10.75" r="2.6"/></g>
  </svg>`
)}`;

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#191411",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <img src={MARK} width={104} height={104} alt="" />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                color: "#E8A33D",
                fontSize: 26,
                letterSpacing: 6,
                textTransform: "uppercase",
              }}
            >
              Free forever
            </div>
            <div style={{ color: "#EFE6D9", fontSize: 76, fontWeight: 700 }}>
              {SITE_NAME}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <div
            style={{
              color: "#EFE6D9",
              fontSize: 58,
              fontWeight: 700,
              lineHeight: 1.05,
            }}
          >
            Understand the neck.
          </div>
          <div style={{ color: "#A89B8A", fontSize: 32, lineHeight: 1.35 }}>
            Interactive tuner, CAGED fretboard explorer, chord library, ear
            trainer, metronome, and more. No paywalls, no account.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            color: "#7A6F60",
            fontSize: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 12,
              height: 12,
              borderRadius: 12,
              background: "#E8A33D",
            }}
          />
          10 free interactive tools plus plain-language lessons
        </div>
      </div>
    ),
    { ...size }
  );
}
