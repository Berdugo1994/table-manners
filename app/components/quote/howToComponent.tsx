const quote =
  "Every game it’s the same — rebuys, chips flying around, and at the end the math never adds up. You need to be a genius just to figure out who actually won or lost.";
const author = "Any Player, Any Time.";
const answer = "This is exactly what this app does for you.";
import { Caveat } from "next/font/google";
import { DM_Serif_Display } from "next/font/google";

const caveat = Caveat({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const dmSerifDisplay = DM_Serif_Display({
  weight: ["400"],
  subsets: ["latin"],
});

export default function QuoteComponent() {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className={`text-xl font-bold flex ${caveat.className}`}>
        <div className="">
          <strong className="font-bold text-2xl">&quot;</strong> {quote}{" "}
          <strong className="font-bold text-2xl">&quot;</strong>
        </div>
      </div>
      <div className="text-sm text-end w-full">{author}</div>
      <div className={`text-4xl font-bold ${dmSerifDisplay.className}`}>
        {answer}
      </div>
    </div>
  );
}
