import classNames from "classnames";
import styles from "./styles.module.css";

interface AdditionalPlayerLayoutProps {
  children: React.ReactNode;
  rowIndex: number;
  columnIndex: number;
  playerId: number;
}

const MARGIN_FROM_CARD = "calc(50% + 45px)";

const getPositionStyles = (pos: "top" | "bottom" | "left" | "right") => {
  const baseStyles = {
    position: "absolute" as const,
    zIndex: 10,
  };

  switch (pos) {
    case "top":
      return {
        ...baseStyles,
        bottom: MARGIN_FROM_CARD,
        left: "50%",
        transform: "translateX(-50%)",
      };
    case "bottom":
      return {
        ...baseStyles,
        top: MARGIN_FROM_CARD,
        left: "50%",
        transform: "translateX(-50%)",
      };
    case "left":
      return {
        ...baseStyles,
        right: MARGIN_FROM_CARD,
        top: "50%",
        transform: "translateY(-50%)",
      };
    case "right":
      return {
        ...baseStyles,
        left: MARGIN_FROM_CARD,
        top: "50%",
        transform: "translateY(-50%)",
      };
    default:
      return baseStyles;
  }
};

const getOptimalPosition = (
  row: number,
  column: number
): "top" | "bottom" | "left" | "right" => {
  if (row === 1) return "bottom"; // Player 0 (top)
  if (row === 5) return "top"; // Player 2 (bottom)
  if (column === 20) return "left"; // Player 1 (right)
  if (column === 2) return "right"; // Player 3 (left)

  return "bottom";
};

export default function AdditionalPlayerLayout({
  children,
  rowIndex,
  columnIndex,
  playerId,
}: AdditionalPlayerLayoutProps) {
  const optimalPosition = getOptimalPosition(rowIndex, columnIndex);
  const finalPosition = optimalPosition;

  return (
    <div
      data-player-additional-id={playerId}
      className={classNames(styles.additionalPlayerLayout)}
      style={getPositionStyles(finalPosition)}
    >
      {children}
    </div>
  );
}
