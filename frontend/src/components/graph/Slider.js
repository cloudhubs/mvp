import React, { useState } from "react";

const Slider = () => {
    const [value, setValue] = useState(8);

    const handleInput = (e) => {
        setValue(e.target.value);
    };
    return (
        <div className="w-full h-fit p-0 my-4 bg-transparent accent-gray-50 border-none active:accent-cyan-300">
            <label htmlFor="slider" className="h-fit">
                Threshold
            </label>
            <br />
            <input
                type="range"
                min="0"
                max="100"
                value={value}
                onInput={(e) => handleInput(e)}
                id="slider"
                className="my-2"
            />
            <p id="rangeValue">{value}</p>
        </div>
    );
};

export default Slider;
