import { Button } from "@heroui/react";
import classNames from "classnames";
import styles from "./styles.module.css";

export const SaveButton = ({ onSave }: { onSave: () => void }) => {
  return (
    <Button
      isIconOnly
      size="sm"
      color="success"
      onPress={onSave}
      className={styles.saveButton}
    >
      <i className={classNames("pi pi-check", styles.saveButtonIcon)} />
    </Button>
  );
};
