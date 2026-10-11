
export const bn = (n: number | string) =>
  String(n).replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);


export const num = (n: number) =>
  bn(Number.isInteger(n) ? n : n.toFixed(1));

export const unitLabel = (unit: string) => {
  const map: Record<string, string> = {
    kg: "প্রতি কেজি",
    litre: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
  };
  return map[unit] ?? "প্রতি একক";
};

export const trend = (dir: "up" | "down" | "flat") => ({
  dir,
  arrow: dir === "up" ? "▲" : dir === "down" ? "▼" : "—",
});