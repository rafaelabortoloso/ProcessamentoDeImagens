import React, { useEffect, useState } from 'react'
import { Box, Card, CardContent, IconButton, Modal, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface ResultImageModalProps {
  resultImage?: ImageData
  handleClose: () => void
}

const ResultImageModal: React.FC<ResultImageModalProps> = ({ resultImage, handleClose }) => {
  const [canvasReady, setCanvasReady] = useState(false)

  useEffect(() => {
    if (resultImage) {
      setCanvasReady(true)
    } else {
      setCanvasReady(false)
    }
  }, [resultImage])

  useEffect(() => {
    if (canvasReady && resultImage) {
      const canvas = document.createElement('canvas')
      canvas.width = resultImage.width
      canvas.height = resultImage.height

      const ctx = canvas.getContext('2d')

      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.putImageData(resultImage, 0, 0)
        const canvasContainer = document.getElementById('canvas-container')
        canvasContainer?.appendChild(canvas)
      }
    }
  }, [canvasReady, resultImage])

  return (
    <Modal open={!!resultImage} onClose={handleClose}>
      <Card
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: (theme) => theme.spacing(180),
          color: (theme) => theme.palette.primary.main,
        }}
      >
        <CardContent>
          <Box
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            alignItems='center'
          >
            <Typography variant='h6' component='h2'>
              Resultado da operação
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon sx={{ color: (theme) => theme.palette.primary.main }} />
            </IconButton>
          </Box>

          <Box
            id='canvas-container'
            display='flex'
            justifyContent='center'
            sx={{ padding: (theme) => theme.spacing(2) }}
          ></Box>
        </CardContent>
      </Card>
    </Modal>
  )
}

export default ResultImageModal
