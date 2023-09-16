import React, { useState, useRef } from "react";
import { TextField } from "@mui/material";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "./components/header";
import axios from "axios";
import "./components/sass/sidebar.scss";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

// @ts-ignore
function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  // @ts-ignore

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={9}
      onPointerOver={(event) => (event.stopPropagation(), hover(true))}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"orange"} wireframe={true} />
    </mesh>
  );
}

// @ts-ignore
function Boxfill(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  // @ts-ignore

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={3}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => (event.stopPropagation(), hover(true))}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"hotpink"} wireframe={true} />
    </mesh>
  );
}

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

        <div className="render">
          <Canvas>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <Box position={[9, 9, 9]} />
            <Boxfill position={[9, 6, 6]} />
            <Boxfill position={[6, 9, 6]} />
            <Boxfill position={[6, 6, 9]} />
            <OrbitControls autoRotate={false} target={[9, 9, 9]} />
          </Canvas>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
