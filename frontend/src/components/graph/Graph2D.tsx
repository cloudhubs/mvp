import React, { useCallback, useState } from "react";
import ForceGraph2D, { ForceGraphProps } from "react-force-graph-2d";
import { getLinkColor, getLinkWidth } from "../../utils/GraphFunctions";

type Props = {
    width: number;
    height: number;
    sharedProps: ForceGraphProps;
    search: any;
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
                    detail: { node: node },
                });
                document.dispatchEvent(event);
            }
        },
        [graphRef]
    );

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
                getLinkColor(link, search, hoverNode, highCoupling)
            }
            linkDirectionalParticles={(link) =>
                highlightLinks.has(link) ? 2 : 0
            }
            linkDirectionalParticleWidth={(link) => getLinkWidth(link, search)}
            onNodeClick={handleNodeClick}
            onNodeHover={handleNodeHover}
            onLinkHover={handleLinkHover}
            nodeId={"nodeName"}
        />
    );
};

export default Graph;
