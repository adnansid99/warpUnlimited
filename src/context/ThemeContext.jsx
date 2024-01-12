/* eslint-disable react/prop-types */
import { createTheme, useMediaQuery } from "@mui/material";
import { createContext } from "react";

import { ThemeProvider as CustomThemeProvider } from "@mui/material";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const breakpoints = {
    sm: useMediaQuery("(max-width:560px)"),
    md: useMediaQuery("(max-width:720px)"),
    xl: useMediaQuery("(max-width:1250px)"),
  };

  const themeColors = {
    textColor: "#fff",
    textColor2: "#99999f",
    textColor3: "#219ebc",
    hoverTextColor: "#66B2FF",
    hoverTextColor2: "#00509f1f",
    bgColor: "#0E151D",
    navBgColor: "#101820b3",
    buttonColor: "#219ebc",
    buttonTextColor: "#fff",
    borderRadius: 5,
    name: "dark",
  };

  const customTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#8ecae6",
        contrastText: "#fff",
      },
      secondary: {
        main: "#fb8500",
      },
      tertiary: {
        main: "#FF0000",
      },
      error: {
        main: "#D63649",
      },
      background: {
        main: "#fff",
      },
      success: {
        main: "#33AC2E",
      },
      info: {
        main: "#219ebc",
      },
    },
    spacing: 1,
    shape: {
      borderRadius: 1,
    },
    typography: {
      color: "#fff",
    },
  });
  const theme = themeColors;

  const wareHouse = {
    theme,
    bp: breakpoints,
  };
  return (
    <CustomThemeProvider theme={customTheme}>
      <ThemeContext.Provider value={wareHouse}>
        {children}
      </ThemeContext.Provider>
    </CustomThemeProvider>
  );
};

export { ThemeContext, ThemeProvider };
