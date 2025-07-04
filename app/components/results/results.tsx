import { FinalPlayer } from "@/app/types";
import { getPnlString } from "@/app/utils/finish";
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";

export const Results = ({ players }: { players: FinalPlayer[] }) => {
  return (
    <div className="flex flex-col gap-4">
      <Table aria-label="Results table" className="w-full">
        <TableHeader>
          <TableColumn>Rank</TableColumn>
          <TableColumn>NAME</TableColumn>
          <TableColumn>PnL</TableColumn>
          <TableColumn>STATUS</TableColumn>
        </TableHeader>
        <TableBody>
          {players.map((player, index) => {
            const isWin = player.pnl > 0;
            return (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{player.name}</TableCell>
                <TableCell>{getPnlString(player.pnl)}</TableCell>
                <TableCell>
                  <Chip
                    className="capitalize"
                    color={isWin ? "success" : "danger"}
                    size="sm"
                    variant="flat"
                  >
                    {isWin ? "Win" : "Lose"}
                  </Chip>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
