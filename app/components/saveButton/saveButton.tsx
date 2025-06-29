import { Button } from "@heroui/react";
import classNames from "classnames";
import styles from "./styles.module.css";

export const SaveButton = ({
  onSave,
  className,
}: {
  onSave: () => void;
  className?: string;
}) => {
  return (
    <Button
      isIconOnly
      size="sm"
      color="success"
      onPress={onSave}
      className={classNames(styles.saveButton, className)}
    >
      <i className={classNames("pi pi-check", styles.saveButtonIcon)} />
    </Button>
  );
};
