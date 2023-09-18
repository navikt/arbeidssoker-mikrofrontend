import IkkeRegistrertArbeidssoker from "./components/arbeidssoker/IkkeRegistrertArbeidssoker";
import useSWRImmutable from "swr/immutable";
import { fetcher } from "./api/api";
import { arbeidssokerUrl, oppfolgingUrl, profilUrl } from "./urls";
import beregnArbeidssokerperioder from "./utils";

function App() {
  const { data: arbeidssokerperioderData, isLoading: isLoadingArbeidssokerPerioder } = useSWRImmutable(
    arbeidssokerUrl,
    fetcher
  );
  const { data: underOppfolgingData, isLoading: isLoadingUnderOppfolgingData } = useSWRImmutable(
    oppfolgingUrl,
    fetcher
  );
  useSWRImmutable(profilUrl, fetcher);

  if (isLoadingArbeidssokerPerioder) {
    return null;
  }

  if (isLoadingUnderOppfolgingData) {
    return null;
  }

  const arbeidssokerperioder = beregnArbeidssokerperioder(arbeidssokerperioderData.arbeidssokerperioder);
  const harAktivArbeidssokerperiode = arbeidssokerperioder.harAktivArbeidssokerperiode === "Ja";

  if (harAktivArbeidssokerperiode) {
    return null;
  }

  console.log(arbeidssokerperioder.antallDagerSidenSisteArbeidssokerperiode < 28);

  return (
    <>
      {(arbeidssokerperioder.antallDagerSidenSisteArbeidssokerperiode as number) < 28 &&
        !underOppfolgingData.underoppfolging && <IkkeRegistrertArbeidssoker />}
    </>
  );
}

export default App;
