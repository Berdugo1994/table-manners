import { Caveat_Brush } from "next/font/google";
import Image from "next/image";
import imageAiForMonkeys from "@/app/assets/homepage/ai-for-monkeys.png";
import { Divider } from "@heroui/react";

const quote =
  "Every game it's the same — rebuys, chips flying around, and at the end the math never adds up. You need to be a genius just to figure out who actually won or lost.";
const author = "Any Player, Any Time.";
const answer2 =
  "We are here to do the math for you. All you have to do is play, (and do me a favor, try to win this time).";

const caveatBrush = Caveat_Brush({
  weight: ["400"],
  subsets: ["latin"],
});
export default function QuoteComponent() {
  return (
    <div className={`w-full flex flex-col gap-2`}>
      {/* <div className={`text-xl font-bold flex ${caveat.className}`}> */}
      <div className={`font-bold flex text-2xl `}>
        <q className={`${caveatBrush.className}`}>{quote}</q>
      </div>
      <div className={`text-sm text-end w-full `}>{author}</div>
      {/* <div className={`text-4xl font-bold ${dmSerifDisplay.className}`}> */}
      <div className="flex justify-center items-center">
        <Image
          src={imageAiForMonkeys}
          alt="ai for monkeys"
          width={250}
          height={250}
        />
      </div>
      <div className={`text-md`}>{answer2}</div>
      <Divider className="w-full radius-1" />
    </div>
  );
}
