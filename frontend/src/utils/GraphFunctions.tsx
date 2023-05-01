import { ColorRepresentation } from "three";
import { Antipattern, Node } from "../types";

const RED = "rgb(255,0,0)";
const ORANGE = "rgb(255,160,0)";
const GREEN = "rgb(0,255,0)";
const HOVER_BLUE = "rgb(89, 130, 255)";
const HOVER_NEIGHBOR = "rgb(79, 200, 209)";
const LIGHT_GRAY = "rgb(150,150,150)";
const DARK_GRAY = "rgb(50,50,50)";

const IN_PATTERN = "rgb(235,52,192)";

const LINK_FROM_HOVER = "rgb(232, 190, 39)";
const LINK_TO_HOVER = "rgb(39,232,49)";

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

function showNeighbors(node: any, graphData: any, setHideNodes: any) {
    let { nodes, links } = graphData;
    let hideNodes = new Set();
    nodes.forEach((node: any) => hideNodes.add(node));
    getNeighbors(node, links).nodes.forEach((node: any) =>
        hideNodes.delete(node)
    );
    setHideNodes(hideNodes);
}

function getVisibility(node: any, hideNodes: any) {
    if (hideNodes.has(node)) {
        return false;
    }
    return true;
}

// Sets color of node
function getColor(
    node: any,
    graphData: any,
    threshold: number,
    highlightNodes: any,
    hoverNode: any,
    defNodeColor: any,
    setDefNodeColor: any,
    highCoupling: any,
    antipattern: any,
    colorMode: any,
    selectedAntiPattern: any
): any {
    if (highlightNodes && highlightNodes.has(node.nodeName)) {
        if (node.nodeName === hoverNode) {
            return HOVER_BLUE;
        } else {
            return HOVER_NEIGHBOR;
        }
    }

    if (antipattern && selectedAntiPattern != "none") {
        if (highCoupling) {
            return getColorCoupling(node, graphData, threshold);
        }

        switch (selectedAntiPattern) {
            case "cyclic":
                const cyclic = node.patterns.find(
                    (pattern: Antipattern) =>
                        pattern.type === "Cyclic Dependency"
                );
                return cyclic != undefined ? IN_PATTERN : LIGHT_GRAY;
            case "knot":
                break;
            // default just continue into visual color scheme (based on theme)
        }
    }

    return getColorVisual(
        node,
        graphData,
        threshold,
        defNodeColor,
        setDefNodeColor,
        colorMode
    );
}

function getColorVisual(
    node: any,
    graphData: any,
    threshold: number,
    defNodeColor: any,
    setDefNodeColor: any,
    colorMode: string
): ColorRepresentation {
    let { nodes, links } = graphData;

    switch (colorMode) {
        case "neighbor":
            let neighbors: any = getNeighbors(node, links);
            return getColorNeighbor(
                node,
                graphData,
                threshold,
                defNodeColor,
                setDefNodeColor,
                neighbors
            );
        case "git":
            break;
        case "cpu":
            return getColorThreshold(threshold, node.cpu);
        case "ram":
            return getColorThreshold(threshold, node.ram);
        case "disk":
            return getColorThreshold(threshold, node.disk);
        case "latency":
            return getColorThreshold(threshold, node.latency);
        case "dark-default":
            return LIGHT_GRAY;
        case "light-default":
            return DARK_GRAY;
    }
    return node.color;
}

function getColorNeighbor(
    node: any,
    graphData: any,
    threshold: number,
    defNodeColor: any,
    setDefNodeColor: any,
    neighbors: any
): ColorRepresentation {
    let { nodes, links } = graphData;

    if (!defNodeColor) {
        nodes.map((n: any) => {
            n.color = "-1";
        });
        setDefNodeColor(true);
    }

    if (node.color === "-1") {
        const colors = [
            "rgb(250, 93, 57)",
            "rgb(255, 167, 0)",
            "rgb(245, 239, 71)",
            "rgb(51, 241, 255)",
            "rgb(204, 51, 255)",
            "rgb(255, 51, 112)",
            "rgb(173, 255, 51)",
            "rgb(194, 151, 252)",
        ];

        //let neighbors: any = getNeighbors(node, links);

        let offLimits: any = [];
        let newColors: any = [];

        neighbors.nodes.map((neighbor: any) => {
            if (neighbor.color !== "-1") {
                offLimits.push(neighbor.color);
            }
        });

        colors.map((color) => {
            if (offLimits.indexOf(color) === -1) {
                newColors.push(color);
            }
        });

        let randIndex = Math.floor(Math.random() * newColors.length);

        node.color = newColors[randIndex];
    }

    return node.color;
}

function getColorCoupling(
    node: any,
    graphData: any,
    threshold: number
): ColorRepresentation {
    let { nodes, links } = graphData;
    let numNeighbors = getNeighbors(node, links).nodes.length;

    if (numNeighbors > threshold) {
        return RED;
    }
    if (numNeighbors > threshold / 2) {
        return ORANGE;
    }

    return GREEN;
}

function getColorThreshold(
    threshold: number,
    value: number
): ColorRepresentation {
    if (value > threshold) {
        return RED;
    }
    if (value > threshold / 2) {
        return ORANGE;
    }

    return GREEN;
}

// Find neighbors of a given node
function getNeighbors(node: any, links: any) {
    return {
        nodeLinks: links.filter((link: any) => {
            return (
                link.source.nodeName === node.nodeName ||
                link.target.nodeName === node.nodeName
            );
        }),
        nodes: links.reduce(
            (neighbors: any, link: any) => {
                if (link.target.nodeName === node.nodeName) {
                    neighbors.push(link.source);
                } else if (link.source.nodeName === node.nodeName) {
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
        return 0.8;
    }
    if (node.nodeName.toLowerCase().includes(search.toLowerCase())) {
        return 0.9;
    } else {
        return 0.1;
    }
};

function getSpriteColor(
    node: any,
    search: any,
    graphData: any,
    threshold: number,
    highlightNodes: any,
    hoverNode: any,
    defNodeColor: any,
    setDefNodeColor: any,
    highCoupling: any,
    antipattern: any,
    colorMode: any,
    selectedAntiPattern: any
) {
    if (!node.nodeName.toLowerCase().includes(search.toLowerCase())) {
        return "rgba(255,255,255,0)";
    }
    return getColor(
        node,
        graphData,
        threshold,
        highlightNodes,
        hoverNode,
        defNodeColor,
        setDefNodeColor,
        highCoupling,
        antipattern,
        colorMode,
        selectedAntiPattern
    );
}

function getLinkOpacity(link: any, search: any, threed: any) {
    if (search === "") {
        if (threed) {
            return 0.8;
        }
        return 0.7;
    }
    if (
        link.source.nodeName.toLowerCase().includes(search.toLowerCase()) ||
        link.target.nodeName.toLowerCase().includes(search.toLowerCase())
    ) {
        if (threed) {
            return 0.9;
        }
    } else {
        if (threed) {
            return 0.2;
        }
        return 0.1;
    }
}

function getLinkColor(
    link: any,
    search: any,
    hoverNode: any,
    antiPattern: any,
    threed: any,
    selectedAntiPattern: any
) {
    if (link.source.nodeName === hoverNode) {
        return LINK_FROM_HOVER;
    } else if (link.target.nodeName === hoverNode) {
        return LINK_TO_HOVER;
    }

    if (antiPattern) {
        if (selectedAntiPattern == "coupling") {
            return linkColorCoupling(link, search, threed);
        } else {
            if (
                link.source.patterns?.find((pattern: any) =>
                    pattern.type.toLowerCase().includes(selectedAntiPattern)
                ) &&
                link.target.patterns?.find((pattern: any) =>
                    pattern.type.toLowerCase().includes(selectedAntiPattern)
                )
            ) {
                return IN_PATTERN.replace(`)`, `, 1)`).replace("rgb", "rgba");
            }
        }
    }
    return linkColorVisual(link, search, threed);
}

function linkColorVisual(link: any, search: any, threed: any) {
    let color = link.source.color;
    if (color && color! + -1) {
        color = color
            .replace(`)`, `, ${getLinkOpacity(link, search, threed)})`)
            .replace("rgb", "rgba");
    }
    return color;
}

function linkColorCoupling(link: any, search: any, threed: any) {
    return `rgba(102,102,153, ${getLinkOpacity(link, search, threed)})`;
}

function getLinkWidth(link: any, search: any) {
    return link.requests.length;
}

export {
    getShape,
    getColor,
    getNeighbors,
    reset,
    resetView,
    getNodeOpacity,
    getSpriteColor,
    getLinkOpacity,
    getLinkColor,
    getLinkWidth,
    getVisibility,
    showNeighbors,
};
