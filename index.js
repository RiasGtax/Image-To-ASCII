// Imports / Packages
const jimp = require("jimp"),
  fs = require("fs");

// Const
const GREYSCALE =
  " .'`^\",:;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";
const INPUT_FILE = "image.png";
const OUTPUT_FILE = "output.txt";

// ASCII output variable
let finalString = "";

jimp.read(INPUT_FILE, (err, image) => {
  if (err) throw err;

  // Resize for large images
  if (image.bitmap.width > 500 && image.bitmap.height > 500) {
    image.resize(500, 500);
  }

  // Loop each pixel
  for (let y = 0; y < image.bitmap.height; y++) {
    for (let x = 0; x < image.bitmap.width; x++) {
      // Get ASCII letter based on the pixel color
      finalString +=
        GREYSCALE[
          Math.floor(
            (GREYSCALE.length - 1) *
              (jimp.intToRGBA(image.getPixelColor(x, y)).r / 255).toFixed(2)
          )
        ];
    }
    finalString += "\n";
  }

  // Write file with the output text
  fs.writeFileSync(OUTPUT_FILE, finalString, (err) => {
    if (err) throw err;
  });
  console.log("Saved");
});
