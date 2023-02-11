import NodeObject from "react-force-graph-3d";
import {ColorRepresentation} from "three";

function getShape(type: String): number {
    if (type === "service") {
        return 0;
    } else if (
        type === "kafka" ||
        type === "proxy" ||
        type === "writer" ||
        type === "pipeline"
    ) {
        return 1;
    } else if (type === "customer" || "srcSink") {
        return 2;
    } else if (type === "archive" || type === "database" || type === "bucket") {
        return 3;
    } else if (type === "API") {
        return 4;
    } else if (type === "config") {
        return 5;
    } else {
        return 0;
    }
}

// Sets color of node
function getColor(
    node: any,
    graphData: any,
    threshold: number,
    highlightNodes: any,
    hoverNode: any
): ColorRepresentation {
    let { nodes, links } = graphData;
    let numNeighbors = getNeighbors(node, links).nodes.length;

    if (highlightNodes && highlightNodes.includes(node)) {
        if (node === hoverNode) {
            return "rgb(50,50,200)";
        } else {
            return "rgb(0,200,200)";
        }
    }

    if (numNeighbors > threshold) {
        return "rgb(255,0,0)";
    }
    if (numNeighbors > threshold / 2) {
        return "rgb(255,160,0)";
    }

    return "rgb(0,255,0)";
}

// Find neighbors of a given node
function getNeighbors(node: any, links: any) {
    return {
        nodeLinks: links.filter((link: any) => {
            return (
                link.source.nodeID === node.nodeID ||
                link.target.nodeID === node.nodeID
            );
        }),
        nodes: links.reduce(
            (neighbors: any, link: any) => {
                if (link.target.id === node.id) {
                    neighbors.push(link.source);
                } else if (link.source.id === node.id) {
                    neighbors.push(link.target);
                }
                return neighbors;
            },
            [node]
        ),
    };
}

// Refresh visible nodes
function reset(graphRef: any) {
    graphRef.current.refresh();
}

// Set camera back to default view
function resetView(graphRef: any, initCoords: any) {
    graphRef.current.cameraPosition(
        initCoords, // new position
        { x: 0, y: 0, z: 0 }, // lookAt ({ x, y, z })
        2000 // ms transition duration
    );
    reset(graphRef);
}

const getNodeOpacity = (node: any, search: any): number => {
    if (search === "") {
        return 0.75;
    }
    if (node.id.toLowerCase().includes(search.toLowerCase())) {
        return 0.8;
    } else {
        return 0.1;
    }
};

// Highlight neighbors
function getHighlightNeighbors(node: any, graphData: any, highlightLinks: any, highlightNodes: any) {
    let { links } = graphData;
    const { nodeLinks, nodes } = getNeighbors(node, links);
    nodeLinks.forEach((link: any) => highlightLinks.add(link));
    nodes.forEach((node: any) => highlightNodes.add(node));
}

export {getShape, getColor, getNeighbors, reset, resetView, getHighlightNeighbors, getNodeOpacity};