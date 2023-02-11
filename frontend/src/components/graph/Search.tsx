import React, { useState } from "react";
import myData from '../../data/trainticket.json';

type Props = {
    graphRef: any;
};
const Search: React.FC<Props> = ({ graphRef }) => {
    const [search, setSearch] = useState("");
    const [graphData] = useState<any>(myData);
    const nodes = graphData.nodes.map((node: any) => node.id.toLowerCase());

    const handleInput = (e: any) => {
        setSearch(e.target.value);
        if (nodes.includes(e.target.value.toLowerCase())) {
            const distance = 100;
            const node = graphData.nodes.find((n: any) => n.id === e.target.value);
            if (node) {
                const distRatio =
                    1 + distance / Math.hypot(node.x, node.y, node.z);
                if (graphRef.current) {
                    graphRef.current.cameraPosition(
                        {
                            x: node.x * distRatio,
                            y: node.y * distRatio,
                            z: node.z * distRatio,
                        },
                        node,
                        1500
                    );
                }
            }
        }
    };

    return (
        <div className="mx-2 mb-3">
            <label className="inline-block mb-2">
                Search
            </label>
            <input
                id="search"
                type="text"
                className="block w-full px-3 py-1.5 text-sm font-normal rounded transition ease-in-out m-0
                 focus:border-cyan-600 focus:outline-none text-gray-300 bg-transparent border-white border-2"
                value={search}
                placeholder="Type query"
                onInput={handleInput}
                list="nodeOptions"
                autoComplete="off"
            />
            <datalist id="nodeOptions">
                {graphData.nodes.map((node: any) => (
                    <option key={node.nodeID}>{node.id}</option>
                ))}
            </datalist>
        </div>
    );
};

export default Search;