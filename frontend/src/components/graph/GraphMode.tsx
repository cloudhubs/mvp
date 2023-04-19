import React, { useState } from "react";
import Slider from "./Slider";

type Props = {
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
    highCoupling: any;
    setHighCoupling: any;
    antiPattern: any;
    setAntiPattern: any;
};
const GraphMode: React.FC<Props> = ({
    value,
    setValue,
    highCoupling,
    setHighCoupling,
    antiPattern,
    setAntiPattern,
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
        } else {
            setAntiPattern(true);
        }
    };

    const handleCoupling = (e: any) => {
        setHighCoupling(!highCoupling);
    };

    return (
        <div className="absolute top-2 left-2 z-50 flex flex-col gap-2 text-sm bg-blue-300 bg-opacity-60 rounded-lg p-4 w-44">
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
                            fill-rule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>
            </div>
            {open ? (
                <div
                    id="dropdown-states"
                    className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700"
                >
                    <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="states-button"
                    >
                        <li>
                            <button
                                type="button"
                                onClick={handleSelectMode}
                                value={"visual"}
                                className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <div className="inline-flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-3.5 w-3.5 rounded-full mr-2"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#227fe3"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    >
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                    Visual
                                </div>
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={handleSelectMode}
                                value={"anti-pattern"}
                                className="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                                <div className="inline-flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-3.5 w-3.5 rounded-full mr-2"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#e70f0f"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    >
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line
                                            x1="12"
                                            y1="8"
                                            x2="12"
                                            y2="12"
                                        ></line>
                                        <line
                                            x1="12"
                                            y1="16"
                                            x2="12.01"
                                            y2="16"
                                        ></line>
                                    </svg>
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
                <ul className="grid w-full gap-6 md:grid-cols-1">
                    <li>
                        <input
                            type="checkbox"
                            id="react-option"
                            value=""
                            className="hidden peer"
                            onClick={handleCoupling}
                        />
                        <label
                            htmlFor="react-option"
                            className="inline-flex items-center justify-center w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                        >
                            <div className="flex flex-col justify-center items-center text-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="mb-2 text-sky-500 w-7 h-7"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#227fe3"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                                </svg>
                                <div className="w-full text-sm font-semibold">
                                    High Coupling
                                </div>
                                {highCoupling ? (
                                    <Slider
                                        min={min}
                                        max={max}
                                        setMin={setMin}
                                        setMax={setMax}
                                        value={value}
                                        setValue={setValue}
                                    />
                                ) : (
                                    <></>
                                )}
                            </div>
                        </label>
                    </li>
                    <li>
                        <input
                            type="checkbox"
                            id="flowbite-option"
                            value=""
                            className="hidden peer"
                        />
                        <label
                            htmlFor="flowbite-option"
                            className="inline-flex items-center justify-center w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                        >
                            <div className="flex flex-col justify-center items-center text-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="mb-2 text-sky-500 w-7 h-7"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#ab06f1"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                                </svg>
                                <div className="w-full text-sm font-semibold">
                                    Cyclic Dependencies
                                </div>
                            </div>
                        </label>
                    </li>
                    <li>
                        <input
                            type="checkbox"
                            id="angular-option"
                            value=""
                            className="hidden peer"
                        />
                        <label
                            htmlFor="angular-option"
                            className="inline-flex items-center justify-center w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                        >
                            <div className="flex flex-col justify-center items-center text-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="mb-2 text-sky-500 w-7 h-7"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#e70f0f"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <line x1="12" y1="2" x2="12" y2="6"></line>
                                    <line
                                        x1="12"
                                        y1="18"
                                        x2="12"
                                        y2="22"
                                    ></line>
                                    <line
                                        x1="4.93"
                                        y1="4.93"
                                        x2="7.76"
                                        y2="7.76"
                                    ></line>
                                    <line
                                        x1="16.24"
                                        y1="16.24"
                                        x2="19.07"
                                        y2="19.07"
                                    ></line>
                                    <line x1="2" y1="12" x2="6" y2="12"></line>
                                    <line
                                        x1="18"
                                        y1="12"
                                        x2="22"
                                        y2="12"
                                    ></line>
                                    <line
                                        x1="4.93"
                                        y1="19.07"
                                        x2="7.76"
                                        y2="16.24"
                                    ></line>
                                    <line
                                        x1="16.24"
                                        y1="7.76"
                                        x2="19.07"
                                        y2="4.93"
                                    ></line>
                                </svg>
                                <div className="w-full text-sm font-semibold">
                                    Knot
                                </div>
                            </div>
                        </label>
                    </li>
                </ul>
            ) : (
                <></>
            )}
        </div>
    );
};

export default GraphMode;
