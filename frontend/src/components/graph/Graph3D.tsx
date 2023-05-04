import React, { useCallback, useEffect, useState } from "react";
import ForceGraph3D from "react-force-graph-3d";
import { ForceGraphProps as SharedProps } from "react-force-graph-2d";
import {
    getColor,
    getLinkColor,
    getLinkWidth,
    getNeighbors,
    getNodeOpacity,
    getVisibility,
} from "../../utils/GraphFunctions";
import * as THREE from "three";
import SpriteText from "three-spritetext";

type Props = {
    width: number;
    height: number;
    search: string;
    threshold: number;
    sharedProps: SharedProps;
    graphRef: any;
    setInitCoords: any;
    setInitRotation: any;
    antiPattern: any;
    colorMode: any;
    defNodeColor: any;
    setDefNodeColor: any;
    setGraphData: any;
    isDarkMode: any;
    selectedAntiPattern: any;
    trackNodes: any;
    focusNode: any;
};

const Graph: React.FC<Props> = ({
    width,
    height,
    sharedProps,
    search,
    threshold,
    graphRef,
    setInitCoords,
    setInitRotation,
    antiPattern,
    colorMode,
    defNodeColor,
    setDefNodeColor,
    setGraphData,
    selectedAntiPattern,
    trackNodes,
    focusNode,
}) => {
    const [highlightNodes, setHighlightNodes] = useState<Set<string>>(
        new Set()
    );
    const [highlightLinks, setHighlightLinks] = useState<Set<string>>(
        new Set()
    );

    const [hoverNode, setHoverNode] = useState(null);
    const [selectedLink, setSelectedLink] = useState(null);
    const [hideNodes, setHideNodes] = useState<any>(new Set());

    // On page load
    useEffect(() => {
        let { x, y, z } = graphRef.current.cameraPosition();

        setInitCoords({ x, y, z });
        setInitRotation(graphRef.current.camera().quaternion);
        graphRef.current.d3Force("charge").strength((node: any) => {
            return -500;
        });
        graphRef.current.d3Force("link").distance((link: any) => {
            return 80;
        });
    }, []);

    const handleNodeHover = (node: any) => {
        highlightNodes.clear();
        highlightLinks.clear();

        if (node) {
            highlightNodes.add(node.nodeName);
            setHoverNode(node.nodeName);
            const neighbors = getNeighbors(
                node,
                sharedProps.graphData?.nodes,
                sharedProps.graphData?.links
            );
            neighbors.nodes.forEach((node: any) =>
                highlightNodes.add(node.nodeName)
            );
            neighbors.nodeLinks.forEach((link: any) =>
                highlightLinks.add(link.name)
            );
        }
        updateHighlight();
    };

    const handleLinkHover = (link: any) => {
        highlightNodes.clear();
        highlightLinks.clear();

        if (link) {
            highlightLinks.add(link.name);
            highlightNodes.add(link.source);
            highlightNodes.add(link.target);
        }

        updateHighlight();
    };

    const updateHighlight = () => {
        setHighlightNodes(highlightNodes);
        setHighlightLinks(highlightLinks);
        graphRef.current.refresh();
    };

    // On node left click - zoom in on the node and pull up info box
    const handleNodeClick = useCallback(
        (node: any) => {
            if (node != null) {
                if (graphRef.current) {
                    console.log(graphRef.current.camera());
                    const camPos = graphRef.current.camera().position;
                    graphRef.current.cameraPosition(
                        {
                            x: camPos.x,
                            y: camPos.y,
                            z: camPos.z,
                        },
                        node,
                        2500
                    );
                }
                const event = new CustomEvent("nodeClick", {
                    detail: { node: node },
                });
                document.dispatchEvent(event);
            }
        },
        [graphRef]
    );

    return (
        <ForceGraph3D
            ref={graphRef}
            graphData={sharedProps.graphData}
            nodeId={"nodeName"}
            width={width}
            height={height}
            nodeVisibility={(node) => getVisibility(node, hideNodes)}
            onNodeRightClick={(node: any) => {
                const event = new CustomEvent("nodecontextmenu", {
                    detail: {
                        node: node,
                        coords: graphRef.current.graph2ScreenCoords(
                            node.x,
                            node.y,
                            node.z
                        ),
                        graphData: sharedProps.graphData,
                        setHideNodes: setHideNodes,
                        setGraphData: setGraphData,
                    },
                });
                document.dispatchEvent(event);
            }}
            nodeThreeObject={(node: any) => {
                const color = getColor(
                    node,
                    sharedProps.graphData,
                    threshold,
                    highlightNodes,
                    hoverNode,
                    defNodeColor,
                    setDefNodeColor,
                    antiPattern,
                    colorMode,
                    selectedAntiPattern,
                    trackNodes,
                    focusNode
                );

                const nodes = new THREE.Mesh(
                    new THREE.SphereGeometry(5),
                    new THREE.MeshLambertMaterial({
                        transparent: true,
                        color: color,
                        opacity: getNodeOpacity(
                            node,
                            search,
                            highlightNodes,
                            focusNode
                        ),
                    })
                );
                const sprite = new SpriteText(node.nodeName);
                sprite.material.depthWrite = false;

                // Get sprite color, have to change alpha channel as there is no other function
                sprite.color = color
                    .replace(
                        ")",
                        `,${getNodeOpacity(
                            node,
                            search,
                            highlightNodes,
                            focusNode
                        )})`
                    )
                    .replace("rgb", "rgba");

                sprite.textHeight = 14;
                sprite.position.set(0, 15, 0);

                nodes.add(sprite);
                return nodes;
            }}
            nodeThreeObjectExtend={false}
            linkCurvature={(link) => {
                let test = false;
                sharedProps.graphData?.links.forEach((link2: any) => {
                    if (
                        link2.target === link.source &&
                        link2.source === link.target
                    ) {
                        test = true;
                    }
                });
                if (test) {
                    return 0.4;
                } else {
                    return 0;
                }
            }}
            linkDirectionalArrowLength={10}
            linkDirectionalArrowRelPos={sharedProps.linkDirectionalArrowRelPos}
            linkDirectionalArrowColor={(link) =>
                getLinkColor(
                    link,
                    search,
                    hoverNode,
                    antiPattern,
                    true,
                    selectedAntiPattern,
                    focusNode
                )
            }
            linkDirectionalParticles={(link: any) => {
                return highlightLinks.has(link.name) ? 4 : 0;
            }}
            linkDirectionalParticleWidth={(link) =>
                getLinkWidth(
                    link,
                    search,
                    highlightLinks,
                    antiPattern,
                    selectedAntiPattern
                )
            }
            linkColor={(link) =>
                getLinkColor(
                    link,
                    search,
                    hoverNode,
                    antiPattern,
                    true,
                    selectedAntiPattern,
                    focusNode
                )
            }
            linkOpacity={undefined}
            onNodeDragEnd={(node) => {
                if (node.x && node.y && node.z) {
                    node.fx = node.x;
                    node.fy = node.y;
                    node.fz = node.z;
                }
            }}
            backgroundColor={"rgba(0,0,0,0)"}
            onNodeClick={handleNodeClick}
            onNodeHover={handleNodeHover}
            onLinkHover={handleLinkHover}
            linkWidth={(link) =>
                getLinkWidth(
                    link,
                    search,
                    highlightLinks,
                    antiPattern,
                    selectedAntiPattern
                )
            }
        />
    );
};

export default Graph;
