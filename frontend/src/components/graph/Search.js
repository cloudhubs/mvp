import React, { useState } from "react";

const Search = ({ graphRef }) => {
    const [search, setSearch] = useState("");
    const [graphData] = useState({"nodes": [{"id": "id1","name": "name1","val": 1},{"id": "id2","name": "name2","val": 10},],"links": [{"source": "id1","target": "id2"},]});
    const nodes = graphData.nodes.map((node) => node.id.toLowerCase());

    const handleInput = (e) => {
        setSearch(e.target.value);
        if (nodes.includes(e.target.value.toLowerCase())) {
            const distance = 100;
            const node = graphData.nodes.find((n) => n.id === e.target.value);
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
            <label html="search" className="inline-block mb-2">
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
                {graphData.nodes.map((node) => (
                    <option key={node.nodeID}>{node.id}</option>
                ))}
            </datalist>
        </div>
    );
};

export default Search;