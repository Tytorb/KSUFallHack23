import React, { useState } from "react";
import { TextField } from "@mui/material";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "./components/header";
import axios from "axios";
import "./components/sass/sidebar.scss";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const options = {
  method: "GET",
  url: "http://127.0.0.1:8000/item/?part_id=0",
};

function App() {
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  const [sidebar, setSidebar] = useState(false);

  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Header sidebar={sidebar} toggleSidebar={toggleSidebar} />{" "}
      {/* Pass the state and the function to toggle it as props */}
      <div className="App">
        <div className={`sidebar ${sidebar ? "active" : ""}`}></div>
        <div className="App-logo">
          <h1>Conatiner</h1>
          <div className="input">
            <TextField />
            <TextField />
            <TextField />
          </div>
          <h1>Load</h1>
          <div className="input2">
            <TextField />
            <TextField />
            <TextField />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
