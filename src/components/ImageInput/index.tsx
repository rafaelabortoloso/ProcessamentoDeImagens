import React, { SyntheticEvent, useRef } from 'react'
import { Button, Card, CardContent, Typography } from '@mui/material'
import { drawImage } from '../../services/image'

interface ImageInputProps {
  onChange: (val: ImageData) => void
}

const ImageInput = ({ onChange }: ImageInputProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleFileChange = (event: SyntheticEvent) => {
    const imageFile = (event.target as HTMLInputElement).files?.item(0) as File
    const context = canvasRef.current?.getContext('2d')

    const image = new Image()
    image.src = URL.createObjectURL(imageFile)

    image.onload = () => {
      canvasRef.current?.setAttribute('width', '250')
      canvasRef.current?.setAttribute('height', '285')

      drawImage(context, image, 0, 0, canvasRef.current?.width || 0, canvasRef.current?.height || 0)
      const imageData = context?.getImageData(
        0,
        0,
        canvasRef.current?.width || 0,
        canvasRef.current?.height || 0,
      )

      onChange(imageData as ImageData)
    }

    context?.clearRect(0, 0, 265, 285)
  }

  return (
    <Card
      variant='outlined'
      sx={{
        maxHeight: (theme) => theme.spacing(124),
        maxWidth: (theme) => theme.spacing(88),
        marginBottom: (theme) => theme.spacing(4),
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: (theme) => theme.spacing(4),
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant='body1' color='primary.main'>
          Insira uma Imagem
        </Typography>
        <canvas
          ref={canvasRef}
          width='250'
          height='280'
          style={{ border: '1px solid #393333', borderRadius: '4px' }}
        />
        <input ref={inputRef} type='file' onChange={handleFileChange} style={{ display: 'none' }} />
        <Button
          variant='outlined'
          onClick={() => inputRef.current?.click()}
          fullWidth
          sx={{ margin: 'auto' }}
        >
          Inserir
        </Button>
      </CardContent>
    </Card>
  )
}

export default ImageInput
