export function getShape(type) {
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
export function getColor(
    node,
    graphData,
    threshold,
    highlightNodes,
    hoverNode
) {
    let { nodes, links } = graphData;
    let numNeighbors = getNeighbors(node, links).nodes.length;

    if (highlightNodes && highlightNodes.has(node)) {
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
export function getNeighbors(node, links) {
    return {
        nodeLinks: links.filter((link) => {
            return (
                link.source.nodeID === node.nodeID ||
                link.target.nodeID === node.nodeID
            );
        }),
        nodes: links.reduce(
            (neighbors, link) => {
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
export function reset(graphRef) {
    graphRef.current.refresh();
}

// Set camera back to default view
export function resetView(graphRef, initCoords) {
    graphRef.current.cameraPosition(
        initCoords, // new position
        { x: 0, y: 0, z: 0 }, // lookAt ({ x, y, z })
        2000 // ms transition duration
    );
    reset(graphRef);
}

export const getNodeOpacity = (node, search) => {
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
export function getHighlightNeighbors(node, graphData, highlightLinks, highlightNodes) {
    let { links } = graphData;
    const { nodeLinks, nodes } = getNeighbors(node, links);
    nodeLinks.forEach((link) => highlightLinks.add(link));
    nodes.forEach((node) => highlightNodes.add(node));
}
