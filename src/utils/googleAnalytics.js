import ReactGA from "react-ga4";

// MEASUREMENT_ID — строка, обязательно в кавычках!
const MEASUREMENT_ID = "G-M2FXDHE7EC";

export const initGA = () => {
  ReactGA.initialize(MEASUREMENT_ID);
};

export const logEvent = (category, action, label) => {
  ReactGA.event({ category, action, label });
};
