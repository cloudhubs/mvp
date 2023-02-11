import React, { useRef } from 'react';
import ForceGraph2D, { ForceGraphMethods, ForceGraphProps } from 'react-force-graph-2d';

type Props = {
    width: number;
    height: number;
    sharedProps: ForceGraphProps;
};

const Graph: React.FC<Props> = ({ width, height, sharedProps }) => {
    const graphRef = useRef<ForceGraphMethods>();

    return <ForceGraph2D {...sharedProps} ref={graphRef} width={width} height={height} warmupTicks={100} />;
};

export default Graph;