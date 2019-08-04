const DIST_THRESHOLD = 80;

let video;
let prev;
let trackColor = { r: 51, g: 51, b: 51, a: 255 };

function setup() {
  createCanvas(640, 360);
  pixelDensity(1);
  prev = createImage(width, height);
  video = createCapture(VIDEO);
  video.size(width, height);
}

function draw() {
  background(51);

  video.loadPixels();
  prev.loadPixels();
  image(video, 0, 0);

  loadPixels();
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width / 2; x++) {
      let index = getIndex(x, y);

      if (distSq(video, prev, index) > DIST_THRESHOLD * DIST_THRESHOLD) {    
        setColor(pixels, index, 255, 255, 255);  
      } else {
        setColor(pixels, index, 0, 0, 0);
      }

    }
  }
  
  updatePixels();
  prev.copy(video, 0, 0, width, height, 0, 0, width, height);
}

function mousePressed() {
  const index = getIndex(mouseX, mouseY);
  trackColor = getColor(video.pixels, index);
}

function getIndex(x, y) {
  return (x + y * width) * 4;
}

function getColor(ps, index) {
  return {
    r: ps[index],
    g: ps[index + 1],
    b: ps[index + 2],
    a: ps[index + 3]
  };
}

function setColor(pixels, index, r, g, b, a = 255) {
  pixels[index] = r;
  pixels[index + 1] = g;
  pixels[index + 2] = b;
  pixels[index + 3] = a;
}

function distSq(im1, im2, index) {
  let r1 = im1.pixels[index];
  let g1 = im1.pixels[index + 1];
  let b1 = im1.pixels[index + 2];

  let r2 = im2.pixels[index];
  let g2 = im2.pixels[index + 1];
  let b2 = im2.pixels[index + 2];

  let rDiff = (r2 - r1);
  let gDiff = (g2 - g1);
  let bDiff = (b2 - b1);
  return (rDiff * rDiff) + (gDiff * gDiff) + (bDiff * bDiff);
}
