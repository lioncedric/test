const http = require("node:http");

const PORT = process.env.PORT || 3000;

// Superman shield, 15x16 pixels. Each character is one pixel:
// B = blue border, Y = yellow field, R = red "S", "." = transparent.
const SUPERMAN_PIXELS = [
  "BBBBBBBBBBBBBBB",
  "BYYYYYYYYYYYYYB",
  "BYYYYYYYYYYYYYB",
  "BYYYYRRRRRYYYYB",
  "BYYYRRYYYRRYYYB",
  "BYYYRRYYYYYYYYB",
  "BYYYYRRRRRYYYYB",
  "BYYYYYYYYRRYYYB",
  "BYYYRRYYYRRYYYB",
  "BYYYYRRRRRYYYYB",
  ".BYYYYYYYYYYYB.",
  "..BYYYYYYYYYB..",
  "...BYYYYYYYB...",
  "....BYYYYYB....",
  ".....BYYYB.....",
  "......BYB......",
];

const PALETTE = {
  B: "#1d4ed8",
  Y: "#facc15",
  R: "#dc2626",
};

const PIXEL_SCALE = 16;

// Builds an inline SVG with one crisp square per pixel.
function pixelArtSvg(rows, palette, scale, label) {
  const height = rows.length;
  const width = rows[0].length;
  const rects = [];
  rows.forEach((row, y) => {
    [...row].forEach((ch, x) => {
      const fill = palette[ch];
      if (fill) {
        rects.push(`<rect x="${x}" y="${y}" width="1" height="1" fill="${fill}"/>`);
      }
    });
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width * scale}" height="${height * scale}" shape-rendering="crispEdges" role="img" aria-label="${label}">${rects.join("")}</svg>`;
}

const HOME_PAGE = [
  "<!DOCTYPE html>",
  "<html>",
  '<head><meta charset="utf-8"><title>Hello</title></head>',
  "<body>",
  "<h1>Hello</h1>",
  "<h2>Superman</h2>",
  pixelArtSvg(SUPERMAN_PIXELS, PALETTE, PIXEL_SCALE, "Superman pixel art"),
  "</body>",
  "</html>",
  "",
].join("\n");

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(HOME_PAGE);
    return;
  }
  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Not Found");
});

// No host argument: Node binds dual-stack (IPv6 "::", which also accepts IPv4),
// so both localhost -> ::1 and published-port IPv4 traffic reach the server.
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
