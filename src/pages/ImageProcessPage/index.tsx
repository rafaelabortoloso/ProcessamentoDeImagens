import React, { useState } from 'react'
import { Box } from '@mui/material'

import ImageInput from '../../components/ImageInput'
import ProcessOneImage from '../../components/ProcessOneImage'
import ResultImageModal from '../../components/ResultImageModal'
import EnhancementImages from '../../components/EnhancementImages'
import AritmeticOpertions from '../../components/AritmeticOperations'
import LogicOperations from '../../components/LogicOperations'
import HistogramComponent from '../../components/Histogram'
import EqualizedHistogramComponent from '../../components/EqualizedHistogram'
import MorphologicalOperations from '../../components/MorphologicalOperations'

const ImageProcessPage = () => {
  const [firstImage, setFirstImage] = useState<ImageData | undefined>()
  const [secondImage, setSecondImage] = useState<ImageData | undefined>()
  const [resultImage, setResultImage] = useState<ImageData | undefined>()

  return (
    <Box>
      <Box display="flex" flexDirection="column" alignItems="center">

        <Box display="flex">
          <Box sx={{ padding: (theme) => theme.spacing(3) }}>
            <ProcessOneImage image={firstImage} setResultImage={setResultImage} />
          </Box>

          <Box sx={{ padding: (theme) => theme.spacing(3) }}>
            <ImageInput onChange={(val: ImageData) => setFirstImage(val)} />
          </Box>

          <Box sx={{ padding: (theme) => theme.spacing(3) }}>
            <ImageInput onChange={(val: ImageData) => setSecondImage(val)} />
          </Box>

          <Box sx={{ padding: (theme) => theme.spacing(3) }}>
            <ProcessOneImage image={secondImage} setResultImage={setResultImage} />
          </Box>
        </Box>

        <Box display='flex'>
          <Box sx={{ padding: (theme) => theme.spacing(3) }}>
            <AritmeticOpertions
              firstImage={firstImage}
              secondImage={secondImage}
              setResultImage={setResultImage}
            />
          </Box>

          <Box sx={{ padding: (theme) => theme.spacing(3) }}>
            <LogicOperations
              firstImage={firstImage}
              secondImage={secondImage}
              setResultImage={setResultImage}
            />
          </Box>

          <Box sx={{ padding: (theme) => theme.spacing(3) }}>
            <EnhancementImages image={firstImage} setResultImage={setResultImage} />
          </Box>
        </Box>

        <Box display='flex'>
          <Box sx={{ padding: (theme) => theme.spacing(3) }}>
            <HistogramComponent image={firstImage} />
          </Box>

          <Box sx={{ padding: (theme) => theme.spacing(3) }}>
            <EqualizedHistogramComponent image={firstImage} />
          </Box>
        </Box>

        <Box display='flex'>
          <Box sx={{ padding: (theme) => theme.spacing(3) }}>
            <MorphologicalOperations image={firstImage} setResultImage={setResultImage} />
          </Box>
        </Box>
      </Box>
      {
        resultImage && (
          <ResultImageModal
            resultImage={resultImage}
            handleClose={() => {
              setResultImage(undefined)
            }}
          />
        )
      }
    </Box >
  )
}

export default ImageProcessPage
