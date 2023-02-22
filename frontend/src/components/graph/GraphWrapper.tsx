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
    antiPattern: any;
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
    antiPattern
}) => {
    const Shared2D3DProps: SharedProps = {
        linkDirectionalArrowRelPos: 1,
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
                    threshold={threshold}
                    setInitCoords={setInitCoords}
                    setInitRotation={setInitRotation}
                    highCoupling={highCoupling}
                    antiPattern={antiPattern}
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
                    antiPattern={antiPattern}
                />
            )}
        </div>
    );
};

export default VisualizationOptions;
