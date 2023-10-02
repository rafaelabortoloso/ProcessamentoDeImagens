export const toAdd = (firstImage: ImageData, secondImage: ImageData) => {
  const result = new ImageData(new Uint8ClampedArray(firstImage.data), 250, 285)

  for (let i = 0; i < result.data.length; i += 4) {
    result.data[i] += secondImage?.data[i] || 0
    result.data[i + 1] += secondImage?.data[i + 1] || 0
    result.data[i + 2] += secondImage?.data[i + 2] || 0
    result.data[i + 3] += secondImage?.data[i + 3] || 0
  }

  return result
}

export const toSubtract = (firstImage: ImageData, secondImage: ImageData) => {
  const result = new ImageData(new Uint8ClampedArray(firstImage.data), 250, 285)

  for (let i = 0; i < result.data.length; i += 4) {
    result.data[i] -= secondImage?.data[i] || 0
    if (result.data[i] < 0) result.data[i] = 0

    result.data[i + 1] -= secondImage?.data[i + 1] || 0
    if (result.data[i + 1] < 0) result.data[i + 1] = 0

    result.data[i + 2] -= secondImage?.data[i + 2] || 0
    if (result.data[i + 2] < 0) result.data[i + 2] = 0
  }

  return result
}

export const addPixelValue = (image: ImageData, value: number) => {
  const modifiedImage = new ImageData(image.width, image.height)
  const pixels = image.data

  for (let i = 0; i < pixels.length; i += 4) {
      const red = Math.min(pixels[i] + value, 255)
      const green = Math.min(pixels[i + 1] + value, 255)
      const blue = Math.min(pixels[i + 2] + value, 255)

      modifiedImage.data[i] = red
      modifiedImage.data[i + 1] = green
      modifiedImage.data[i + 2] = blue
      modifiedImage.data[i + 3] = pixels[i + 3]
  }

  return modifiedImage
}

export const subtractPixelValue = (image: ImageData, value: number) => {
  const modifiedImage = new ImageData(image.width, image.height)
  const pixels = image.data

  for (let i = 0; i < pixels.length; i += 4) {
      const red = Math.max(pixels[i] - value, 0)
      const green = Math.max(pixels[i + 1] - value, 0)
      const blue = Math.max(pixels[i + 2] - value, 0)

      modifiedImage.data[i] = red
      modifiedImage.data[i + 1] = green
      modifiedImage.data[i + 2] = blue
      modifiedImage.data[i + 3] = pixels[i + 3]
  }

  return modifiedImage
}

export const toMultiply = (firstImage: ImageData, secondImage: ImageData) => {
  const result = new ImageData(new Uint8ClampedArray(firstImage.data), 250, 285)

  for (let i = 0; i < result.data.length; i += 4) {
    result.data[i] *= secondImage?.data[i] || 0
    if (result.data[i] > 255) result.data[i] = 255

    result.data[i + 1] *= secondImage?.data[i + 1] || 0
    if (result.data[i + 1] > 255) result.data[i + 1] = 255

    result.data[i + 2] *= secondImage?.data[i + 2] || 0
    if (result.data[i + 2] > 255) result.data[i + 2] = 255

    result.data[i + 3] *= secondImage?.data[i + 3] || 0
    if (result.data[i + 3] > 255) result.data[i + 3] = 255
  }

  return result
}

export const toDivide = (firstImage: ImageData, secondImage: ImageData) => {
  const result = new ImageData(new Uint8ClampedArray(firstImage.data), 250, 285)

  for (let i = 0; i < result.data.length; i += 4) {
    result.data[i] /= secondImage?.data[i] || 0
    result.data[i + 1] /= secondImage?.data[i + 1] || 0
    result.data[i + 2] /= secondImage?.data[i + 2] || 0
  }

  return result
}

export const toBlend = (firstImage: ImageData, secondImage: ImageData, blendValue: number) => {
  const result = new ImageData(new Uint8ClampedArray(firstImage.data), 250, 285)

  for (let i = 0; i < result.data.length; i += 4) {
    result.data[i] = blendValue * result.data[i] + (1 - blendValue) * (secondImage?.data[i] || 0)
    result.data[i + 1] =
      blendValue * result.data[i + 1] + (1 - blendValue) * (secondImage?.data[i + 1] || 0)
    result.data[i + 2] =
      blendValue * result.data[i + 2] + (1 - blendValue) * (secondImage?.data[i + 2] || 0)
  }

  return result
}

export const toAnd = (firstImage: ImageData, secondImage: ImageData) => {
  const result = new ImageData(new Uint8ClampedArray(firstImage.data), 250, 285)

  for (let i = 0; i < result.data.length; i += 4) {
    result.data[i] = result.data[i] && (secondImage?.data[i] || 0)
    result.data[i + 1] = result.data[i + 1] && (secondImage?.data[i + 1] || 0)
    result.data[i + 2] = result.data[i + 2] && (secondImage?.data[i + 2] || 0)
  }

  return result
}

export const toOr = (firstImage: ImageData, secondImage: ImageData) => {
  const result = new ImageData(new Uint8ClampedArray(firstImage.data), 250, 285)

  for (let i = 0; i < result.data.length; i += 4) {
    result.data[i] = result.data[i] || secondImage?.data[i] || 0
    result.data[i + 1] = result.data[i + 1] || secondImage?.data[i + 1] || 0
    result.data[i + 2] = result.data[i + 2] || secondImage?.data[i + 2] || 0
  }

  return result
}

export const toXor = (firstImage: ImageData, secondImage: ImageData) => {
  const result = new ImageData(new Uint8ClampedArray(firstImage.data), 250, 285)

  for (let i = 0; i < result.data.length; i += 4) {
    result.data[i] = result.data[i] === secondImage?.data[i] ? 0 : 255
    result.data[i + 1] = result.data[i + 1] === secondImage?.data[i + 1] ? 0 : 255
    result.data[i + 2] = result.data[i + 2] === secondImage?.data[i + 2] ? 0 : 255
  }

  return result
}

export const toNot = (image: ImageData) => {
  const result = new ImageData(new Uint8ClampedArray(image.data), 250, 285)

  for (let i = 0; i < result.data.length; i += 4) {
    result.data[i] = 255 - result.data[i]
    result.data[i + 1] = 255 - result.data[i + 1]
    result.data[i + 2] = 255 - result.data[i + 2]
  }

  return result
}
