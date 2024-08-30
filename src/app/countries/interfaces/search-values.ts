import { Country } from "./country";

export interface SearchValues {
  capital: TermCountries;
  country: TermCountries;
  region: TermCountries;
}

export interface TermCountries {
  term: string,
  countries: Country[]
}

