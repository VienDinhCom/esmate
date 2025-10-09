import countries from "iso-3166-1";
import languages from "iso-639-1";

export interface TimeZone {
  name: string;
  value: string;
  offset: string;
}

export function getTimeZoneList(locale = "en-US"): TimeZone[] {
  const timeZones = Intl.supportedValuesOf("timeZone");

  const getOffset = (timeZone: string): string => {
    const offset =
      new Intl.DateTimeFormat(locale, { timeZone, timeZoneName: "longOffset" })
        .formatToParts(new Date())
        .find((part) => part.type === "timeZoneName")?.value || "GMT";

    return offset === "GMT" ? "+00:00" : offset.replace("GMT", "");
  };

  return timeZones
    .map((value) => {
      const offset = getOffset(value);
      const place = (value.split("/").pop() || value).replaceAll("_", " ");

      return {
        name: `${offset} ${place}`,
        value,
        offset,
      };
    })
    .sort((a, b) => a.offset.localeCompare(b.offset) || a.name.localeCompare(b.name));
}

export function getCurrentTimeZone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

interface Language {
  name: string;
  value: string;
}

export function getLanguageList(locale = "en-US"): Language[] {
  const codes = languages.getAllCodes().sort((a, b) => a.localeCompare(b));

  return codes
    .map((code) => {
      const name = new Intl.DisplayNames([locale], { type: "language" }).of(code);

      if (name === undefined) {
        throw new Error(`Language name not found for code: ${code}`);
      }

      return {
        name,
        value: code,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getCurrentLanguage(): string {
  return (navigator.language || "en-US").split("-")[0];
}

interface Country {
  name: string;
  value: string;
}

export function getCountryList(locale = "en-US"): Country[] {
  const codes = countries
    .all()
    .map((country) => country.alpha2)
    .sort((a, b) => a.localeCompare(b));

  return codes
    .map((code) => {
      const name = new Intl.DisplayNames([locale], { type: "region" }).of(code);

      if (name === undefined) {
        throw new Error(`Country name not found for code: ${code}`);
      }

      return {
        name,
        value: code,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function getCurrentCountry(): string {
  return (navigator.language || "en-US").split("-")[1];
}

interface Currency {
  name: string;
  value: string;
}

export function getCurrencyList(locale = "en-US"): Currency[] {
  const codes = Intl.supportedValuesOf("currency");

  return codes
    .map((code) => {
      const name = new Intl.DisplayNames([locale], { type: "currency" }).of(code);

      if (name === undefined) {
        throw new Error(`Currency name not found for code: ${code}`);
      }

      return {
        name,
        value: code,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));
}
