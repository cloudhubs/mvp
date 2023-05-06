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
    React.useEffect(() => {}, [trackNodes]);

    if (!trackNodes || trackNodes.length === 0) {
        return <></>;
    }
    return (
        <div className="absolute bottom-4 right-2 z-50 text-sm bg-blue-300 bg-opacity-60 rounded-lg p-4 w-44">
            <div className="bg-white items-center flex flex-col gap-2 rounded-lg p-4 bg-opacity-90">
                <div className="text-medium">Tracked Nodes:</div>
                <ul className="flex flex-col gap-2">
                    {trackNodes.map((node: any) => (
                        <li key={"trackNode: " + node}>{node}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TrackNodeMenu;
