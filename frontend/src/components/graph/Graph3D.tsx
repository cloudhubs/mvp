import React, {useCallback, useRef, useState} from 'react';
import ForceGraph3D, {ForceGraphMethods, LinkObject} from 'react-force-graph-3d';
import { ForceGraphProps as SharedProps } from 'react-force-graph-2d';
import {getColor, getLinkColor, getNodeOpacity, getShape, getSpriteColor} from "../../utils/GraphFunctions";
import * as THREE from 'three';

import myData from '../../data/trainticket.json';
import SpriteText from "three-spritetext";

type Props = {
    width: number;
    height: number;
    search: string;
    threshold: number;
    sharedProps: SharedProps;
};

const Graph: React.FC<Props> = ({ width, height, sharedProps, search, threshold }) => {
    const graphRef = useRef<ForceGraphMethods>();
    const [highlightNodes, setHighlightNodes] = useState<any>(new Set());
    const [highlightLinks, setHighlightLinks] = useState<any>(new Set());
    const [hoverNode, setHoverNode] = useState(null);
    const [selectedLink, setSelectedLink] = useState(null);

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
        <ForceGraph3D
            ref={graphRef}
            graphData={sharedProps.graphData}
            width={width}
            height={height}
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
                // @ts-ignore
                const sprite = new SpriteText(node.id);
                sprite.material.depthWrite = false; // make sprite background transparent
                sprite.color = getSpriteColor(
                    node,
                    search,
                    myData,
                    threshold,
                    highlightNodes,
                    hoverNode
                ) as string;
                sprite.textHeight = 8;
                sprite.position.set(0,10,0);

                nodes.add(sprite);
                return nodes;
            }}
            nodeThreeObjectExtend={false}
            linkDirectionalParticles={4}
            linkDirectionalArrowLength={sharedProps.linkDirectionalArrowLength}
            linkDirectionalArrowRelPos={sharedProps.linkDirectionalArrowRelPos}
            linkDirectionalArrowColor={(link) => getLinkColor(link, search, hoverNode)}
            linkDirectionalParticleWidth={link => highlightLinks.has(link) ? 4 : 0}
            linkColor={(link) => getLinkColor(link, search, hoverNode)}
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
        />
    );
};

export default Graph;