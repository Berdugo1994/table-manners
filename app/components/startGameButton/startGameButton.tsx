import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function StartGameButton({
  title = "Start New Game",
}: {
  title?: string;
}) {
  const router = useRouter();
  return (
    <Button
      color="primary"
      variant="solid"
      onPress={() => {
        router.push("/setup");
      }}
    >
      {title}
    </Button>
  );
}
