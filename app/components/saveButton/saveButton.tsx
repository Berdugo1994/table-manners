import { Button } from "@heroui/react";
import classNames from "classnames";
import styles from "./styles.module.css";

export const SaveButton = ({
  onSave,
  className,
  addedText,
  isDisabled,
}: {
  onSave: () => void;
  className?: string;
  addedText?: string;
  isDisabled?: boolean;
}) => {
  return (
    <Button
      isDisabled={isDisabled}
      isIconOnly
      size="sm"
      color="success"
      onPress={onSave}
      className={classNames(styles.saveButton, className)}
    >
      <i className={classNames("pi pi-check", styles.saveButtonIcon)} />
      {addedText && (
        <span className="ml-2 text-white  text-lg">{addedText}</span>
      )}
    </Button>
  );
};
