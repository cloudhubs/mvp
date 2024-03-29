import React from "react";

type Props = {
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
    min: number;
    setMin: React.Dispatch<React.SetStateAction<number>>;
    max: number;
    setMax: React.Dispatch<React.SetStateAction<number>>;
};

const Slider: React.FC<Props> = ({
    value,
    setValue,
    min,
    setMin,
    max,
    setMax,
}) => {
    const handleInput = (e: any) => {
        setValue(e.target.value);
    };
    return (
        <div className="w-fit h-fit p-0 mt-2 bg-transparent accent-blue-300 border-none active:accent-blue-300">
            <label htmlFor="slider" className="h-fit">
                Threshold
            </label>
            <br />
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onInput={(e) => handleInput(e)}
                id="slider"
                className="my-1"
            />
            <p id="rangeValue">{value}</p>
        </div>
    );
};

export default Slider;
