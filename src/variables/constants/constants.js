export const LANGUAGES = [
  { language: 'en' },
  { language: 'es' },
];

export const COLORS = {
  white: '#FFFFFF',
  vol7erTitle: '#2D2D2D',
  vol7erTitleGray: '#AAA5A0',

  // vol7erMainDark: '#FFA200',
  // vol7erOrange: '#FEBF53',
  // backgroundOrange: '#FFA200',

  // vol7erMainDark: '#2aa726',
  // vol7erOrange: '#2aa726',
  // backgroundOrange: '#FFA200'

  vol7erMainDark: '#06001B',
  vol7erMainLight: '#E01CE0',
  vol7erMain: '#0D003F',
  vol7erOrange: '#2aa726',
};

export const DEFAULT_CONFIG = {
  defaultLanguage: (navigator.language || navigator.userLanguage).split('-')[0],
};
