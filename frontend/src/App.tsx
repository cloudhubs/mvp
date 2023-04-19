import React, { useEffect, useRef, useState } from "react";
import GraphWrapper from "./components/graph/GraphWrapper";
import GraphMenu from "./components/graph/GraphMenu";
import Menu from "./components/graph/Menu";
import { InfoBox } from "./components/graph/InfoBox";
import myData from "./data/mock5.json";
import GraphMode from "./components/graph/GraphMode";
import TimeSlider from "./components/graph/TimeSlider";
import ColorSelector from "./components/graph/ColorSelector";
import { setupAxios, setupLogger } from "./utils/axiosSetup";
import axios from "axios";

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
    const [max, setMax] = useState(6);
    const [color, setColor] = useState("neighbor");
    const ref = useRef<HTMLDivElement>(null);
    const [isDark, setIsDark] = useState(false);
    const [graphName, setGraphName] = useState("traintickettest1");
    const [graphTimeline, setGraphTimeline] = useState<any[] | null>(null);
    const [currentInstance, setCurrentInstance] = useState<number>();

    setupLogger();
    setupAxios();

    useEffect(() => {
        const getGraphLifespan = async () => {
            const graphLifespan = await axios.get(`/graph/${graphName}`);
            setGraphTimeline(graphLifespan.data);
            setGraphData(graphLifespan.data[0] ?? null);
            setCurrentInstance(0);
        };

        getGraphLifespan();
    }, [graphName]);

    if (typeof currentInstance == "undefined" || !graphTimeline) {
        // Ideally just return a prompt to upload a file or use some default file
        return null;
    }

    return (
        <div
            className={`max-w-full min-h-screen max-h-screen overflow-clip ${
                isDark ? `bg-gray-900` : `bg-white`
            }`}
            ref={ref}
        >
            <GraphMode
                value={value}
                setValue={setValue}
                highCoupling={highCoupling}
                setHighCoupling={setHighCoupling}
                antiPattern={antiPattern}
                setAntiPattern={setAntiPattern}
            />
            <GraphMenu
                graphRef={graphRef}
                search={search}
                setSearch={setSearch}
                value={value}
                setValue={setValue}
                graphData={graphData}
                setGraphData={setGraphData}
                initCoords={initCoords}
                initRotation={initRotation}
                highCoupling={highCoupling}
                setHighCoupling={setHighCoupling}
                is3d={is3d}
                setIs3d={setIs3d}
                isDark={isDark}
                setIsDark={setIsDark}
            />
            <GraphWrapper
                height={ref?.current?.clientHeight ?? 735}
                width={ref?.current?.clientWidth ?? 1710}
                search={search}
                threshold={value}
                graphRef={graphRef}
                graphData={graphData}
                setInitCoords={setInitCoords}
                setInitRotation={setInitRotation}
                highCoupling={highCoupling}
                is3d={is3d}
                antiPattern={antiPattern}
                colorMode={color}
            />
            <Menu />
            <InfoBox />
            <ColorSelector
                value={value}
                setValue={setValue}
                color={color}
                setColor={setColor}
            />
            <div className="flex flex-row items-center justify-center w-full">
                <TimeSlider
                    max={max}
                    setGraphData={setGraphData}
                    graphTimeline={graphTimeline}
                    currentInstance={currentInstance}
                    setCurrentInstance={setCurrentInstance}
                />
            </div>
        </div>
    );
}

export default App;
