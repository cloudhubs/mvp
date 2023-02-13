import React from "react";

type Props = {
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
};

const Slider: React.FC<Props> = ({ value, setValue }) => {
    const handleInput = (e: any) => {
        setValue(e.target.value);
    };
    return (
        <div className="w-full h-fit p-0 my-4 bg-transparent accent-blue-300 border-none active:accent-blue-300">
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
