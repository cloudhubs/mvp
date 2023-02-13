import React from "react";
import { ForceGraphProps as SharedProps } from "react-force-graph-2d";

import Graph2D from "./Graph2D";
import Graph3D from "./Graph3D";

type Props = {
    width: number;
    height: number;
    search: string;
    threshold: number;
    graphRef: any;
    graphData: any;
    setInitCoords: any;
    setInitRotation: any;
    highCoupling: any;
    is3d: any;
};

const VisualizationOptions: React.FC<Props> = ({
    width,
    height,
    search,
    threshold,
    graphRef,
    graphData,
    setInitCoords,
    setInitRotation,
    highCoupling,
    is3d,
}) => {
    const Shared2D3DProps: SharedProps = {
        linkDirectionalArrowColor: () => "rgba((102,102,153,0.8)",
        linkColor: () => "rgba(102,102,153,0.8)",
        linkDirectionalArrowLength: 4,
        linkDirectionalArrowRelPos: 1,
        nodeAutoColorBy: "nodeName",
        graphData: graphData,
    };

    const GraphProps = {
        sharedProps: Shared2D3DProps,
    };

    return (
        <div>
            {!is3d ? (
                <Graph2D
                    width={width}
                    height={height}
                    {...GraphProps}
                    search={search}
                    graphRef={graphRef}
                    setInitCoords={setInitCoords}
                    setInitRotation={setInitRotation}
                    highCoupling={highCoupling}
                />
            ) : (
                <Graph3D
                    width={width}
                    height={height}
                    {...GraphProps}
                    search={search}
                    threshold={threshold}
                    graphRef={graphRef}
                    setInitCoords={setInitCoords}
                    setInitRotation={setInitRotation}
                    highCoupling={highCoupling}
                />
            )}
        </div>
    );
};

export default VisualizationOptions;
