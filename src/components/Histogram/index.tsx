import React from 'react';
import { generateHistogram } from '../../services/histogram';
import { Chart } from 'chart.js/auto';
import { Button } from '@mui/material';

interface HistogramProps {
    image?: ImageData;
}

const HistogramComponent: React.FC<HistogramProps> = ({ image }) => {
    const handleGenerateHistogram = () => {
        if (image) {
            const histogram = generateHistogram(image);

            const canvas = document.getElementById('histogram-chart') as HTMLCanvasElement | null;
            if (canvas) {
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: Array.from({ length: 256 }, (_, i) => i.toString()),
                            datasets: [
                                {
                                    label: 'Histograma da Imagem Original (A)',
                                    data: histogram,
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
        }
    };

    return (
        <div>
            <Button variant='outlined' fullWidth disabled={!image} onClick={handleGenerateHistogram}>Gerar Histograma</Button>
            <div>
                <canvas id="histogram-chart" width='500px'></canvas>
            </div>
        </div>
    );
};

export default HistogramComponent;
