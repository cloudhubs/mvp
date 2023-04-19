import React, { useState } from "react";
import Slider from "./Slider";
import data0 from "../../data/mock0.json";
import data1 from "../../data/mock1.json";
import data2 from "../../data/mock2.json";
import data3 from "../../data/mock3.json";
import data4 from "../../data/mock4.json";
import data5 from "../../data/mock5.json";

type Props = {
    max: number;
    setGraphData: any;
    graphTimeline: Array<any>;
    currentInstance: any;
    setCurrentInstance: any;
};
const TimeSlider: React.FC<Props> = ({
    max,
    setGraphData,
    graphTimeline,
    currentInstance,
    setCurrentInstance,
}) => {
    const [value, setValue] = useState(0);

    const handleChange = (e: any) => {
        setValue(e.target.value);
        setCurrentInstance(e.target.value);
        setGraphData(graphTimeline[e.target.value]);
    };
    return (
        <div className="absolute bottom-16 z-50 flex flex-col gap-2 text-sm bg-blue-300 bg-opacity-60 rounded-lg p-4 w-1/3">
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
                    className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer "
                />
                <h6>Time {value}</h6>
            </div>
        </div>
    );
};

export default TimeSlider;
