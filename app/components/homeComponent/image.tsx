import image from "@/public/assets/img/homepage/friends_playing.jpg";
import Image from "next/image";

export default function ImageComponent() {
  return (
    <div className="w-full h-full">
      <Image
        src={image}
        alt="friends playing cards by the lake"
        className="w-full h-full"
      />
    </div>
  );
}
