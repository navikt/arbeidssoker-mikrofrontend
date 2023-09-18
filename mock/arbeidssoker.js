const identity = (i) => i;
const periode = "nylig-utlopt";

export default [
  {
    url: "/arbeidssoker",
    method: "get",
    response: () => {
      return {
        underoppfolging: {
          status: 200,
          underoppfolging: true,
        },
        arbeidssokerperioder: {
          status: 200,
          arbeidssokerperioder: [
            (periode === "aktiv" || periode === null) && { fraOgMedDato: "2022-09-11", tilOgMedDato: null },
            periode === "nylig-utlopt" && {
              fraOgMedDato: "2022-09-11",
              tilOgMedDato: new Date().toISOString().substring(0, 10),
            },
            periode === "gammel" && { fraOgMedDato: "2020-09-11", tilOgMedDato: "2022-01-01" },
            periode === "aktiv-legacy" && { fraOgMedDato: "2018-07-01", tilOgMedDato: null },
            periode === "ingen" && undefined,
            periode === "aktiv-reaktivert" && { fraOgMedDato: "2022-09-11", tilOgMedDato: "2022-12-01" },
            periode === "aktiv-reaktivert" && { fraOgMedDato: "2022-12-03", tilOgMedDato: null },
          ].filter(identity),
        },
      };
    },
  },
];
