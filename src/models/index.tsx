export enum LANGUAGES {
  ES = 'es',
  EN = 'en',
}

export interface ILanguagesOptions {
  language: LANGUAGES;
}

export interface ICredentials {
  email: string;
  password: string;
}
