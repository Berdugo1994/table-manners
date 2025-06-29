import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { Player } from "../../../store/playerStore";
import { ActionState } from "./types";

export const Menu = ({
  player,
  updatePartlyState,
}: {
  toggleFocus: () => void;
  player: Player;
  updatePartlyState: (state: Partial<ActionState>) => void;
}) => {
  return (
    <Dropdown defaultOpen isOpen>
      <DropdownTrigger className="opacity-0">
        <div />
      </DropdownTrigger>
      <DropdownMenu
        aria-label={`Menu for player ${player.name}`}
        className="min-w-unit-16 px-1"
      >
        <DropdownItem
          key="rebuy"
          onPress={() => {
            updatePartlyState({ rebuy: true, menu: false });
          }}
          className="justify-center h-unit-10 w-unit-10"
        >
          <div className="flex flex-row gap-2 items-center justify-start">
            <i className="pi pi-money-bill" />
            <div>Rebuy</div>
          </div>
        </DropdownItem>
        <DropdownItem
          key="editName"
          onPress={() => {
            updatePartlyState({ editor: true, menu: false });
          }}
        >
          <div className="flex flex-row gap-2 items-center justify-start">
            <i className="pi pi-pencil" />
            <div>Edit</div>
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
