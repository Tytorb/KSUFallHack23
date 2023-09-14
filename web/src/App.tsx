import { TextField } from "@mui/material";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "./components/header";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Header />
      <div className="App">
        <div className="input">
          <TextField />

          <TextField />

          <TextField />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
