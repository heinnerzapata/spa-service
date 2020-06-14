import { LANGUAGES } from "models";

export const LANGUAGES_OPTIONS = [
  { language: LANGUAGES.EN },
  { language: LANGUAGES.ES },
];

export const COLORS = {
  white: "#FFFFFF",
  vol7erTitle: "#2D2D2D",
  vol7erTitleGray: "#AAA5A0",
  vol7erMainDark: "#06001B",
  vol7erMainLight: "#E01CE0",
  vol7erMain: "#0D003F",
  vol7erOrange: "#2aa726",
};

export const DEFAULT_CONFIG = {
  defaultLanguage: navigator.language.split("-")[0],
};
