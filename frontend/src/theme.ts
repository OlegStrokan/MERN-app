import { createTheme } from '@mui/material';
import { grey, blue } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: blue[700],
    },
    secondary: {
      main: grey[200],
    },
  },
});
