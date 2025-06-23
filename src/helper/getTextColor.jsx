export default function getTextColor(color) {
  const [r, g, b] = color
    .replace(/^#/, "")
    .match(/.{2}/g)
    .map((hex) => parseInt(hex, 16));
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  let textColor = luminance > 0.5 ? "#000000" : "#FFFFFF";
  return textColor;
}
