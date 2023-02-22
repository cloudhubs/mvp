import React, { useCallback, useEffect, useState } from "react";
import ForceGraph3D from "react-force-graph-3d";
import { ForceGraphProps as SharedProps } from "react-force-graph-2d";
import {
    getColor,
    getLinkColor,
    getLinkWidth,
    getNodeOpacity,
    getSpriteColor,
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
    highCoupling: any;
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
    highCoupling,
}) => {
    const [highlightNodes, setHighlightNodes] = useState<any>(new Set());
    const [highlightLinks, setHighlightLinks] = useState<any>(new Set());
    const [hoverNode, setHoverNode] = useState(null);
    const [selectedLink, setSelectedLink] = useState(null);
    const [defNodeColor, setDefNodeColor] = useState(false);

    const handleNodeHover = (node: any) => {
        highlightNodes.clear();
        highlightLinks.clear();

        if (node) {
            highlightNodes.add(node);
            setHoverNode(node);
        }
        updateHighlight();
    };

    const handleLinkHover = (link: any) => {
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
        (node: any) => {
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
                const event = new CustomEvent("nodeClick", {
                    detail: { node: node },
                });
                document.dispatchEvent(event);
            }
        },
        [graphRef]
    );

    useEffect(() => {
        let { x, y, z } = graphRef.current.cameraPosition();

        setInitCoords({ x, y, z });
        setInitRotation(graphRef.current.camera().quaternion);
        graphRef.current.d3Force('charge').strength((node: any) => {return -220;})
        graphRef.current.d3Force('link').distance((link: any) => {return 60;});
    }, []);

    return (
        <ForceGraph3D
            ref={graphRef}
            graphData={sharedProps.graphData}
            nodeId={"nodeName"}
            width={width}
            height={height}
            nodeThreeObject={(node) => {
                const nodes = new THREE.Mesh(
                    new THREE.SphereGeometry(5),
                    new THREE.MeshLambertMaterial({
                        transparent: true,
                        color: getColor(
                            node,
                            sharedProps.graphData,
                            threshold,
                            highlightNodes,
                            hoverNode,
                            defNodeColor,
                            setDefNodeColor,
                            highCoupling
                        ),
                        opacity: getNodeOpacity(node, search),
                    })
                );
                // @ts-ignore
                const sprite = new SpriteText(node.nodeName);
                sprite.material.depthWrite = false; // make sprite background transparent
                sprite.color = getSpriteColor(
                    node,
                    search,
                    sharedProps.graphData,
                    threshold,
                    highlightNodes,
                    hoverNode,
                    defNodeColor,
                    setDefNodeColor,
                    highCoupling
                ) as string;
                sprite.textHeight = 8;
                sprite.position.set(0, 10, 0);

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
            linkDirectionalArrowLength={(link) => getLinkWidth(link, search)}
            linkDirectionalArrowRelPos={sharedProps.linkDirectionalArrowRelPos}
            linkDirectionalArrowColor={(link) =>
                getLinkColor(link, search, hoverNode, highCoupling, true)
            }
            linkDirectionalParticles={(link) =>
                highlightLinks.has(link) ? 2 : 0
            }
            linkDirectionalParticleWidth={(link) => getLinkWidth(link, search)}
            linkColor={(link) =>
                getLinkColor(link, search, hoverNode, highCoupling, true)
            }
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
            linkWidth={(link) => getLinkWidth(link, search)}
        />
    );
};

export default Graph;
