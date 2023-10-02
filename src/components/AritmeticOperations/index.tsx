import React, { useState } from 'react'
import { Card, CardContent, Typography, Box, Button, TextField } from '@mui/material'
import {
    addPixelValue,
    subtractPixelValue,
    toAdd,
    toBlend,
    toDivide,
    toMultiply,
    toSubtract,
} from '../../services/operationsWithTwoImages'

interface AritmeticOpertions {
    firstImage?: ImageData
    secondImage?: ImageData
    setResultImage: (value: ImageData) => void
}

const AritmeticOpertions = ({ firstImage, secondImage, setResultImage }: AritmeticOpertions) => {
    const [blendingValue, setBlendingValue] = useState<number>(0)
    const [pixelValue, setPixelValue] = useState<number>(0)

    const handleAdd = () => {
        if (firstImage && (secondImage || pixelValue)) {
            let result: ImageData;

            if (pixelValue && secondImage) {
                result = addPixelValue(firstImage, pixelValue);
            } else if (secondImage) {
                result = toAdd(firstImage, secondImage);
            } else {
                result = addPixelValue(firstImage, pixelValue);
            }
            setResultImage(result);
        }
    }

    const handleSubtract = () => {
        if (firstImage && (secondImage || pixelValue)) {
            let result: ImageData;

            if (pixelValue && secondImage) {
                result = subtractPixelValue(firstImage, pixelValue);
            } else if (secondImage) {
                result = toSubtract(firstImage, secondImage);
            } else {
                result = subtractPixelValue(firstImage, pixelValue);
            }
            setResultImage(result);
        }
    }

    const handleMultiply = () => {
        if (firstImage && secondImage) {
            const result = toMultiply(firstImage, secondImage)
            setResultImage(result)
        }
    }

    const handleDivide = () => {
        if (firstImage && secondImage) {
            const result = toDivide(firstImage, secondImage)
            setResultImage(result)
        }
    }

    const handleBlending = () => {
        if (firstImage && secondImage && blendingValue) {
            const result = toBlend(firstImage, secondImage, blendingValue)
            setResultImage(result)
        }
    }

    return (
        <Card variant='outlined'>
            <CardContent>
                <Typography variant='body1' color='primary.main' textAlign='center' width='250px'>
                    Operações Aritméticas
                </Typography>

                <Box
                    display='flex'
                    flexDirection='column'
                    sx={{ gap: (theme) => theme.spacing(2), paddingTop: (theme) => theme.spacing(2) }}
                >
                    <Button
                        variant='outlined'
                        fullWidth
                        disabled={(!firstImage || !secondImage) && !pixelValue}
                        onClick={handleAdd}
                    >
                        Adição
                    </Button>
                    <Button
                        variant='outlined'
                        fullWidth
                        disabled={(!firstImage || !secondImage) && !pixelValue}
                        onClick={handleSubtract}
                    >
                        Subtração
                    </Button>
                    <TextField
                        type='number'
                        label='Valor de Pixel'
                        variant='outlined'
                        fullWidth
                        value={pixelValue}
                        onChange={(e) => setPixelValue(Number(e.target.value))}
                    />
                    <Button
                        variant='outlined'
                        fullWidth
                        disabled={!firstImage || !secondImage}
                        onClick={handleMultiply}
                    >
                        Multiplicação
                    </Button>
                    <Button
                        variant='outlined'
                        fullWidth
                        disabled={!firstImage || !secondImage}
                        onClick={handleDivide}
                    >
                        Divisão
                    </Button>
                    <Button
                        variant='outlined'
                        fullWidth
                        disabled={!firstImage || !secondImage || !blendingValue}
                        onClick={handleBlending}
                    >
                        Blending
                    </Button>
                    <TextField
                        type='number'
                        label='Valor de Blending'
                        variant='outlined'
                        fullWidth
                        disabled={!firstImage || !secondImage}
                        value={blendingValue}
                        onChange={(e) => setBlendingValue(Number(e.target.value))}
                    />
                </Box>
            </CardContent>
        </Card>
    )
}

export default AritmeticOpertions
