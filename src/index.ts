class App {
  history: { last: ImageData | null; next: ImageData | null } = { last: null, next: null };

  constructor() {
  }
}

const file = {
  width: 16,
  height: 16,
  palette: null,
  // prettier-ignore
  data: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
};

const defaultPalette = [
  [255, 255, 255, 255],
  [0, 0, 0, 255],
];

let prevRevision: ImageData | null = null;
let nextRevision: ImageData | null = null;

function savePrevRevision(revision: ImageData | null) {
  prevRevision = revision;
}

function saveNextRevision(revision: ImageData | null) {
  nextRevision = revision;
}

const canvas = document.createElement("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
canvas.style.backgroundColor = "white";

canvas.width = file.width;
canvas.height = file.height;

//zoom canvas

let zoom = 4;
canvas.style.width = `${file.width * zoom}px`;
canvas.style.height = `${file.height * zoom}px`;
canvas.style.imageRendering = "pixelated";

// ability to zoom in and out with mouse wheel
canvas.addEventListener("wheel", (e) => {
  e.preventDefault();
  const delta = Math.sign(e.deltaY);
  zoom += delta;
  canvas.style.width = `${file.width * zoom}px`;
  canvas.style.height = `${file.height * zoom}px`;
});

document.body.append(canvas);

const imageData = ctx.createImageData(16, 16);

for (let y = 0; y < 16; y++) {
  for (let x = 0; x < 16; x++) {
    const color = file.palette
      ? file.palette[file.data[y][x]]
      : defaultPalette[file.data[y][x]];

    const index = (y * 16 + x) * 4;

    imageData.data[index] = color[0];
    imageData.data[index + 1] = color[1];
    imageData.data[index + 2] = color[2];
    imageData.data[index + 3] = color[3];
  }
}

ctx.putImageData(imageData, 0, 0);

// ability to draw pixel with mouse click
canvas.addEventListener("click", (e) => {
  savePrevRevision(ctx.getImageData(0, 0, 16, 16));
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((e.clientX - rect.left) / zoom);
  const y = Math.floor((e.clientY - rect.top) / zoom);
  const index = (y * 16 + x) * 4;
  imageData.data[index] = 0;
  imageData.data[index + 1] = 0;
  imageData.data[index + 2] = 0;
  imageData.data[index + 3] = 255;
  ctx.putImageData(imageData, 0, 0);

  saveNextRevision(ctx.getImageData(0, 0, 16, 16));
});

// ability to draw pixel with mouse move
canvas.addEventListener("mousemove", (e) => {
  if (e.buttons === 1) {
    savePrevRevision(ctx.getImageData(0, 0, 16, 16));
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / zoom);
    const y = Math.floor((e.clientY - rect.top) / zoom);
    const index = (y * 16 + x) * 4;
    imageData.data[index] = 0;
    imageData.data[index + 1] = 0;
    imageData.data[index + 2] = 0;
    imageData.data[index + 3] = 255;
    ctx.putImageData(imageData, 0, 0);
    saveNextRevision(ctx.getImageData(0, 0, 16, 16));
  }
});

function undo() {
  if (prevRevision) {
    console.log("undo");
    ctx.putImageData(prevRevision, 0, 0);
    saveNextRevision(prevRevision);
    savePrevRevision(null);
  }
}

// ability to undo changes with cmd + z
document.addEventListener("keydown", (e) => {
  if (e.key === "z" && e.metaKey) {
    e.preventDefault();
    undo();
  }
});
