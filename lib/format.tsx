const TZ = "Asia/Dhaka";

const UNITS: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export const unitBn = (unit: string) => UNITS[unit] ?? unit;

export const bn = (n: number) => n.toLocaleString("bn-BD");

export const bnPercent = (n: number) =>
  Math.abs(n).toLocaleString("bn-BD", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export const bnDate = (d: Date = new Date()) =>
  d.toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: TZ,
  });

export const trendSymbol = { up: "▲", down: "▼", flat: "—" } as const;