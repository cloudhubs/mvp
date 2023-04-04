import { useEffect, useCallback, useState } from "react";
import { getNeighbors } from "../utils/GraphFunctions";
import myData from '../data/communicationGraph.json';

export const useInfoBox = () => {
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
    const [show, setShow] = useState(false);
    const [name, setName] = useState();
    const [type, setType] = useState();
    const [graphData, setGraphData] = useState<any>(myData);
    const [depends, setDepends] = useState();
    const [dependencies, setDependencies] = useState();

    const handleClick = useCallback(
        (event: any) => {
            setAnchorPoint({ x: event.pageX, y: event.pageY });
            setName(event.detail.node.nodeName);
            setType(event.detail.node.nodeType);
            let neighbors = getNeighbors(
                event.detail.node,
                graphData.links
            ).nodes;
            neighbors.splice(neighbors.indexOf(event.detail.node), 1);
            let dependency = neighbors.map((data: any) => {
                if (

                    event.detail.node.Dependencies?.includes(
                        data.nodeName
                    )
                ) {
                    neighbors.splice(neighbors.indexOf(data), 1);
                    return <li key={data.nodeName}>{data.nodeName}</li>;
                }
            });
            neighbors = neighbors.map((data: any) => {
                return <li key={data.nodeName}>{data.nodeName}</li>;
            });
            setDependencies(dependency);
            setDepends(neighbors);
            setShow(true);
        },
        [setShow, setAnchorPoint]
    );

    const handleLinkClick = useCallback(
        (event: any) => {
            setAnchorPoint({ x: event.pageX, y: event.pageY });
            console.log(event)
            // setName(event.detail.link);
            // setType(event.detail.link);
            // let neighbors = getNeighbors(
            //     event.detail.link,
            //     graphData.links
            // ).nodes;
            // neighbors.splice(neighbors.indexOf(event.detail.node), 1);
            // let dependency = neighbors.map((data: any) => {
            //     if (

            //         event.detail.node.Dependencies?.includes(
            //             data.nodeName
            //         )
            //     ) {
            //         neighbors.splice(neighbors.indexOf(data), 1);
            //         return <li key={data.nodeName}>{data.nodeName}</li>;
            //     }
            // });
            // neighbors = neighbors.map((data: any) => {
            //     return <li key={data.nodeName}>{data.nodeName}</li>;
            // });
            // setDependencies(dependency);
            // setDepends(neighbors);
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
        depends,
        setShow,
        dependencies,
    };
};