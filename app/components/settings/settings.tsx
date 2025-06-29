import { Button } from "@heroui/button";
import styles from "./styles.module.css";

export default function Settings() {
  return (
    <div className={styles.settingsContainer}>
      {/* <div className={styles.settingsIcon}> */}
      <Button
        className={styles.settingsIcon}
        // variant="flat"
        // color="primary"
        size="sm"
      >
        <i className="pi pi-cog" style={{ fontSize: "24px" }}></i>
      </Button>
      {/* </div> */}
    </div>
  );
}
