import { Player } from "../../../store/playerStore";
import { ActionState } from "./types";

export const Menu = ({
  updatePartlyState,
}: {
  toggleFocus: () => void;
  player: Player;
  updatePartlyState: (state: Partial<ActionState>) => void;
}) => {
  return (
    <div className="flex flex-col bg-default-100 rounded-lg px-4 py-1 gap-2">
      <div
        key="rebuy"
        onClick={() => {
          updatePartlyState({ rebuy: true, menu: false });
        }}
        className="justify-center h-unit-10 w-unit-10"
      >
        <div className="flex flex-row gap-2 items-center justify-start">
          <i className="pi pi-money-bill" />
          <div>Rebuy</div>
        </div>
      </div>
      <div
        key="editName"
        onClick={() => {
          updatePartlyState({ editor: true, menu: false });
        }}
      >
        <div className="flex flex-row gap-2 items-center justify-start">
          <i className="pi pi-pencil" />
          <div>Edit</div>
        </div>
      </div>
      <div
        key="checkout"
        onClick={() => {
          updatePartlyState({ menu: false, checkout: true });
        }}
      >
        <div className="flex flex-row gap-2 items-center justify-start">
          <i className="pi pi-stop-circle" />
          <div>Checkout</div>
        </div>
      </div>
    </div>
  );
};
