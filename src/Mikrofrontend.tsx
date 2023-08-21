import React from "react";
import App from "./App";
import { LanguageProvider } from "./language/LanguageProvider";
import { initAmplitude } from "./utils/amplitude";

const Mikrofrontend = () => {
  initAmplitude();

  return (
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
};

export default Mikrofrontend;
