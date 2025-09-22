const quote =
  "Every game it's the same — rebuys, chips flying around, and at the end the math never adds up. You need to be a genius just to figure out who actually won or lost.";
const author = "Any Player, Any Time.";
const answer = "This is exactly what this app does for you.";

export default function QuoteComponent() {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="text-xl font-bold flex font-caveat">
        <div className="">
          <strong className="font-bold text-2xl">&quot;</strong> {quote}{" "}
          <strong className="font-bold text-2xl">&quot;</strong>
        </div>
      </div>
      <div className="text-sm text-end w-full">{author}</div>
      <div className="text-4xl font-bold font-dm-serif-display">{answer}</div>
    </div>
  );
}
