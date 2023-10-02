import React from 'react'
import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import {
  toBinaryScale,
  toGrayScale,
  toNegativeScale,
} from '../../services/operationsWithOneImage'

interface ProcessOneImageProps {
  image?: ImageData
  setResultImage: (value: ImageData) => void
}

const ProcessOneImage = ({ image, setResultImage }: ProcessOneImageProps) => {
  const handleGrayScale = () => {
    if (image) {
      const result = toGrayScale(image)
      setResultImage(result)
    }
  }

  const handleBinaryScale = () => {
    if (image) {
      const result = toBinaryScale(image)
      setResultImage(result)
    }
  }

  const handleNegativeScale = () => {
    if (image) {
      const result = toNegativeScale(image)
      setResultImage(result)
    }
  }

  return (
    <Card variant='outlined' sx={{ maxWidth: (theme) => theme.spacing(88) }}>
      <CardContent>
        <Typography variant='body1' color='primary.main' textAlign='center'>
          Operações dessa imagem
        </Typography>

        <Box
          display='flex'
          flexDirection='column'
          sx={{ gap: (theme) => theme.spacing(2), paddingTop: (theme) => theme.spacing(2) }}
        >
          <Button variant='outlined' fullWidth disabled={!image} onClick={handleGrayScale}>
            Escala Cinza (RGB 1BIT)
          </Button>
          <Button variant='outlined' fullWidth disabled={!image} onClick={handleBinaryScale}>
            Escala Binária (RGB 8BITS)
          </Button>
          <Button variant='outlined' fullWidth disabled={!image} onClick={handleNegativeScale}>
            Escala Negativa
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default ProcessOneImage
