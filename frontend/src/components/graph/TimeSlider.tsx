import React, { useState } from "react";

type Props = {
    max: number;
    setGraphData: any;
    graphTimeline: Array<any>;
    currentInstance: any;
    setCurrentInstance: any;
    setDefNodeColor: any;
};
const TimeSlider: React.FC<Props> = ({
    max,
    setGraphData,
    graphTimeline,
    currentInstance,
    setCurrentInstance,
    setDefNodeColor,
}) => {
    const [value, setValue] = useState(0);

    const handleChange = (e: any) => {
        setValue(e.target.value);
        setCurrentInstance(parseInt(e.target.value));
        setGraphData(graphTimeline[e.target.value]);
        setDefNodeColor(false);
    };
    return (
        <div className="absolute bottom-4 z-50 flex flex-col gap-2 text-sm bg-blue-300 bg-opacity-60 rounded-lg p-4 w-1/3">
            <div className="bg-white items-center flex flex-col gap-2 rounded-lg p-4 bg-opacity-90">
                <label
                    htmlFor="steps-range"
                    className="block pb-2 text-sm font-medium text-gray-700"
                >
                    Timeline
                </label>
                <input
                    id="steps-range"
                    type="range"
                    min="0"
                    max={graphTimeline.length - 1}
                    value={value}
                    onChange={handleChange}
                    step="1"
                    className="w-full h-2  rounded-lg appearance-none cursor-pointer bg-gray-300"
                />
                <div className="flex flex-col text-xs font-light font-mono w-full">
                    <div className="font-medium text-base font-serif">
                        Iteration {value}
                    </div>
                    <div>
                        Commit #{graphTimeline[currentInstance].gitCommitId}
                    </div>
                    <div>
                        Created {graphTimeline[currentInstance].createDate}
                    </div>
                    <div>
                        Modified {graphTimeline[currentInstance].modifyDate}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimeSlider;
