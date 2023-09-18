const erArbeidssokerNestePeriode = null;

export default [
  {
    url: "/meldeplikt",
    method: "get",
    response: () => {
      return {
        erArbeidssokerNestePeriode,
        periodeFra: "2022-10-24",
        periodeTil: "2022-11-06",
        meldekorttype: "MANUELL_ARENA",
        eventOpprettet: "2022-11-09T12:30:52.107",
      };
    },
  },
];
