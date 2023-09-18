import { useState } from "react";
import { ChevronRightIcon, ExclamationmarkTriangleFillIcon } from "@navikt/aksel-icons";
import { BodyLong, Heading } from "@navikt/ds-react";
import { aiaUndersideUrl } from "../../api/urls";
import { logNavigereEvent } from "../../utils/amplitude";
import useSWRImmutable from "swr/immutable";
import { meldepliktUrl, profilUrl } from "../../urls";
import { fetcher } from "../../api/api";
import { Meldeplikt } from "../../types";
import styles from "./IkkeRegistrertArbeidssoker.module.css";

export type JaEllerNei = { oppdatert: string; valg: "ja" | "nei" };

function valgAvVisningErUtdatert(valgtVisning: JaEllerNei): boolean {
  // Hvis man velger at man ikke har behov for å være registrert lenger, skal dette bare være gyldig i 28 dager,
  // sånn at det gamle valget ikke blir stående hvis man havner i den samme situasjonen på nytt senere.
  const valgtVisningDato = new Date(new Date(valgtVisning.oppdatert).toISOString().substr(0, 10));
  const datoNaa = new Date(new Date().toISOString().substr(0, 10));
  const millis = datoNaa.getMilliseconds() - valgtVisningDato.getMilliseconds();
  const dagerSidenValg = millis > 0 ? Math.floor(millis / 86400000) : 1;

  return dagerSidenValg >= 28;
}

function beregnReaktiveringVisningOgSkalViseDato(
  valgtReaktiveringVisning: JaEllerNei | undefined,
  meldeplikt: Meldeplikt | null
) {
  let reaktiveringVisning = "ja";
  let skalViseDato = true;

  if (valgtReaktiveringVisning && meldeplikt) {
    const meldepliktDate = new Date(meldeplikt.eventOpprettet);
    const valgtVisningDato = new Date(valgtReaktiveringVisning.oppdatert);

    if (meldepliktDate > valgtVisningDato) {
      reaktiveringVisning = meldeplikt.erArbeidssokerNestePeriode === true ? "ja" : "nei";
    } else {
      reaktiveringVisning = valgAvVisningErUtdatert(valgtReaktiveringVisning) ? "ja" : valgtReaktiveringVisning.valg;
      skalViseDato = false;
    }
  } else if (meldeplikt) {
    reaktiveringVisning = meldeplikt.erArbeidssokerNestePeriode === true ? "ja" : "nei";
  } else if (valgtReaktiveringVisning) {
    reaktiveringVisning = valgAvVisningErUtdatert(valgtReaktiveringVisning) ? "ja" : valgtReaktiveringVisning.valg;
  }

  return { reaktiveringVisning, skalViseDato };
}

const IkkeRegistrertArbeidssoker = () => {
  const { data: profil } = useSWRImmutable(profilUrl, fetcher);
  const { data: meldeplikt } = useSWRImmutable(meldepliktUrl, fetcher);

  const valgtReaktiveringVisning: JaEllerNei | undefined = profil?.["aiaReaktiveringVisning"];
  const { reaktiveringVisning, skalViseDato } = beregnReaktiveringVisningOgSkalViseDato(
    valgtReaktiveringVisning,
    meldeplikt
  );

  const [visReaktiveringAdvarsel, setVisReaktiveringAdvarsel] = useState(reaktiveringVisning);

  return visReaktiveringAdvarsel === "ja" ? (
    <a className={styles.container} href={aiaUndersideUrl} onClick={() => logNavigereEvent()}>
      <div className={styles.headerContainer}>
        <div className={styles.titleContainer}>
          <div className={styles.checkmarkContainer}>
            <ExclamationmarkTriangleFillIcon className={styles.checkmark} aria-hidden fontSize="24px" />
          </div>
          <Heading size="small" level="2">
            Du er ikke lenger arbeidssøker
          </Heading>
        </div>
        <div className={styles.chevronContainer}>
          <ChevronRightIcon className={styles.chevron} aria-hidden fontSize="24px" />
        </div>
      </div>
      <BodyLong className={styles.text}>
        Du er ikke lenger registrert som arbeidssøker hos NAV. Les mer om hva det betyr å ikke være registrert.
      </BodyLong>
    </a>
  ) : null;
};

export default IkkeRegistrertArbeidssoker;
