import { Theme } from '@mui/material'
import { pink, indigo } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

const customTheme: Theme = createTheme({
  palette: {
    mode: 'dark',
    primary: indigo,
    secondary: pink,
  },
  spacing: (factor: number) => `${0.25 * factor}rem`,
})

export default customTheme
