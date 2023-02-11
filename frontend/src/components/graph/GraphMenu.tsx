import React, {useState} from "react";
import GraphButtonMenu from "./GraphButtons";
import Search from "./Search";
import Slider from "./Slider";

type Props = {
    graphRef: any;
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
};

/**
 * A menu to be able to do all sorts of things with the force graph.
 *
 * @param {Object} props The props passed to this object
 * @param {React.MutableRefObject<ForceGraphMethods>} props.graphRef Reference to the internal force graph to access methods/camera
 * @returns {JSX.Element} The menu for the graph
 */
const GraphMenu: React.FC<Props> = ({ graphRef, search, setSearch, value, setValue }) => {
    return (
        <div className="absolute top-2 right-2 z-50 flex flex-col gap-2 text-sm bg-blue-300 bg-opacity-60 rounded-lg p-4 w-44">
            <Search graphRef={graphRef} search={search} setSearch={setSearch} />
            <GraphButtonMenu graphRef={graphRef} />
            <Slider value={value} setValue={setValue}/>
        </div>
    );
};

export default GraphMenu;