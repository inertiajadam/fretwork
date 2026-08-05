import { SITE_NAME } from "@/lib/site";

export default function manifest() {
  return {
    name: `${SITE_NAME}: free interactive guitar theory tools`,
    short_name: SITE_NAME,
    description:
      "Free, interactive guitar tools and plain-language lessons. Tuner, CAGED fretboard explorer, chord library, ear trainer, metronome, and more.",
    start_url: "/",
    display: "standalone",
    background_color: "#191411",
    theme_color: "#191411",
    categories: ["music", "education"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/apple-icon.svg",
        sizes: "180x180",
        type: "image/svg+xml",
      },
    ],
  };
}
