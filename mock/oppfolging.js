export default [
  {
    url: "/oppfolging",
    method: "get",
    response: () => {
      return {
        underOppfolging: true,
        kanReaktiveres: false,
        reservasjonKRR: false,
        servicegruppe: "IKVAL",
        formidlingsgruppe: "ARBS",
      };
    },
  },
];
