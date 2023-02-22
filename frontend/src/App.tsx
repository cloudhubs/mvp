import React, {useRef, useState} from "react";
import GraphWrapper from "./components/graph/GraphWrapper";
import GraphMenu from "./components/graph/GraphMenu";
import Menu from "./components/graph/Menu";
import {InfoBox} from "./components/graph/InfoBox";
import myData from './data/small_v1.json';
import GraphMode from "./components/graph/GraphMode";

function App() {
    const graphRef = useRef();
    const [search, setSearch] = useState("");
    const [value, setValue] = useState(8);
    const [initCoords, setInitCoords] = useState(null);
    const [initRotation, setInitRotation] = useState(null);
    const [graphData, setGraphData] = useState(myData);
    const [highCoupling, setHighCoupling] = useState(false);
    const [is3d, setIs3d] = useState(true);
    const [antiPattern, setAntiPattern] = useState(false);
  return (
      <div className="bg-white">
          <>
              <div className="flex flex-row justify-center items-center w-full h-screen relative z-10">
                  <GraphMode value={value} setValue={setValue} highCoupling={highCoupling} setHighCoupling={setHighCoupling} antiPattern={antiPattern} setAntiPattern={setAntiPattern}/>
                  <GraphMenu graphRef={graphRef} search={search} setSearch={setSearch} value={value} setValue={setValue} graphData={graphData} setGraphData={setGraphData} initCoords={initCoords} initRotation={initRotation} highCoupling={highCoupling} setHighCoupling={setHighCoupling} is3d={is3d} setIs3d={setIs3d}/>
                  <GraphWrapper  height={735}  width={1710} search={search} threshold={value} graphRef={graphRef} graphData={graphData} setInitCoords={setInitCoords} setInitRotation={setInitRotation} highCoupling={highCoupling} is3d={is3d} antiPattern={antiPattern}/>;
                  <Menu />
                  <InfoBox />
              </div>
          </>
      </div>
  );
}

export default App;