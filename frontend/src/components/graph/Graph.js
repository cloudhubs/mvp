import React from "react";
import GraphButtonMenu from "./GraphButtons";
import Search from "./Search";
import Slider from "./Slider";
import {useCallback, useRef, useState} from "react";
import {ForceGraph3D} from "react-force-graph";
import * as THREE from "three";
import {getColor, getNodeOpacity} from "../../GraphFunctions";
import SpriteText from "three-spritetext";

/**
 * A menu to be able to do all sorts of things with the force graph.
 *
 * @param {Object} props The props passed to this object
 * @param {React.MutableRefObject<ForceGraphMethods>} props.graphRef Reference to the internal force graph to access methods/camera
 * @returns {JSX.Element} The menu for the graph
 */
const Graph = ({ graphRef }) => {
    let myData = {"nodes": [{"id": "id1","name": "name1","val": 1},{"id": "id2","name": "name2","val": 10},],"links": [{"source": "id1","target": "id2"},]}
    const [highlightNodes, setHighlightNodes] = useState(new Set());
    const [highlightLinks, setHighlightLinks] = useState(new Set());
    const [threshold, setThreshold] = useState(8);
    const [hoverNode, setHoverNode] = useState();
    const [search, setSearch] = useState("");
    const [selectedLink, setSelectedLink] = useState();

    const handleNodeHover = (node) => {

        highlightNodes.clear();
        highlightLinks.clear();

        if (node) {
            highlightNodes.add(node);
        }
        updateHighlight();
    };

    const handleLinkHover = link => {
        highlightNodes.clear();
        highlightLinks.clear();

        if (link) {
            highlightLinks.add(link);
            highlightNodes.add(link.source);
            highlightNodes.add(link.target);
        }

        updateHighlight();
    };
    const updateHighlight = () => {
        setHighlightNodes(highlightNodes);
        setHighlightLinks(highlightLinks);
    };

    const handleNodeClick = useCallback(
        (node) => {
            if (node != null) {
                const distance = 100;
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
        },
        [graphRef]
    );




    return (
        <div className="App">
            <ForceGraph3D
                linkWidth={link => highlightLinks.has(link) ? 5 : 1}
                linkDirectionalParticles={4}
                linkDirectionalParticleWidth={link => highlightLinks.has(link) ? 4 : 0}
                linkDirectionalArrowLength={3.5}
                linkDirectionalArrowRelPos={1}
                ref={graphRef}
                onNodeHover={handleNodeHover}
                onLinkHover={handleLinkHover}
                nodeThreeObject={(node) => {
                    const nodes = new THREE.Mesh(
                        new THREE.SphereGeometry(5),
                        new THREE.MeshLambertMaterial({
                            transparent: true,
                            color: getColor(
                                node,
                                myData,
                                threshold,
                                highlightNodes,
                                hoverNode
                            ),
                            opacity: getNodeOpacity(node, search)
                        })
                    )
                    const sprite = new SpriteText(node.id);
                    sprite.material.depthWrite = false; // make sprite background transparent
                    sprite.color = getColor(
                        node,
                        myData,
                        threshold,
                        highlightNodes,
                        hoverNode
                    );
                    sprite.textHeight = 8;
                    sprite.position.set(0,10,0);

                    nodes.add(sprite);
                    return nodes;
                }}
                nodeThreeObjectExtend={false}
                graphData={myData}
                onNodeClick={handleNodeClick}
                onNodeDragEnd={(node) => {
                    if (node.x && node.y && node.z) {
                        node.fx = node.x;
                        node.fy = node.y;
                        node.fz = node.z;
                    }
                }}
                onLinkClick={(link) => {
                    setSelectedLink(link);
                }}
                backgroundColor={"rgba(0,0,0,0)"}
            />
        </div>
    );
};

export default Graph;