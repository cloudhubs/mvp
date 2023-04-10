import React, { useState } from "react";
import Slider from "./Slider";

type Props = {
    max: number;
};
const TimeSlider: React.FC<Props> = ({
    max
}) => {
    const [value, setValue] = useState(max);

    const handleChange = (e: any) => {
        setValue(e.currentTarget.value)
    };
    return (
        <div className="absolute bottom-16 items-center z-50 flex flex-col gap-2 text-sm bg-blue-300 bg-opacity-60 rounded-lg p-4 w-44">
            <div className="bg-white items-center flex flex-col gap-2 rounded-lg p-4 bg-opacity-90">
                <label htmlFor="steps-range" className="block mb-2 text-sm font-medium text-gray-700">Timeline</label>
                <input id="steps-range" type="range" min="0" max={max} value={value} onChange={handleChange} step="1"
                       className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
                <h6>Time {value}</h6>
            </div>

        </div>
    );
};

export default TimeSlider;
