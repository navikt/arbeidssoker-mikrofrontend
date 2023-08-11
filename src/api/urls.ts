const isProduction = window.location.href.includes("www.nav.no");
const isDevelopment = window.location.href.includes("www.dev.nav.no");

export const getEnvironment = () => {
  if (isProduction) {
    return "production";
  }

  if (isDevelopment) {
    return "development";
  }

  return "local";
};

type EnvUrl = { development: string; production: string; local: string };

const AIA_UNDERSIDE_URL: EnvUrl = {
  local: "https://www.intern.dev.nav.no/minside/arbeidssoker",
  development: "https://www.intern.dev.nav.no/minside/arbeidssoker",
  production: "https://www.nav.no/minside/arbeidssoker",
};
export const aiaUndersideUrl = AIA_UNDERSIDE_URL[getEnvironment()];
