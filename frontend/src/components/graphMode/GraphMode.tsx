import React, { useState } from "react";
import Slider from "./Slider";
import {
    countBottleneck,
    countCyclic,
    countHighCoupling,
} from "../../utils/antipatternUtils";
import AntipatternOption from "./AntipatternOption";

type Props = {
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
    antiPattern: any;
    setAntiPattern: any;
    selectedAntiPattern: any;
    setSelectedAntiPattern: any;
    graphData: any;
    currentInstance: any;
    graphTimeline: any;
};
const GraphMode: React.FC<Props> = ({
    value,
    setValue,
    antiPattern,
    setAntiPattern,
    selectedAntiPattern,
    setSelectedAntiPattern,
    graphData,
    currentInstance,
    graphTimeline,
}) => {
    const [open, setOpen] = useState(false);

    const [min, setMin] = useState(0);
    const [max, setMax] = useState(50);

    const handleClick = (e: any) => {
        setOpen(!open);
    };

    const handleSelectMode = (e: any) => {
        setOpen(!open);
        if (e.currentTarget.value === "visual") {
            setAntiPattern(false);
            setSelectedAntiPattern("none");
        } else {
            setAntiPattern(true);
        }
    };

    const handleSelectPattern = (e: any) => {
        setSelectedAntiPattern(e.target.value);
    };

    return (
        <div className="absolute top-2 left-2 z-50 flex flex-col gap-2 text-sm bg-blue-300 bg-opacity-60 rounded-lg p-4 w-52 max-h-full">
            <div>
                <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    Mode
                    <svg
                        className="-mr-1 ml-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>
            {open ? (
                <div
                    id="dropdown-states"
                    className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-full"
                >
                    <ul
                        className="py-2 text-sm text-gray-700"
                        aria-labelledby="states-button"
                    >
                        <li>
                            <button
                                type="button"
                                onClick={handleSelectMode}
                                value={"visual"}
                                className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                            >
                                <div className="inline-flex items-center">
                                    {visualSvg}
                                    Visual
                                </div>
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={handleSelectMode}
                                value={"anti-pattern"}
                                className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                            >
                                <div className="inline-flex items-center">
                                    {antiPatternSvg}
                                    Anti-Pattern
                                </div>
                            </button>
                        </li>
                    </ul>
                </div>
            ) : (
                <></>
            )}
            {antiPattern ? (
                <div className="grid w-full gap-6 md:grid-cols-1">
                    <div className="flex items-center justify-center">
                        <Slider
                            min={min}
                            max={max}
                            setMin={setMin}
                            setMax={setMax}
                            value={value}
                            setValue={setValue}
                        />
                    </div>
                    <ul
                        className={
                            "dark-scrollbar overflow-y-scroll -m-1 pr-2 flex flex-col gap-2 h-96"
                        }
                    >
                        <AntipatternOption
                            currentInstance={currentInstance}
                            graphData={graphData}
                            graphTimeline={graphTimeline}
                            onClick={handleSelectPattern}
                            threshold={value}
                            patternCounterFn={countHighCoupling}
                            patternName="High Coupling"
                            svg={couplingSvg}
                            prefixText="Nodes above threshold: "
                        />
                        <AntipatternOption
                            currentInstance={currentInstance}
                            graphData={graphData}
                            graphTimeline={graphTimeline}
                            onClick={handleSelectPattern}
                            threshold={value}
                            patternCounterFn={countCyclic}
                            patternName="Cyclic Dependency"
                            svg={cyclicSvg}
                            prefixText="Cycles: "
                        />
                        <AntipatternOption
                            currentInstance={currentInstance}
                            graphData={graphData}
                            graphTimeline={graphTimeline}
                            onClick={handleSelectPattern}
                            threshold={value}
                            patternCounterFn={countBottleneck}
                            patternName="Bottleneck"
                            svg={bottleneckSvg}
                            prefixText="Nodes above threshold: "
                        />
                    </ul>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default GraphMode;

const bottleneckSvg = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mb-2 text-sky-500 w-7 h-7"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#e70f0f"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <line x1="12" y1="2" x2="12" y2="6"></line>
        <line x1="12" y1="18" x2="12" y2="22"></line>
        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
        <line x1="2" y1="12" x2="6" y2="12"></line>
        <line x1="18" y1="12" x2="22" y2="12"></line>
        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
    </svg>
);

const cyclicSvg = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mb-2 text-sky-500 w-7 h-7"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ab06f1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
    </svg>
);

const couplingSvg = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mb-2 text-sky-500 w-7 h-7"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#227fe3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
    </svg>
);

const visualSvg = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-3.5 w-3.5 rounded-full mr-2"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#227fe3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    </svg>
);

const antiPatternSvg = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-3.5 w-3.5 rounded-full mr-2"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#e70f0f"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
);
