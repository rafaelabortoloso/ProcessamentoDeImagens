export const drawImage = (
  context: CanvasRenderingContext2D | null | undefined,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
  offsetX?: number,
  offsetY?: number,
) => {
  offsetX = offsetX ? offsetX : 0.5
  offsetY = offsetY ? offsetY : 0.5

  if (offsetX < 0) offsetX = 0
  if (offsetY < 0) offsetY = 0
  if (offsetX > 1) offsetX = 1
  if (offsetY > 1) offsetY = 1

  const imageWidth = image.width
  const imageHeight = image.height
  const r = Math.min(width / imageWidth, height / imageHeight)

  let newWidth = imageWidth * r
  let neiHeight = imageHeight * r
  let cx,
    cy,
    cw,
    ch,
    ar = 1

  if (newWidth < width) ar = width / newWidth
  if (neiHeight < height) ar = height / neiHeight
  newWidth *= ar
  neiHeight *= ar

  cw = imageWidth / (newWidth / width)
  ch = imageHeight / (neiHeight / height)

  cx = (imageWidth - cw) * offsetX
  cy = (imageHeight - ch) * offsetY

  if (cx < 0) cx = 0
  if (cy < 0) cy = 0
  if (cw > imageWidth) cw = imageWidth
  if (ch > imageHeight) ch = imageHeight

  context?.drawImage(image, cx, cy, cw, ch, x, y, width, height)
}
