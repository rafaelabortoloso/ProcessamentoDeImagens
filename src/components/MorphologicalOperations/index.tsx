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
import { dilation, erosion } from '../../services/operationsWithOneImage'

interface MorphologicalOperationsType {
    image?: ImageData
    setResultImage: (value: ImageData) => void
}

const MorphologicalOperations = ({ image, setResultImage }: MorphologicalOperationsType) => {

    const handleDilation = () => {
        if (image) {
            const result = dilation(image);
            setResultImage(result);
        }
    }

    const handleErosion = () => {
        if (image) {
            const result = erosion(image);
            setResultImage(result);
        }
    }

    return (
        <Card variant='outlined'>
            <CardContent>
                <Typography variant='body1' color='primary.main' textAlign='center' width='250px'>
                    Operações Morfológicas
                </Typography>

                <Box
                    display='flex'
                    flexDirection='column'
                    sx={{ gap: (theme) => theme.spacing(2), paddingTop: (theme) => theme.spacing(2) }}
                >
                    <Button
                        variant='outlined'
                        fullWidth
                        disabled={!image}
                        onClick={handleDilation}
                    >
                        Dilatação
                    </Button>
                    <Button
                        variant='outlined'
                        fullWidth
                        disabled={!image}
                        onClick={handleErosion}
                    >
                        Erosão
                    </Button>
                </Box>
            </CardContent>
        </Card>
    )
}

export default MorphologicalOperations
