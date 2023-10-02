export const toGrayScale = (image: ImageData) => {
  const result = new ImageData(new Uint8ClampedArray(image.data), 250, 285)

  for (let i = 0; i < result.data.length; i += 4) {
    const formula =
      0.2989 * result.data[i] + 0.587 * result.data[i + 1] + 0.114 * result.data[i + 2]
    result.data[i] = formula
    result.data[i + 1] = formula
    result.data[i + 2] = formula
  }

  return result
}

export const toBinaryScale = (image: ImageData) => {
  const result = new ImageData(new Uint8ClampedArray(image.data), 250, 285)

  for (let i = 0; i < result.data.length; i += 4) {
    if (result.data[i] && result.data[i + 1] && result.data[i + 2] <= 127) {
      result.data[i] = 0
      result.data[i + 1] = 0
      result.data[i + 2] = 0
    } else {
      result.data[i] = 255
      result.data[i + 1] = 255
      result.data[i + 2] = 255
    }
  }

  return result
}

export const toNegativeScale = (image: ImageData) => {
  const result = new ImageData(new Uint8ClampedArray(image.data), 250, 285)

  for (let i = 0; i < result.data.length; i += 4) {
    result.data[i] = 255 - result.data[i]
    result.data[i + 1] = 255 - result.data[i + 1]
    result.data[i + 2] = 255 - result.data[i + 2]
  }

  return result
}

export const toGaussianElimination = (image: ImageData, value: number) => {
  const kernelHandler = (size: number, stdDeviation: number) => {
    const kernel: number[][] = []
    const kernelOffset = Math.floor(size / 2)

    let sum = 0

    for (let y = -kernelOffset; y <= kernelOffset; y++) {
      const row: number[] = []

      for (let x = -kernelOffset; x <= kernelOffset; x++) {
        const exponent = -(x * x + y * y) / (2 * Math.pow(stdDeviation, 2))
        const value = Math.exp(exponent) / (2 * Math.PI * Math.pow(stdDeviation, 2))

        row.push(value)

        sum += value
      }

      kernel.push(row)
    }

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        kernel[y][x] /= sum
      }
    }

    return kernel
  }

  const { width, height, data } = image
  const resultData = new Uint8ClampedArray(data.length)

  const kernelSize = 5
  const kernelOffset = Math.floor(kernelSize / 2)

  const kernel = kernelHandler(kernelSize, value)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let [redSum, greenSum, blueSum, kernelSum] = [0, 0, 0, 0]

      for (let kernelY = 0; kernelY < kernelSize; kernelY++) {
        for (let kernelX = 0; kernelX < kernelSize; kernelX++) {
          const imageX = x + (kernelX - kernelOffset)
          const imageY = y + (kernelY - kernelOffset)

          if (imageX >= 0 && imageX < width && imageY >= 0 && imageY < height) {
            const index = (imageY * width + imageX) * 4
            const kernelVal = kernel[kernelY][kernelX]

            kernelSum += kernelVal
            redSum += data[index] * kernelVal
            greenSum += data[index + 1] * kernelVal
            blueSum += data[index + 2] * kernelVal
          }
        }
      }

      const redIndex = (y * width + x) * 4

      resultData[redIndex] = Math.floor(redSum / kernelSum)
      resultData[redIndex + 1] = Math.floor(greenSum / kernelSum)
      resultData[redIndex + 2] = Math.floor(blueSum / kernelSum)
      resultData[redIndex + 3] = data[redIndex + 3]
    }
  }

  return new ImageData(resultData, width, height)
}

export const toMax = (image: ImageData) => {
  const { width, height, data } = image

  const result = new Uint8ClampedArray(data.length)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let maxRed = 0
      let maxGreen = 0
      let maxBlue = 0
      let maxAlpha = 0

      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const neighborX = x + dx
          const neighborY = y + dy

          if (neighborX >= 0 && neighborX < width && neighborY >= 0 && neighborY < height) {
            const neighborIndex = (neighborY * width + neighborX) * 4

            maxRed = Math.max(maxRed, data[neighborIndex])
            maxGreen = Math.max(maxGreen, data[neighborIndex + 1])
            maxBlue = Math.max(maxBlue, data[neighborIndex + 2])
            maxAlpha = Math.max(maxAlpha, data[neighborIndex + 3])
          }
        }
      }

      const index = (y * width + x) * 4

      result[index] = maxRed
      result[index + 1] = maxGreen
      result[index + 2] = maxBlue
      result[index + 3] = maxAlpha
    }
  }

  return new ImageData(result, width, height)
}

export const toMin = (image: ImageData) => {
  const { width, height, data } = image

  const result = new Uint8ClampedArray(data.length)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let minRed = 255
      let minGreen = 255
      let minBlue = 255
      let minAlpha = 255

      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const neighborX = x + dx
          const neighborY = y + dy

          if (neighborX >= 0 && neighborX < width && neighborY >= 0 && neighborY < height) {
            const neighborIndex = (neighborY * width + neighborX) * 4

            minRed = Math.min(minRed, data[neighborIndex])
            minGreen = Math.min(minGreen, data[neighborIndex + 1])
            minBlue = Math.min(minBlue, data[neighborIndex + 2])
            minAlpha = Math.min(minAlpha, data[neighborIndex + 3])
          }
        }
      }

      const index = (y * width + x) * 4

      result[index] = minRed
      result[index + 1] = minGreen
      result[index + 2] = minBlue
      result[index + 3] = minAlpha
    }
  }

  return new ImageData(result, width, height)
}

export const toAvg = (image: ImageData) => {
  const { width, height, data } = image

  const result = new Uint8ClampedArray(data.length)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let red = 0
      let green = 0
      let blue = 0
      let alpha = 0

      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const neighborX = x + dx
          const neighborY = y + dy

          if (neighborX >= 0 && neighborX < width && neighborY >= 0 && neighborY < height) {
            const neighborIndex = (neighborY * width + neighborX) * 4

            red += data[neighborIndex]
            green += data[neighborIndex + 1]
            blue += data[neighborIndex + 2]
            alpha += data[neighborIndex + 3]
          }
        }
      }

      const index = (y * width + x) * 4

      result[index] = red / 9
      result[index + 1] = green / 9
      result[index + 2] = blue / 9
      result[index + 3] = alpha / 9
    }
  }

  return new ImageData(result, width, height)
}

export const toMedian = (image: ImageData) => {
  const { width, height, data } = image

  const result = new Uint8ClampedArray(data.length)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const redList: number[] = []
      const greenList: number[] = []
      const blueList: number[] = []
      const alphaList: number[] = []

      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const neighborX = x + dx
          const neighborY = y + dy

          if (neighborX >= 0 && neighborX < width && neighborY >= 0 && neighborY < height) {
            const neighborIndex = (neighborY * width + neighborX) * 4

            redList.push(data[neighborIndex])
            greenList.push(data[neighborIndex + 1])
            blueList.push(data[neighborIndex + 2])
            alphaList.push(data[neighborIndex + 3])
          }
        }
      }

      redList.sort((a, b) => a - b)
      greenList.sort((a, b) => a - b)
      blueList.sort((a, b) => a - b)
      alphaList.sort((a, b) => a - b)

      const index = (y * width + x) * 4

      result[index] = redList[5]
      result[index + 1] = greenList[5]
      result[index + 2] = blueList[5]
      result[index + 3] = alphaList[5]
    }
  }

  return new ImageData(result, width, height)
}

export const toOrder = (image: ImageData, value: number) => {
  const { width, height, data } = image

  const result = new Uint8ClampedArray(data.length)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const redList: number[] = []
      const greenList: number[] = []
      const blueList: number[] = []
      const alphaList: number[] = []

      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const neighborX = x + dx
          const neighborY = y + dy

          if (neighborX >= 0 && neighborX < width && neighborY >= 0 && neighborY < height) {
            const neighborIndex = (neighborY * width + neighborX) * 4

            redList.push(data[neighborIndex])
            greenList.push(data[neighborIndex + 1])
            blueList.push(data[neighborIndex + 2])
            alphaList.push(data[neighborIndex + 3])
          }
        }
      }

      redList.sort((a, b) => a - b)
      greenList.sort((a, b) => a - b)
      blueList.sort((a, b) => a - b)
      alphaList.sort((a, b) => a - b)

      const index = (y * width + x) * 4

      result[index] = redList[value]
      result[index + 1] = greenList[value]
      result[index + 2] = blueList[value]
      result[index + 3] = alphaList[value]
    }
  }

  return new ImageData(result, width, height)
}

export const toConsSmoothing = (image: ImageData) => {
  const { width, height, data } = image

  const result = new Uint8ClampedArray(data.length)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const redList: number[] = []
      const greenList: number[] = []
      const blueList: number[] = []
      const alphaList: number[] = []

      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const neighborX = x + dx
          const neighborY = y + dy

          const isTheOriginalPixel = dy === 2 && dx === 2

          if (
            neighborX >= 0 &&
            neighborX < width &&
            neighborY >= 0 &&
            neighborY < height &&
            !isTheOriginalPixel
          ) {
            const neighborIndex = (neighborY * width + neighborX) * 4

            redList.push(data[neighborIndex])
            greenList.push(data[neighborIndex + 1])
            blueList.push(data[neighborIndex + 2])
            alphaList.push(data[neighborIndex + 3])
          }
        }
      }

      redList.sort((a, b) => a - b)
      greenList.sort((a, b) => a - b)
      blueList.sort((a, b) => a - b)
      alphaList.sort((a, b) => a - b)

      const checkPixel = (i: number, list: number[]) => {
        if (data[i] > list[7]) return list[7]
        else if (data[i] < list[0]) return list[0]
        else return data[i]
      }

      const index = (y * width + x) * 4

      result[index] = checkPixel(index, redList)
      result[index + 1] = checkPixel(index, greenList)
      result[index + 2] = checkPixel(index, blueList)
      result[index + 3] = checkPixel(index, alphaList)
    }
  }

  return new ImageData(result, width, height)
}
