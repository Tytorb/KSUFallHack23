import React, { useState, useRef, useEffect } from "react";
import { TextField } from "@mui/material";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "./components/header";
import axios from "axios";
import "./components/sass/sidebar.scss";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Button } from "@mui/material";

// @ts-ignore
function Box(props) {
  const ref = useRef();

  const [hovered, hover] = useState(false);

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

function App() {
  const [containerData, setContainerData] = useState({
    name: "string",
    width: 0,
    height: 0,
    depth: 0,
    max_weight: 0,
  });

  const [itemsData, setItemsData] = useState([
    {
      name: "string",
      width: 0,
      height: 0,
      depth: 0,
      weight: 0,
    },
  ]);
  const [textField1, setTextField1] = useState("");
  const [textField2, setTextField2] = useState("");
  const [textField3, setTextField3] = useState("");
  const [textField4, setTextField4] = useState("");
  const [textField5, setTextField5] = useState("");
  const [textField6, setTextField6] = useState("");
  const [textField7, setTextField7] = useState("");
  const [textField8, setTextField8] = useState("");

  useEffect(() => {
    console.log(textField1);
  });

  var returnd = {
    container_data: {
      name: textField1,
      width: textField2,
      height: textField3,
      depth: textField4,
      max_weight: textField5,
    },
    items_data: [
      {
        name: "string",
        width: 0,
        height: 0,
        depth: 0,
        weight: 0,
      },
    ],
  };

  const options = {
    method: "POST",
    url: "http://127.0.0.1:8000/test/",
    data: returnd,
  };

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

  const addMoreItem = () => {
    setItemsData([
      ...itemsData,
      { name: "string", width: 0, height: 0, depth: 0, weight: 0 },
    ]);
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
            <TextField
              value={textField1}
              onChange={(e) => setTextField1(e.target.value)}
            />
            <TextField
              value={textField2}
              onChange={(e) => setTextField2(e.target.value)}
            />
            <TextField
              value={textField3}
              onChange={(e) => setTextField3(e.target.value)}
            />
            <TextField
              value={textField4}
              onChange={(e) => setTextField4(e.target.value)}
            />
            <TextField
              value={textField5}
              onChange={(e) => setTextField5(e.target.value)}
            />
          </div>
          <h1>Load</h1>
          <div className="input2">
            {itemsData.map((item, index) => (
              <div key={index} className="item-container">
                <TextField
                  label="Name"
                  value={item.name}
                  onChange={(e) => {
                    const updatedItems = [...itemsData];
                    updatedItems[index] = { ...item, name: e.target.value };
                    setItemsData(updatedItems);
                  }}
                />
                <TextField
                  label="Width"
                  type="number"
                  value={item.width}
                  onChange={(e) => {
                    const updatedItems = [...itemsData];
                    updatedItems[index] = {
                      ...item,
                      width: parseFloat(e.target.value),
                    };
                    setItemsData(updatedItems);
                  }}
                />
              </div>
            ))}
            <div style={{ width: "100%", right: "100%", paddingTop: "1%" }}>
              <Button onClick={addMoreItem} variant="outlined">
                Add Item
              </Button>
            </div>
          </div>
        </div>

        <div className="render">
          <Canvas>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <Box position={[0, 0, 0]} />
            <Boxfill position={[(9 - 3) / 2, (9 - 3) / 2, (9 - 3) / 2]} />
            <Boxfill position={[6, 9, 6]} />
            <Boxfill position={[6, 6, 9]} />
            <OrbitControls autoRotate={false} target={[0, 0, 0]} />
          </Canvas>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
