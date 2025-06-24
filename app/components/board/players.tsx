import styles from "./board.module.css";
import { getPlayerLocation } from "./locations";
import classNames from "classnames";

export default function Players({ playersAmount }: { playersAmount: number }) {
  const players = Array.from({ length: playersAmount }, (_, index) => index);
  const playerNames = [
    "eden",
    "yoni",
    "shlomo",
    "shira",
    "yoni",
    "yarin",
    "tamir",
    "tomer",
    "fondi",
  ];
  console.log(players);
  console.log(playerNames);
  return (
    <>
      {players.map((player) => {
        const location = getPlayerLocation(player, playersAmount);
        const row = location.row + 1;
        const column = location.column + 1;
        const colClass = `col-start-${column}`;
        const rowClass = `row-start-${row}`;
        console.log(player, rowClass, colClass, playerNames[player]);
        return (
          <div
            key={player}
            className={classNames(styles.player, colClass, rowClass)}
            style={{
              gridColumnStart: column,
              gridRowStart: row,
            }}
          >
            <div className={styles.playerName}>{playerNames[player]}</div>
          </div>
        );
      })}
    </>
  );
}
