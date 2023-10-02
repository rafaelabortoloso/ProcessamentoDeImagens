import React from 'react'
import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import {
  toAvg,
  toMax,
  toMin,
} from '../../services/operationsWithOneImage'

interface EnhancementImages {
  image?: ImageData
  setResultImage: (value: ImageData) => void
}

const EnhancementImages = ({ image, setResultImage }: EnhancementImages) => {
  const handleMax = () => {
    if (image) {
      const result = toMax(image)
      setResultImage(result)
    }
  }

  const handleMin = () => {
    if (image) {
      const result = toMin(image)
      setResultImage(result)
    }
  }

  const handleAvg = () => {
    if (image) {
      const result = toAvg(image)
      setResultImage(result)
    }
  }

  return (
    <Card variant='outlined' sx={{ maxWidth: (theme) => theme.spacing(88) }}>
      <CardContent>
        <Typography variant='body1' color='primary.main' textAlign='center' width='250px'>
          Realce de Imagens
        </Typography>

        <Box
          display='flex'
          flexDirection='column'
          sx={{ gap: (theme) => theme.spacing(2), paddingTop: (theme) => theme.spacing(2) }}
        >
          <Button variant='outlined' fullWidth disabled={!image} onClick={handleMax}>
            Máximo
          </Button>
          <Button variant='outlined' fullWidth disabled={!image} onClick={handleMin}>
            Mínimo
          </Button>
          <Button variant='outlined' fullWidth disabled={!image} onClick={handleAvg}>
            Mediana
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default EnhancementImages
