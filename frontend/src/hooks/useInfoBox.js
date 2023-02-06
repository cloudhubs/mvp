import { useEffect, useCallback, useState } from "react";
import { getNeighbors } from "../GraphFunctions";

export const useInfoBox = () => {
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
    const [show, setShow] = useState(false);
    const [name, setName] = useState();
    const [type, setType] = useState();
    const [id, setId] = useState();
    const [graphData, setGraphData] = useState(null);
    const [depends, setDepends] = useState();
    const [dependencies, setDependencies] = useState();

    const handleClick = useCallback(
        (event) => {
            setAnchorPoint({ x: event.pageX, y: event.pageY });
            setName(event.detail.node.id);
            setType(event.detail.node.nodeType);
            setId(event.detail.node.nodeID);
            let neighbors = getNeighbors(
                event.detail.node,
                graphData.links
            ).nodes;
            neighbors.splice(neighbors.indexOf(event.detail.node), 1);
            let dependency = neighbors.map((data) => {
                if (
                    event.detail.node.dependencies.includes(
                        parseInt(data.nodeID)
                    )
                ) {
                    neighbors.splice(neighbors.indexOf(data), 1);
                    return <li key={data.id}>{data.id}</li>;
                }
            });
            neighbors = neighbors.map((data) => {
                return <li key={data.id}>{data.id}</li>;
            });
            setDependencies(dependency);
            setDepends(neighbors);
            setShow(true);
        },
        [setShow, setAnchorPoint]
    );

    const handleLClick = useCallback(
        () => (show ? setShow(false) : null),
        [show]
    );

    useEffect(() => {
        document.addEventListener("nodeClick", handleClick);
        document.addEventListener("click", handleLClick);
        return () => {
            document.removeEventListener("nodeClick", handleClick);
            document.removeEventListener("click", handleLClick);
        };
    });
    return {
        anchorPoint,
        name,
        show,
        type,
        id,
        depends,
        setShow,
        dependencies,
    };
};