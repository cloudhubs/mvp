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
};
const TimeSlider: React.FC<Props> = ({ max, setGraphData }) => {
    const [value, setValue] = useState(max);

    const handleChange = (e: any) => {
        setValue(e.currentTarget.value);
        switch (e.currentTarget.value) {
            case "5":
                setGraphData(data5);
                break;
            case "4":
                setGraphData(data4);
                break;
            case "3":
                setGraphData(data3);
                break;
            case "2":
                setGraphData(data2);
                break;
            case "1":
                setGraphData(data1);
                break;
            case "0":
                setGraphData(data0);
                break;
        }
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
                    max={max}
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
