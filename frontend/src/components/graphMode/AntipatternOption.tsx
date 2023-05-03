import React from "react";
import PatternCounter from "../PatternCounter";

type Props = {
    onClick: React.MouseEventHandler<HTMLInputElement>;
    svg: any;
    patternCounterFn: Function;
    graphData: any;
    graphTimeline: any;
    currentInstance: number;
    threshold: number;
    patternName: string;
    prefixText: string;
};

const AntipatternOption: React.FC<Props> = ({
    onClick,
    svg,
    patternCounterFn,
    graphData,
    graphTimeline,
    currentInstance,
    threshold,
    patternName,
    prefixText,
}) => {
    return (
        <li>
            <input
                type="checkbox"
                id="react-option"
                value={patternName}
                className="hidden peer"
                onClick={onClick}
            />
            <label
                htmlFor="react-option"
                className="inline-flex items-center justify-center w-full p-5 
                text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer"
            >
                <div className="flex flex-col justify-center items-center text-center">
                    {svg}
                    <div className="w-full text-sm font-semibold">
                        {patternName}
                    </div>
                    <PatternCounter
                        counterFn={patternCounterFn}
                        graphData={graphData}
                        graphTimeline={graphTimeline}
                        currentInstance={currentInstance}
                        threshold={threshold}
                        prefixText={prefixText}
                    />
                </div>
            </label>
        </li>
    );
};

export default AntipatternOption;
