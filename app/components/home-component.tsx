"use client";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function HomeComponent() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center">
      <h1>HomeComponent</h1>
      <Button
        color="primary"
        variant="solid"
        onPress={() => {
          console.log("quick start");
          router.push("/quick-start");
        }}
      >
        Button
      </Button>
    </div>
  );
}
