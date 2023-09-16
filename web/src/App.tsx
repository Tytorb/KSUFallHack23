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

  return (
    <mesh
      {...props}
      ref={ref}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => (event.stopPropagation(), hover(true))}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"hotpink"} wireframe={true} />
    </mesh>
  );
}

// @ts-ignore

function Boxfill2(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  // @ts-ignore

  return (
    <mesh
      {...props}
      ref={ref}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => (event.stopPropagation(), hover(true))}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"green"} wireframe={true} />
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

  const [sumbited, setSubmitted] = useState(false);

  const [preset, setPreset] = useState(false);

  const [fullData, setFullData] = useState();

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

  var returnd = {
    container_data: {
      name: textField1,
      width: textField2,
      height: textField3,
      depth: textField4,
      max_weight: textField5,
    },
    items_data: itemsData,
  };

  const options = {
    method: "POST",
    url: "http://127.0.0.1:8000/test/",
    data: returnd,
  };

  axios
    .request(options)
    .then(function (response) {
      setFullData(response.data);
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
        <div className={`sidebar ${sidebar ? "active" : ""}`}>
          <Button
            onClick={() => {
              setPreset(!preset);
            }}
          >
            pallet
          </Button>
        </div>
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
                <TextField
                  label="Height"
                  type="number"
                  value={item.height}
                  onChange={(e) => {
                    const updatedItems = [...itemsData];
                    updatedItems[index] = {
                      ...item,
                      height: parseFloat(e.target.value),
                    };
                    setItemsData(updatedItems);
                  }}
                />
                <TextField
                  label="Depth"
                  type="number"
                  value={item.depth}
                  onChange={(e) => {
                    const updatedItems = [...itemsData];
                    updatedItems[index] = {
                      ...item,
                      depth: parseFloat(e.target.value),
                    };
                    setItemsData(updatedItems);
                  }}
                />
                <TextField
                  label="Max Weight"
                  type="number"
                  value={item.weight}
                  onChange={(e) => {
                    const updatedItems = [...itemsData];
                    updatedItems[index] = {
                      ...item,
                      weight: parseFloat(e.target.value),
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
            <div style={{ width: "100%", right: "100%", paddingTop: "1%" }}>
              <Button
                onClick={() => {
                  setSubmitted(!sumbited);
                }}
                variant="outlined"
              >
                Submit
              </Button>
            </div>
            {sumbited && (
              <>
                Fitted: {fullData.bins[0].fitted_items.length} Unfitted:{" "}
                {fullData.bins[0].unfitted_items.length}
              </>
            )}
          </div>
        </div>

        <div className="render">
          <Canvas>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            {preset && (
              <>
                <Box position={[0, 0, 0]} scale={3} />
                <Boxfill position={[-1, -1, -1]} scale={1} />
                <Boxfill2
                  position={[-1.5 + 0.5 / 2, -1.5 + 0.5 / 2, -1.5 / 2]}
                  scale={0.5}
                />
                <Boxfill position={[-1, 0, -1]} scale={1} />
                <Boxfill2 position={[-1, -1.5 + 2.5 / 2, -1]} scale={0.5} />
                {/* @ts-ignore */}
                {/* {fullData.bins[0].fitted_items.map((item, index) => (
                  <Boxfill
                    key={index}
                    position={[
                      -(
                        fullData?.bins[0].width -
                        item.width -
                        item.pos[0] * 2
                      ) / 2,
                      -(
                        fullData?.bins[0].height -
                        item.height -
                        item.pos[1] * 2
                      ) / 2,
                      -(
                        fullData?.bins[0].depth -
                        item.depth -
                        item.pos[2] * 2
                      ) / 2,
                    ]}
                    scale={[item.width, item.height, item.depth]}
                  />
                ))} */}
              </>
            )}
            {sumbited && (
              <>
                <Box
                  position={[0, 0, 0]}
                  scale={[
                    fullData?.bins[0].width,
                    fullData?.bins[0].height,
                    fullData?.bins[0].depth,
                  ]}
                />
                {/* @ts-ignore */}
                {fullData.bins[0].fitted_items.map((item, index) => (
                  <Boxfill
                    key={index}
                    position={[
                      -(
                        fullData?.bins[0].width -
                        item.width -
                        item.pos[0] * 2
                      ) / 2,
                      -(
                        fullData?.bins[0].height -
                        item.height -
                        item.pos[1] * 2
                      ) / 2,
                      -(
                        fullData?.bins[0].depth -
                        item.depth -
                        item.pos[2] * 2
                      ) / 2,
                    ]}
                    scale={[item.width, item.height, item.depth]}
                  />
                ))}
              </>
            )}

            {/* <Boxfill position={[(9 - 3) / 2, (9 - 3) / 2, (9 - 3) / 2]} /> */}

            <OrbitControls autoRotate={false} target={[0, 0, 0]} />
          </Canvas>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
