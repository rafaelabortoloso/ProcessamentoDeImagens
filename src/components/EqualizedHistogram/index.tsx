import React, { useEffect, useState } from 'react';
import { generateHistogram, equalizeHistogram } from '../../services/histogram';
import { Chart } from 'chart.js/auto';
import { Button } from '@mui/material';

interface EqualizedHistogramProps {
    image?: ImageData;
}

const EqualizedHistogramComponent: React.FC<EqualizedHistogramProps> = ({ image }) => {
    const [equalizedHistogram, setEqualizedHistogram] = useState<number[] | null>(null);

    useEffect(() => {
        if (image) {
            const histogram = generateHistogram(image);
            const equalized = equalizeHistogram(histogram);
            setEqualizedHistogram(equalized);
        }
    }, [image]);

    const handleEqualizeHistogram = () => {
        const canvas = document.getElementById('equalized-histogram-chart') as HTMLCanvasElement | null;
        if (canvas && equalizedHistogram) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: Array.from({ length: 256 }, (_, i) => i.toString()),
                        datasets: [
                            {
                                label: 'Histograma Equalizado',
                                data: equalizedHistogram,
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        scales: {
                            x: {
                                beginAtZero: true,
                            },
                            y: {
                                beginAtZero: true,
                            },
                        },
                    },
                });
            }
        }
    };

    return (
        <div>
            <Button variant='outlined' fullWidth disabled={!image} onClick={handleEqualizeHistogram}>Equalizar Histograma</Button>
            <div>
                <canvas id="equalized-histogram-chart" width='500px'></canvas>
            </div>
        </div>
    );
};

export default EqualizedHistogramComponent;