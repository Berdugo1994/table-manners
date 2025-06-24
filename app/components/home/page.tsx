"use client";

import { Skeleton, Button, Spinner } from "@heroui/react";

export default function HomeComponent() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1>HomeComponent</h1>
      <Button color="primary" variant="solid">
        Button
      </Button>
      <Spinner color="danger" className="w-10 h-10" />
      <div>After</div>
      <Skeleton className="w-full h-10" />
    </div>
  );
}
