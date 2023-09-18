export type MeldeKortType = "ELEKTRONISK" | "AAP" | "MANUELL_ARENA" | "ORDINAER_MANUELL" | "KORRIGERT_ELEKTRONISK";

export type Meldeplikt = {
  erArbeidssokerNestePeriode: boolean;
  periodeFra: string;
  periodeTil: string;
  meldekorttype: MeldeKortType;
  eventOpprettet: string;
};
