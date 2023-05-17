import React from "react";

type Props = {
    trackNodes: any;
    setTrackNodes: any;
    graphData: any;
    graphTimeline: any;
    currentInstance: number;
};

//TODO on click search graphData for nodeName and zoom to it, set as focus node
//TODO list antipattern changes (maybe in node info box?) by comparing
// graphTimeline[currentInstance/currentInstance - 1].nodes.find((node) => node.nodeName === trackNode) patterns
// TODO x button to remove track node
// TODO fix not updating until timeline shift??
const TrackNodeMenu: React.FC<Props> = ({
    trackNodes,
    setTrackNodes,
    graphData,
    graphTimeline,
    currentInstance,
}) => {
    const handleClick = (e: any) => {
        var result = graphData.nodes.filter((obj: any) => {
            return obj.nodeName === e.target.value
        })
        console.log(result)
        const event = new CustomEvent("nodeClick", {
            detail: { node: result[0] },
        });
        document.dispatchEvent(event);
    }

    const handleRemove = (e: any) => {
        if (trackNodes.includes(e.currentTarget.value)) {
            trackNodes.splice(
                trackNodes.findIndex(
                    (element: any) => element === e.currentTarget.value
                ),
                1
            );
            setTrackNodes([...trackNodes]);
        }
    }


    React.useEffect(() => {

    }, [trackNodes]);

    if (!trackNodes || trackNodes.length === 0) {
        return <></>;
    }
    return (
        <div className="absolute bottom-4 right-2 z-50 text-sm bg-blue-300 bg-opacity-60 rounded-lg p-4 w-64">
            <div className="bg-white items-center flex flex-col gap-2 rounded-lg p-4 bg-opacity-90">
                <div className="text-medium">Tracked Nodes:</div>
                    {trackNodes.map((node: any) => (
                        <div className="flex flex-row gap-2">
                        <button onClick={handleClick} value={node} className="p-1 bg-gray-300 hover:bg-gray-200" key={"trackNode: " + node}>{node}</button>
                        <button onClick={handleRemove} value={node} className="bg-red-200 p-2 hover:bg-red-100">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-trash" viewBox="0 0 16 16">
                                <path
                                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd"
                                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg></button>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default TrackNodeMenu;
