import { CheckmarkCircleFillIcon, ChevronRightIcon } from "@navikt/aksel-icons";
import { BodyLong, Heading } from "@navikt/ds-react";
import { aiaUndersideUrl } from "../../api/urls";
import styles from "./RegistrertArbeidssoker.module.css";
import { logNavigereEvent } from "../../utils/amplitude";

const RegistrertArbeidssoker = () => {
  console.log("Er regisrtert arbeidssoker");

  return (
    <a className={styles.container} href={aiaUndersideUrl} onClick={() => logNavigereEvent()}>
      <div className={styles.headerContainer}>
        <Heading size="small" level="2">
          Du er registrert som arbeidssøker
        </Heading>

        <div className={styles.chevronContainer}>
          <CheckmarkCircleFillIcon className={styles.checkmark} aria-hidden fontSize="24px" />
          <ChevronRightIcon className={styles.chevron} aria-hidden fontSize="24px" />
        </div>
      </div>
      <BodyLong className={styles.text}>
        Din situasjon, opplysninger fra registreringen, aktivitetsplan, dialog med veileder med mer.
      </BodyLong>
    </a>
  );
};

export default RegistrertArbeidssoker;
