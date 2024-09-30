import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"
import "./reset.css";

import "./asset/fonts/font.css";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "UberMove",
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
          <App />
      </ThemeProvider>
  </React.StrictMode>,
);
