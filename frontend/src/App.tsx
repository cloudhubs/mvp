import React, {useRef, useState} from "react";
import GraphWrapper from "./components/graph/GraphWrapper";
import GraphMenu from "./components/graph/GraphMenu";
import Menu from "./components/graph/Menu";
import {InfoBox} from "./components/graph/InfoBox";

function App() {
    const graphRef = useRef();
    const [search, setSearch] = useState("");
    const [value, setValue] = useState(8);
  return (
      <div className="bg-white">
          <>
              <div className="flex flex-row justify-center items-center w-full h-screen relative z-10">
                  <GraphMenu graphRef={graphRef} search={search} setSearch={setSearch} value={value} setValue={setValue} />
                  <GraphWrapper  height={735}  width={1710} search={search} threshold={value}/>;
                  <Menu />
                  <InfoBox />
              </div>
          </>
      </div>
  );
}

export default App;