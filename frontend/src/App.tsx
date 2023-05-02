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
    const [selectedAntiPattern, setSelectedAntiPattern] = useState("none");
    const [max, setMax] = useState(6);
    const [color, setColor] = useState("dark-default");
    const ref = useRef<HTMLDivElement>(null);
    const [isDark, setIsDark] = useState(true);
    const [graphName, setGraphName] = useState("traintickettest1");
    const [graphTimeline, setGraphTimeline] = useState<any[] | null>(null);
    const [currentInstance, setCurrentInstance] = useState<number>();
    const [defNodeColor, setDefNodeColor] = useState(false);
    const [trackNodes, setTrackNodes] = useState([]);

    setupLogger();
    setupAxios();

    useEffect(() => {
        const getGraphLifespan = async () => {
            const graphLifespan = await axios.get(`/graph/${graphName}`);
            console.log(graphLifespan.data);
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
            {/* Upper left mode toggle */}
            <GraphMode
                value={value}
                setValue={setValue}
                highCoupling={highCoupling}
                setHighCoupling={setHighCoupling}
                antiPattern={antiPattern}
                setAntiPattern={setAntiPattern}
                selectedAntiPattern={selectedAntiPattern}
                setSelectedAntiPattern={setSelectedAntiPattern}
                graphData={graphData}
                currentInstance={currentInstance}
                graphTimeline={graphTimeline}
            />
            {/* Graph Menu on upper right with buttons */}
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
                antiPattern={antiPattern}
                selectedAntiPattern={selectedAntiPattern}
            />
            {/* Graph object itself, contained within a wrapper to toggle 2d-3d */}
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
                defNodeColor={defNodeColor}
                setDefNodeColor={setDefNodeColor}
                setGraphData={setGraphData}
                isDarkMode={isDark}
                selectedAntiPattern={selectedAntiPattern}
                trackNodes={trackNodes}
            />
            <Menu trackNodes={trackNodes} setTrackNodes={setTrackNodes} />

            {/* left click node pop up box */}
            <InfoBox />
            {/* Bottom left "color by" box */}
            {!antiPattern ? (
                <ColorSelector
                    value={value}
                    setValue={setValue}
                    color={color}
                    setColor={setColor}
                    isDarkMode={isDark}
                />
            ) : (
                <></>
            )}

            <div className="flex flex-row items-center justify-center w-full">
                {/* Timeline slider on bottom of the screen */}
                <TimeSlider
                    max={max}
                    setGraphData={setGraphData}
                    graphTimeline={graphTimeline}
                    currentInstance={currentInstance}
                    setCurrentInstance={setCurrentInstance}
                    setDefNodeColor={setDefNodeColor}
                />
            </div>
        </div>
    );
}

export default App;
