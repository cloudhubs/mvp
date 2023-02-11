import React, {useRef, useState} from 'react';
import ForceGraph3D, {ForceGraphMethods, LinkObject} from 'react-force-graph-3d';
import { ForceGraphProps as SharedProps } from 'react-force-graph-2d';
import {getColor, getNodeOpacity, getShape} from "../../utils/GraphFunctions";
import * as THREE from 'three';

import myData from '../../data/trainticket.json';
import SpriteText from "three-spritetext";

type Props = {
    width: number;
    height: number;
    sharedProps: SharedProps;
};

const Graph: React.FC<Props> = ({ width, height, sharedProps }) => {
    const graphRef = useRef<ForceGraphMethods>();
    const [threshold, setThreshold] = useState(8);
    const [highlightNodes, setHighlightNodes] = useState([]);
    const [highlightLinks, setHighlightLinks] = useState<LinkObject[]>([]);
    const [hoverNode, setHoverNode] = useState(null);
    const [selectedLink, setSelectedLink] = useState(null);
    const [search, setSearch] = useState("");

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
                sprite.color = getColor(
                    node,
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
            linkDirectionalArrowColor={sharedProps.linkDirectionalArrowColor}
            linkDirectionalParticleWidth={link => highlightLinks.includes(link) ? 4 : 0}
            linkColor={sharedProps.linkColor}
            onNodeDragEnd={(node) => {
                if (node.x && node.y && node.z) {
                    node.fx = node.x;
                    node.fy = node.y;
                    node.fz = node.z;
                }
            }}
            backgroundColor={"rgba(0,0,0,0)"}
        />
    );
};

export default Graph;