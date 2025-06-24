"use client";
import React from "react";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Card,
  CardBody,
} from "@heroui/react";

export default function QuickStartForm({
  numPlayers,
  setNumPlayers,
  buyIn,
  setBuyIn,
}: {
  numPlayers: number;
  setNumPlayers: (numPlayers: number) => void;
  buyIn: number;
  setBuyIn: (buyIn: number) => void;
}) {
  return (
    <Card className="m-1">
      <CardBody className="flex flex-col items-center justify-center gap-2">
        <div className="flex items-center justify-center gap-2">
          <div id="num-players">
            <Dropdown className="w-20" placement="bottom-start">
              <DropdownTrigger>
                <Button variant="bordered" className="w-20">
                  <div>Players {numPlayers}</div>
                </Button>
              </DropdownTrigger>
              <DropdownMenu onAction={(e) => setNumPlayers(e as number)}>
                {Array.from({ length: 10 }, (_, i) => (
                  <DropdownItem key={i + 1}>{i + 1}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          <div id="buy-in" className="flex items-center gap-2">
            <Dropdown className="w-20">
              <DropdownTrigger>
                <Button variant="bordered" className="w-20">
                  <div>Buy-In {buyIn}</div>
                </Button>
              </DropdownTrigger>
              <DropdownMenu onAction={(e) => setBuyIn(e as number)}>
                {Array.from({ length: 10 }, (_, i) => (
                  <DropdownItem key={10 * (i + 1)}>{10 * (i + 1)}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </CardBody>
    </Card>
  );
  // const [submitted, setSubmitted] = React.useState<null | Record<
  //   string,
  //   string
  // >>(null);

  // const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const data = Object.fromEntries(new FormData(e.currentTarget));

  //   setSubmitted(data as Record<string, string>);
  // };

  // return (
  // <Form className="w-full max-w-xs" onSubmit={onSubmit}>
  //   <Input
  //     isRequired
  //     errorMessage="Please enter a valid number of players"
  //     label="Players"
  //     labelPlacement="outside"
  //     name="players"
  //     placeholder="Enter number of players"
  //     type="number"
  //   />
  //   <Button type="submit" variant="bordered">
  //     Submit
  //   </Button>
  //   {submitted && (
  //     <div className="text-small text-default-500">
  //       You submitted: <code>{JSON.stringify(submitted)}</code>
  //     </div>
  //   )}
  // </Form>
  // );
}
