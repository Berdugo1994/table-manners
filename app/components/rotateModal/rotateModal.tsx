import { Modal, ModalBody, ModalContent } from "@heroui/react";
import { TbDeviceMobileRotated } from "react-icons/tb";
import styles from "./styles.module.css";
import classNames from "classnames";

export const RotateModal = ({ isModalOpen }: { isModalOpen: boolean }) => {
  return (
    <Modal
      isOpen={isModalOpen}
      onOpenChange={() => {}}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      hideCloseButton={true}
      placement="center"
    >
      <ModalContent>
        <ModalBody>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="text-2xl font-bold">Rotate your device</div>
            <div className="text-sm">
              Please rotate your device to the landscape mode to continue.
            </div>
            <TbDeviceMobileRotated
              className={classNames(styles.rotateDeviceIcon, "text-8xl")}
            />
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
