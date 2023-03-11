import { useEffect, useCallback, useState } from "react";

export const useContextMenu = () => {
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
    const [show, setShow] = useState(false);
    const [node, setNode] = useState(null);
    const [graphData, setGraphData] = useState(null);
    let setHideNodes;

    const handleContextMenu = useCallback(
        (event: any) => {
            event.preventDefault();
            setAnchorPoint(event.detail.coords);
            setShow(true);
            setNode(event.detail.node);
            setGraphData(event.detail.graphData);
            setHideNodes = event.detail.setHideNodes;
        },
        [setShow, setAnchorPoint]
    );

    const handleClick = useCallback(
        () => (show ? setShow(false) : null),
        [show]
    );

    useEffect(() => {
        document.addEventListener("click", handleClick);
        document.addEventListener("nodecontextmenu", handleContextMenu);
        return () => {
            document.removeEventListener("click", handleClick);
            document.removeEventListener("nodecontextmenu", handleContextMenu);
        };
    });
    return { anchorPoint, show, node, graphData, setHideNodes };
};