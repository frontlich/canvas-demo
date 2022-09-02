export const hex2rgb = (hex: string): [number, number, number] => {
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    let c = hex.substring(1).split("");
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    const v = Number("0x" + c.join(""));
    return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
  }
  throw new Error("Bad Hex");
};
