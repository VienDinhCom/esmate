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

// export function getCountryList(): string[] {
//   return Intl.supportedValuesOf("unit").sort((a, b) => a.localeCompare(b));
// }

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

// https://github.com/richorama/country-code-lookup?tab=readme-ov-file
