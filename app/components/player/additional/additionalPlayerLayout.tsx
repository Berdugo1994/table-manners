import styles from "./styles.module.css";

interface AdditionalPlayerLayoutProps {
  children: React.ReactNode;
  rowIndex: number;
  columnIndex: number;
}

export default function AdditionalPlayerLayout({
  children,
  rowIndex,
  columnIndex,
}: AdditionalPlayerLayoutProps) {
  const getPositionStyles = (pos: "top" | "bottom" | "left" | "right") => {
    const baseStyles = {
      position: "absolute" as const,
      zIndex: 10,
    };

    switch (pos) {
      case "top":
        return {
          ...baseStyles,
          bottom: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          marginBottom: "8px",
        };
      case "bottom":
        return {
          ...baseStyles,
          top: "100%",
          left: "50%",
          transform: "translateX(-50%)",
          marginTop: "8px",
        };
      case "left":
        return {
          ...baseStyles,
          right: "100%",
          top: "50%",
          transform: "translateY(-50%)",
          marginRight: "8px",
        };
      case "right":
        return {
          ...baseStyles,
          left: "100%",
          top: "50%",
          transform: "translateY(-50%)",
          marginLeft: "8px",
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
    if (column === 5) return "left"; // Player 1 (right)
    if (column === 1) return "right"; // Player 3 (left)

    return "bottom";
  };

  const optimalPosition = getOptimalPosition(rowIndex, columnIndex);
  const finalPosition = optimalPosition;

  return (
    <div
      className={styles.additionalPlayerLayout}
      style={getPositionStyles(finalPosition)}
    >
      {children}
    </div>
  );
}
