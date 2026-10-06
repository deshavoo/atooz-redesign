import sharp from "sharp";
import fs from "fs";
import path from "path";

const images = [
  "public/images/our-work/work-05.png",
  "public/images/our-work/work-06.png",
  "public/images/logo/logo-light-v2.png",
  "public/images/our-work/work-02.png",
  "public/images/our-work/work-03.png",
  "public/images/our-work/work-01.png",
  "public/images/our-work/work-04.png",
  "public/images/hero/Hero-light.webp",
  "public/images/hero/hero.webp",
];

const backupDir = "public/images-backup";

function formatSize(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

async function compressImage(relativePath) {
  const inputPath = path.resolve(relativePath);

  if (!fs.existsSync(inputPath)) {
    console.log(`❌ Not found: ${relativePath}`);
    return;
  }

  const parsed = path.parse(inputPath);

  // Create backup directory preserving the folder structure
  const relativeDir = path.relative(path.resolve("public"), parsed.dir);

  const backupFolder = path.join(path.resolve(backupDir), relativeDir);

  fs.mkdirSync(backupFolder, { recursive: true });

  const backupPath = path.join(backupFolder, parsed.base);

  // Backup original only if it doesn't already exist
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(inputPath, backupPath);
  }

  const originalSize = fs.statSync(inputPath).size;

  // Keep PNG files as PNG, but optimize them
  if (parsed.ext.toLowerCase() === ".png") {
    await sharp(inputPath)
      .png({
        compressionLevel: 9,
        palette: true,
        quality: 90,
      })
      .toFile(`${inputPath}.tmp`);

    // Optimize existing WebP files
  } else if (parsed.ext.toLowerCase() === ".webp") {
    await sharp(inputPath)
      .webp({
        quality: 85,
        effort: 6,
      })
      .toFile(`${inputPath}.tmp`);
  } else {
    console.log(`⚠️ Skipped unsupported format: ${relativePath}`);
    return;
  }

  const compressedSize = fs.statSync(`${inputPath}.tmp`).size;

  fs.renameSync(`${inputPath}.tmp`, inputPath);

  const saved = originalSize - compressedSize;
  const percentage = ((saved / originalSize) * 100).toFixed(1);

  console.log(
    `✅ ${relativePath}\n` +
      `   Before: ${formatSize(originalSize)}\n` +
      `   After:  ${formatSize(compressedSize)}\n` +
      `   Saved:  ${formatSize(saved)} (${percentage}%)\n`
  );
}

async function main() {
  console.log("🚀 Starting image compression...\n");

  for (const image of images) {
    await compressImage(image);
  }

  console.log("\n🎉 Done!");
  console.log(`📦 Original images backed up in: ${backupDir}`);
}

main().catch((error) => {
  console.error("\n❌ Compression failed:");
  console.error(error);
  process.exit(1);
});
