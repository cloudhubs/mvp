import './App.css';
import { ForceGraph3D} from 'react-force-graph';
import * as THREE from "three";
import SpriteText from 'three-spritetext';
import React, { useRef, useCallback, useState } from "react";

function App() {
  let myData = {"nodes": [{"id": "id1","name": "name1","val": 1},{"id": "id2","name": "name2","val": 10},],"links": [{"source": "id1","target": "id2"},]}
  const graphRef = useRef();
  const [highlightNodes, setHighlightNodes] = useState(new Set());
  const [highlightLinks, setHighlightLinks] = useState(new Set());
    const [threshold, setThreshold] = useState(8);
    const [hoverNode, setHoverNode] = useState();
    const [search, setSearch] = useState("");

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

    function getNeighbors(node, links) {
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

    const getNodeOpacity = (node) => {
        if (search === "") {
            return 0.75;
        }
        if (node.id.toLowerCase().includes(search.toLowerCase())) {
            return 0.8;
        } else {
            return 0.1;
        }
    };

    function getColor(
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
                      opacity: getNodeOpacity(node)
                  })
              )
              const sprite = new SpriteText(node.id);
              sprite.material.depthWrite = false; // make sprite background transparent
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
        />
      </div>
  );
}

export default App;