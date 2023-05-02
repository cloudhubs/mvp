import React, { useEffect, useMemo, useState } from "react";

type Props = {
    counterFn: Function;
    currentInstance: number;
    graphTimeline: any[];
    graphData: any;
    threshold?: number;
    prefixText: string;
};

const PatternCounter: React.FC<Props> = ({
    counterFn,
    currentInstance,
    graphTimeline,
    graphData,
    threshold,
    prefixText,
}) => {
    const [oldCount, setOldCount] = useState<number | null>();
    const [currentCount, setCurrentCount] = useState<number>();

    let textColor = "text-gray-800";
    if (oldCount != null && currentCount != null && oldCount > currentCount) {
        textColor = "text-green-600";
    } else if (
        oldCount != null &&
        currentCount != null &&
        currentCount > oldCount
    ) {
        textColor = "text-red-600";
    }

    useEffect(() => {
        let old = null;
        let cur = null;
        if (currentInstance !== 0) {
            old = counterFn(graphTimeline[currentInstance - 1], threshold);
        }

        cur = counterFn(graphTimeline[currentInstance], threshold);
        setOldCount(old);
        setCurrentCount(cur);
    }, [counterFn, currentInstance, graphTimeline, threshold]);

    return (
        <div className={`text-sm font-medium ${textColor}`}>
            <span className="font-normal">{prefixText}</span>
            {oldCount != null ? (
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
