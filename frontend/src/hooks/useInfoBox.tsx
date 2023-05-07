import { useEffect, useCallback, useState } from "react";
import { getNeighbors } from "../utils/GraphFunctions";

export const useInfoBox = (graphData: any, setFocusNode: any) => {
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
    const [show, setShow] = useState<boolean>(false);
    const [name, setName] = useState<string>();
    const [type, setType] = useState<string>();
    const [depends, setDepends] = useState<any[]>();
    const [dependencies, setDependencies] = useState<any[]>();

    const handleClick = useCallback(
        (event: any) => {
            setAnchorPoint({ x: event.pageX, y: event.pageY });
            setName(event.detail.node.nodeName);
            setType(event.detail.node.nodeType);

            let neighbors = getNeighbors(
                event.detail.node,
                graphData.nodes,
                graphData.links
            );

            const neighborNames = neighbors.nodes.map(
                (node: any) => node.nodeName
            );

            setFocusNode({
                node: event.detail.node.nodeName,
                neighbors: neighborNames,
            });

            const dependsOn = neighbors.nodeLinks
                .filter(
                    (link: any) =>
                        event.detail.node.nodeName === link.target.nodeName
                )
                .map((link: any) => link);
            const dependencies = neighbors.nodeLinks
                .filter(
                    (link: any) =>
                        event.detail.node.nodeName === link.source.nodeName
                )
                .map((link: any) => link);

            setDependencies(dependencies);
            setDepends(dependsOn);
            setShow(true);
        },
        [setShow, setAnchorPoint]
    );

    // const handleLClick = useCallback(
    //     () => (show ? setShow(false) : null),
    //     [show]
    // );

    useEffect(() => {
        if (!show) {
            setFocusNode(null);
        }
    }, [show]);

    useEffect(() => {
        document.addEventListener("nodeClick", handleClick);
        // document.addEventListener("click", handleLClick);
        return () => {
            document.removeEventListener("nodeClick", handleClick);
            // document.removeEventListener("click", handleLClick);
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
