import React from 'react'
import { Card, CardContent, Typography, Box, Button } from '@mui/material'
import {
  toAnd,
  toNot,
  toOr,
  toXor,
} from '../../services/operationsWithTwoImages'

interface LogicOperations {
  firstImage?: ImageData
  secondImage?: ImageData
  setResultImage: (value: ImageData) => void
}

const LogicOperations = ({ firstImage, secondImage, setResultImage }: LogicOperations) => {

  const handleAnd = () => {
    if (firstImage && secondImage) {
      const result = toAnd(firstImage, secondImage)
      setResultImage(result)
    }
  }

  const handleOr = () => {
    if (firstImage && secondImage) {
      const result = toOr(firstImage, secondImage)
      setResultImage(result)
    }
  }

  const handleXor = () => {
    if (firstImage && secondImage) {
      const result = toXor(firstImage, secondImage)
      setResultImage(result)
    }
  }

  const handleNot = () => {
    if (firstImage) {
      const result = toNot(firstImage)
      setResultImage(result)
    }
  }

  return (
    <Card variant='outlined'>
      <CardContent>
        <Typography variant='body1' color='primary.main' textAlign='center' width='250px'>
          Operações Lógicas
        </Typography>

        <Box
          display='flex'
          flexDirection='column'
          sx={{ gap: (theme) => theme.spacing(2), paddingTop: (theme) => theme.spacing(2) }}
        >
          <Button
            variant='outlined'
            fullWidth
            disabled={!firstImage || !secondImage}
            onClick={handleAnd}
          >
            And
          </Button>
          <Button
            variant='outlined'
            fullWidth
            disabled={!firstImage || !secondImage}
            onClick={handleOr}
          >
            Or
          </Button>
          <Button
            variant='outlined'
            fullWidth
            disabled={!firstImage || !secondImage}
            onClick={handleXor}
          >
            Xor
          </Button>
          <Button
            variant='outlined'
            fullWidth
            disabled={!firstImage}
            onClick={handleNot}
          >
            Not
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default LogicOperations
