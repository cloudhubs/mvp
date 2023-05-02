import React, { useMemo } from "react";

type Props = {
    counterFn: Function;
    currentInstance: number;
    graphTimeline: any[];
    graphData: any;
    threshold: number;
};

const PatternCounter: React.FC<Props> = ({
    counterFn,
    currentInstance,
    graphTimeline,
    graphData,
    threshold,
}) => {
    const { oldCount, currentCount } = useMemo(() => {
        let oldCount, currentCount;
        if (currentInstance == 0) {
            oldCount = null;
        } else {
            oldCount = counterFn(graphTimeline[currentInstance - 1], threshold);
        }
        currentCount = counterFn(graphData);
        return { oldCount, currentCount };
    }, [counterFn, graphData, graphTimeline, currentInstance, threshold]);

    let textColor = "text-gray-800";
    if (oldCount && oldCount > currentCount) {
        textColor = "text-green-600";
    } else if (oldCount && currentCount > oldCount) {
        textColor = "text-red-600";
    }

    return (
        <div className={`text-sm font-medium ${textColor}`}>
            {oldCount ? (
                <>
                    {oldCount} &rarr; {currentCount}
                </>
            ) : (
                <>{currentCount}</>
            )}
        </div>
    );
};

export default PatternCounter;
