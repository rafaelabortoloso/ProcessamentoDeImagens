export const generateHistogram = (imageData: ImageData): number[] => {
    const pixels = imageData.data;
    const histogram = new Array(256).fill(0);

    for (let i = 0; i < pixels.length; i += 4) {
        const grayValue = Math.round((pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3);
        histogram[grayValue]++;
    }

    return histogram;
};

export const equalizeHistogram = (histogram: number[]): number[] => {
    const totalPixels = histogram.reduce((acc, value) => acc + value, 0);
    const cumulativeHistogram: number[] = [];
    let cumulativeSum = 0;

    for (let i = 0; i < histogram.length; i++) {
        cumulativeSum += histogram[i];
        cumulativeHistogram[i] = cumulativeSum / totalPixels;
    }

    const equalizedHistogram = cumulativeHistogram.map((cumulativeValue) => Math.round(cumulativeValue * 255));

    return equalizedHistogram;
};

export const equalizeImage = (imageData: ImageData, equalizedHistogram: number[]): ImageData => {
    const equalizedImageData = new ImageData(imageData.width, imageData.height);
    const pixels = imageData.data;
    const equalizedPixels = equalizedImageData.data;

    for (let i = 0; i < pixels.length; i += 4) {
        const grayValue = Math.round((pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3);
        const equalizedValue = equalizedHistogram[grayValue];

        equalizedPixels[i] = equalizedValue;
        equalizedPixels[i + 1] = equalizedValue;
        equalizedPixels[i + 2] = equalizedValue;
        equalizedPixels[i + 3] = 255;
    }

    return equalizedImageData;
};


