import React, {useRef} from "react";
import GraphWrapper from "./components/graph/GraphWrapper";
import GraphMenu from "./components/graph/GraphMenu";
import Menu from "./components/graph/Menu";
import {InfoBox} from "./components/graph/InfoBox";

function App() {
    const graphRef = useRef();
  return (
      <div className="bg-white">
          <>
              <div className="flex flex-row justify-center items-center w-full h-screen relative z-10">
                  <GraphMenu graphRef={graphRef} />
                  <GraphWrapper  height={500}  width={500}/>;
                  <Menu />
                  <InfoBox />
              </div>
          </>
      </div>
  );
}

export default App;