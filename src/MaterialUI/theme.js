import { createTheme } from "@mui/material/styles";

const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: "#9c27b0",
    },
    secondary: {
      main: "#673ab7",
    },
  },
});

export default getTheme;