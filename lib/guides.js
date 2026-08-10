/* Guide (article) registry. Import each guide file and list it here in the
   order it should appear in the hub. Adding an article = create its file in
   content/guides/ and add it to GUIDES. */
import caged from "@/content/guides/the-caged-system-explained";
import tuneGuitar from "@/content/guides/how-to-tune-a-guitar";
import useCapo from "@/content/guides/how-to-use-a-capo";
import changeKey from "@/content/guides/how-to-change-key-in-a-song";
import memorizeFretboard from "@/content/guides/how-to-memorize-the-fretboard";
import nashville from "@/content/guides/nashville-number-system-explained";
import circleOfFifths from "@/content/guides/the-circle-of-fifths-explained";
import progressions from "@/content/guides/guitar-chord-progressions-for-beginners";
import tuneUkulele from "@/content/guides/how-to-tune-a-ukulele";
import earTraining from "@/content/guides/ear-training-for-guitarists";

export const GUIDES = [
  caged,
  tuneGuitar,
  useCapo,
  changeKey,
  memorizeFretboard,
  nashville,
  circleOfFifths,
  progressions,
  tuneUkulele,
  earTraining,
];

export const guideBySlug = (slug) => GUIDES.find((g) => g.slug === slug);
export const GUIDE_SLUGS = GUIDES.map((g) => g.slug);
