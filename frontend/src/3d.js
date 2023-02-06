import React, { useRef } from "react";
import Graph from "../components/graph/Graph";
import GraphMenu from "../components/graph/GraphMenu";
import { Menu } from "../components/graph/Menu";
import { InfoBox} from "../components/graph/InfoBox";

/**
 * This page renders the 3d force graph.
 *
 * @TODO Implement buttons, search, etc.
 * @TODO Fix dragging by adding either the dragging script or exporting functionality
 * @returns {React.Component} The 3D viualizer page ("/visualizer/3d")
 */
const ThreeD = () => {
    /**
     * This acts as a reference to the internal force graph to call methods
     * @type {React.MutableRefObject<ForceGraphMethods>}
     * */
    const graphRef = useRef();

    return (
        <>
            <div className="flex flex-row justify-center items-center w-full h-screen relative z-10">
                <GraphMenu graphRef={graphRef} />
                <Graph graphRef={graphRef} />
                <Menu />
                <InfoBox />
            </div>
        </>
    );
};

export default ThreeD;