const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function addImageToPDF() {
  // 既存のPDFファイルを読み込む
  const pdfPath = path.join(__dirname, '../output.pdf');
  const pdfBytes = fs.readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBytes);

  // 画像ファイルを読み込む
  const imagePath = path.join(__dirname, './cover.drawio.png');
  const imageBytes = fs.readFileSync(imagePath);
  const image = await pdfDoc.embedPng(imageBytes);

  // 既存のPDFのページサイズを取得
  const existingPage = pdfDoc.getPages()[0];
  const { width: pdfWidth, height: pdfHeight } = existingPage.getSize();

  // 新しいページを先頭に追加
  const newPage = pdfDoc.insertPage(0, [pdfWidth, pdfHeight]);

  // 画像のサイズを取得
  const imgWidth = image.width;
  const imgHeight = image.height;

  // 画像とページのアスペクト比を比較して、リサイズするスケールを計算
  const scaleWidth = pdfWidth / imgWidth;
  const scaleHeight = pdfHeight / imgHeight;
  const scale = Math.min(scaleWidth, scaleHeight);

  const newImgWidth = imgWidth * scale;
  const newImgHeight = imgHeight * scale;

  // 画像がページの中央に配置されるように座標を計算
  const x = (pdfWidth - newImgWidth) / 2;
  const y = (pdfHeight - newImgHeight) / 2;

  // 画像を新しいページに挿入
  newPage.drawImage(image, {
    x: x,
    y: y,
    width: newImgWidth,
    height: newImgHeight
  });

  // PDFを保存
  const pdfBytesModified = await pdfDoc.save();
  fs.writeFileSync(pdfPath, pdfBytesModified);
}

addImageToPDF().catch(console.error);
