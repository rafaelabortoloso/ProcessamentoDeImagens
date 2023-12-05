import React, { useState } from 'react'
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material'
import {
  toAvg,
  toGaussianElimination,
  toMax,
  toMedian,
  toMin,
  toOrder,
} from '../../services/operationsWithOneImage'

interface EnhancementImages {
  image?: ImageData
  setResultImage: (value: ImageData) => void
}

const EnhancementImages = ({ image, setResultImage }: EnhancementImages) => {
  const [desvioPadrao, setDesvioPadrao] = useState<number>(0)
  const [orderValue, setOrderValue] = useState<number>(0)
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

  const handleMediana = () => {
    if (image) {
      const result = toMedian(image);
      setResultImage(result);
    }
  }

  const handleOrder = () => {
    if (image && orderValue) {
      const result = toOrder(image, orderValue);
      setResultImage(result);
    }
  }

  const handleGaussian = () => {
    if (image && desvioPadrao) {
      const result = toGaussianElimination(image, desvioPadrao);
      setResultImage(result);
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
            Média
          </Button>
          <Button variant='outlined' fullWidth disabled={!image} onClick={handleMediana}>
            Mediana
          </Button>
          <Button variant='outlined' fullWidth disabled={!image || !orderValue} onClick={handleOrder}>
            Ordem
          </Button>
          <TextField
            type='number'
            label='Valor de Ordem'
            variant='outlined'
            fullWidth
            disabled={!image}
            value={orderValue}
            onChange={(e) => setOrderValue(Number(e.target.value))}
          />
          <Button variant='outlined' fullWidth disabled={!image || !desvioPadrao} onClick={handleGaussian}>
            Gaussiano
          </Button>
          <TextField
            type='number'
            label='Desvio Padrão'
            variant='outlined'
            fullWidth
            disabled={!image}
            value={desvioPadrao}
            onChange={(e) => setDesvioPadrao(Number(e.target.value))}
          />
        </Box>
      </CardContent>
    </Card>
  )
}

export default EnhancementImages
