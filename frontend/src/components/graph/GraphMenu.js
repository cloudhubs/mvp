import React from "react";
import GraphButtonMenu from "./GraphButtons";
import Search from "./Search";
import Slider from "./Slider";

/**
 * A menu to be able to do all sorts of things with the force graph.
 *
 * @param {Object} props The props passed to this object
 * @param {React.MutableRefObject<ForceGraphMethods>} props.graphRef Reference to the internal force graph to access methods/camera
 * @returns {JSX.Element} The menu for the graph
 */
const GraphMenu = ({ graphRef }) => {
    return (
        <div className="absolute top-2 right-2 z-50 flex flex-col gap-2 text-sm bg-slate-900 bg-opacity-60 rounded-lg p-4 w-44">
            <Search graphRef={graphRef} />
            <GraphButtonMenu graphRef={graphRef} />
            <Slider />
        </div>
    );
};

export default GraphMenu;