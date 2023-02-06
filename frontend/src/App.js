import { ForceGraph3D} from 'react-force-graph';
import * as THREE from "three";
import SpriteText from 'three-spritetext';
import React, { useRef, useCallback, useState } from "react";
import {getNeighbors, getColor, getNodeOpacity} from "./GraphFunctions";
import GraphMenu from "./components/graph/GraphMenu";
import Graph from "./components/graph/Graph";
import {InfoBox} from "./components/graph/InfoBox";
import Menu from "./components/graph/Menu";

function App() {
    const graphRef = useRef();
  return (
      <div className="bg-white">
          <>
              <div className="flex flex-row justify-center items-center w-full h-screen relative z-10">
                  <GraphMenu graphRef={graphRef} />
                  <Graph graphRef={graphRef} />
                  <Menu />
                  <InfoBox />
              </div>
          </>
      </div>
  );
}

export default App;