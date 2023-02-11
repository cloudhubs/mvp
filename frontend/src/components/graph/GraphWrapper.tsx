import React from 'react';
import { ForceGraphProps as SharedProps } from 'react-force-graph-2d';

import Graph2D from './Graph2D';
import Graph3D from './Graph3D';

import myData from '../../data/trainticket.json';

type Props = {
    width: number;
    height: number;
    search: string;
    threshold: number;
};

const is2d3d = '2d';

const VisualizationOptions: React.FC<Props> = ({width, height, search, threshold}) => {
    const Shared2D3DProps: SharedProps = {
        linkDirectionalArrowColor: () => 'rgba((102,102,153,0.8)',
        linkColor: () => 'rgba(102,102,153,0.8)',
        linkDirectionalArrowLength: 4,
        linkDirectionalArrowRelPos: 1,
        nodeAutoColorBy: 'id',
        graphData: myData,
    };

    const GraphProps = {
        sharedProps: Shared2D3DProps,
    };

    return <div>{is2d3d !== '2d' ? <Graph2D width={width} height={height} {...GraphProps} /> : <Graph3D width={width}
                                                                                                   height={height} {...GraphProps} search={search} threshold={threshold}/>}</div>;
};

export default VisualizationOptions;