import { getEnvironment } from "./api/urls";

const AIA_BACKEND_URL = {
  local: "http://localhost:3000",
  development: "https://www.intern.dev.nav.no/aia-backend",
  production: "https://www.nav.no/aia-backend",
};

export const arbeidssokerUrl = `${AIA_BACKEND_URL[getEnvironment()]}/arbeidssoker?fraOgMed=2020-01-01`;
export const oppfolgingUrl = `${AIA_BACKEND_URL[getEnvironment()]}/oppfolging`;
export const meldepliktUrl = `${AIA_BACKEND_URL[getEnvironment()]}/meldeplikt`;
export const profilUrl = `${AIA_BACKEND_URL[getEnvironment()]}/profil`;
