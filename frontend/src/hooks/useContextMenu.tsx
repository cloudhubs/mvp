import { useEffect, useCallback, useState } from "react";

export const useContextMenu = () => {
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
    const [show, setShow] = useState(false);
    const [node, setNode] = useState<any>(null);
    const [graphData, setGraphData] = useState<any>(null);
    let setHideNodes: any;
    let setGraphData2: any;

    const handleContextMenu = useCallback(
        (event: any) => {
            console.log(event.detail)
            event.preventDefault();
            setAnchorPoint(event.detail.coords);
            setShow(true);
            setNode(event.detail.node);
            setGraphData(event.detail.graphData);
            setHideNodes = event.detail.setHideNodes;
            setGraphData2 = event.detail.setGraphData;
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
    return { anchorPoint, show, node, graphData, setHideNodes, setGraphData, setGraphData2 };
};
