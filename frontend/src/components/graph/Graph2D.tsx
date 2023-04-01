import React, {useCallback, useEffect, useState} from "react";
import ForceGraph2D, { ForceGraphProps } from "react-force-graph-2d";
import {getColor, getLinkColor, getLinkOpacity, getLinkWidth, getNodeOpacity, getVisibility, showNeighbors} from "../../utils/GraphFunctions";
import { request } from "http";

type Props = {
    width: number;
    height: number;
    sharedProps: ForceGraphProps;
    search: any;
    threshold: any;
    graphRef: any;
    setInitCoords: any;
    setInitRotation: any;
    highCoupling: any;
    antiPattern: any;
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
    antiPattern
}) => {
    const [highlightNodes, setHighlightNodes] = useState<any>(new Set());
    const [highlightLinks, setHighlightLinks] = useState<any>(new Set());
    const [hoverNode, setHoverNode] = useState(null);
    const [selectedLink, setSelectedLink] = useState(null);
    const [defNodeColor, setDefNodeColor] = useState(false);
    const [hideNodes, setHideNodes] = useState<any>(new Set());

    const handleNodeHover = (node: any) => {
        highlightNodes.clear();
        highlightLinks.clear();

        if (node) {
            highlightNodes.add(node);
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
                if (graphRef.current) {
                    graphRef.current.zoomToFit(1500, 300, (node2: any) => {
                        return node.nodeName === node2.nodeName;
                    });
                }
                const event = new CustomEvent("nodeClick", {
                    detail: { node },
                });
                document.dispatchEvent(event);
            }
        },
        [graphRef]
    );

    // TODO: Implement Link Clicking
    const handleLinkClick = useCallback((link: any) => { 
        const { requests, source: sourceNode } = link
        console.log("link: " + JSON.stringify(requests, null, 2)) 
        console.log("source Node: " + JSON.stringify(sourceNode, null, 2))
    }, [graphRef]);

    useEffect(() => {
        graphRef.current.d3Force('charge').strength((node: any) => {return -120;})
        graphRef.current.d3Force('link').distance((link: any) => {return 100;});
    }, [graphRef]);

    return (
        <ForceGraph2D
            {...sharedProps}
            ref={graphRef}
            width={width}
            height={height}
            warmupTicks={100}
            onNodeDragEnd={(node) => {
                if (node.x && node.y) {
                    node.fx = node.x;
                    node.fy = node.y;
                }
            }}
            linkWidth={(link) => getLinkWidth(link, search)}
            linkDirectionalArrowLength={(link) => getLinkWidth(link, search)}
            linkDirectionalArrowRelPos={sharedProps.linkDirectionalArrowRelPos}
            linkDirectionalArrowColor={(link) =>
                getLinkColor(link, search, hoverNode, antiPattern, false)
            }
            linkDirectionalParticles={(link) =>
                highlightLinks.has(link) ? 2 : 0
            }
            linkDirectionalParticleWidth={(link) => getLinkWidth(link, search)}
            onNodeClick={handleNodeClick}
            onLinkClick={handleLinkClick}
            onNodeHover={handleNodeHover}
            onLinkHover={handleLinkHover}
            nodeVisibility={(node) => getVisibility(node, hideNodes)}
            nodeId="nodeName"
            nodeLabel="nodeName"
            nodeCanvasObjectMode = {(() => 'after')}
            nodeRelSize={8}
            onNodeRightClick={(node: any) => {
                const event = new CustomEvent("nodecontextmenu", {
                    detail: { node: node, coords: graphRef.current.graph2ScreenCoords(node.x, node.y), graphData: sharedProps.graphData, setHideNodes: setHideNodes},
                });
                document.dispatchEvent(event);
            }}
            nodeColor={(node: any) => getColor(
                node,
                sharedProps.graphData,
                threshold,
                highlightNodes,
                hoverNode,
                defNodeColor,
                setDefNodeColor,
                highCoupling,
                antiPattern
            ).replace(`)`, `, ${getNodeOpacity(node, search)})`).replace('rgb', 'rgba')}
            nodeCanvasObject={((node: any, ctx: any) => {
                let fontSize = 10;
                ctx.font = `${fontSize}px "Orbitron,sans-serif"`;
                //console.log("link label="+ link.label);
                const textWidth = ctx.measureText(node.nodeName).width;
                let bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2);
                //console.log(link);
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = node.nodeColor;
                ctx.fillText(node.nodeName, node.x, node.y - 10);
                node.__bckgDimensions = bckgDimensions;
            })}
            linkColor={(link) =>
                getLinkColor(link, search, hoverNode, antiPattern, false)
            }
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
        />
    );
};

export default Graph;
