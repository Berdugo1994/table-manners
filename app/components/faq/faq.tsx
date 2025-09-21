import Image from "next/image";
import faqIcon from "@/app/assets/faq-svgrepo-com.svg";

const faq = [
  {
    question: "What is this?",
    answer:
      "This is a tool helps you manage and track board game's stats with your friends.",
  },
  {
    question: "Is it free to play?",
    answer: "Yes, it is 100% free to play.",
  },
  {
    question: "Do I need to create an account to use the app?",
    answer:
      "No, you don't need to create an account to use the app. Though the last games id is saved in your browser, So you can continue your game later.",
  },
  {
    question: "How do I create a game?",
    answer:
      "You can create a game by clicking the 'Start new game' button, or by clicking the menu option - 'New Game'.",
  },
  {
    question: "What the main features of the app?",
    answer:
      "The app is a beautiful calculator that helps you decide who are the winners and how much credits they won. It even tells you who should give credit to who.",
  },

  {
    question: "Who should use the app?",
    answer:
      "Anyone who wants to play board games with their friends, family, or colleagues.",
  },
  {
    question: "Does the game session is saved?",
    answer:
      "Yes, the game session is saved, once your create your board, you can share it with your friends and edit it whenever you like, once you finish the game it becomes read-only.",
  },
  {
    question: "Does everyone with the link can edit the game?",
    answer:
      "Yes, anyone with the link can edit the game, so feel free to share it with your friends and family.",
  },
];

export default function Faq() {
  return (
    <div className="flex flex-col gap-4  w-full">
      <div className="flex gap-4">
        <Image src={faqIcon} alt="faq" width={40} height={40} />
        <div className="text-2xl font-bold">FAQ</div>
      </div>
      <div className="flex flex-col gap-4">
        {faq.map((item, index) => (
          <div key={index} className="flex flex-col gap-0.5">
            <div className="text-lg">{item.question}</div>
            <div className="text-sm">{item.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
