import { SetStateAction, useEffect, useState } from "react";
import { useInfoBox } from "../../hooks/useInfoBox";
import CollapsableBox from "../CollapsableBox";

type Props = {
    graphData: any;
    focusNode: any;
    setFocusNode: any;
};

export const InfoBox = (props: Props) => {
    const { anchorPoint, show, name, type, depends, setShow, dependencies } =
        useInfoBox(props.graphData, props.setFocusNode);

    return (
        <ul
            className={`absolute flex-col top-[10%] left-[60%] bg-slate-200 bg-opacity-90 gap-2 rounded-lg p-4 max-h-96
                ${show ? `flex` : `hidden`}`}
            style={{ top: anchorPoint.y, left: anchorPoint.x }}
        >
            <p>Name: {name}</p>
            <p>Type: {type}</p>
            <div className="max-h-96 w-96 overflow-y-scroll dark-scrollbar">
                <ul className="list-disc list-inside my-2">
                    <div className="font-medium mb-2">Dependencies:</div>
                    {dependencies && dependencies.length > 0 ? (
                        dependencies.map((link: any) => (
                            <CollapsableBox
                                title={link.target.nodeName}
                                svg={arrowSvg}
                                body={
                                    link.requests &&
                                    link.requests.length > 0 ? (
                                        link.requests.map((func: any) => (
                                            <ul className="">
                                                <li className="font-medium">
                                                    {func.type}
                                                </li>
                                                <li className="font-mono text-cyan-600">
                                                    {func.msReturn}
                                                </li>
                                                <li className="font-light font-mono">
                                                    {func.endpointFunction}
                                                </li>
                                                <li>{func.argument}</li>
                                            </ul>
                                        ))
                                    ) : (
                                        <div>None</div>
                                    )
                                }
                                initOpen={false}
                            />
                        ))
                    ) : (
                        <div>None</div>
                    )}
                </ul>
                <ul className="list-disc list-inside">
                    <div className="font-medium my-2">Depends On:</div>
                    {depends && depends.length > 0 ? (
                        depends.map((link: any) => (
                            <CollapsableBox
                                title={link.source.nodeName}
                                svg={arrowSvg}
                                body={
                                    link.requests &&
                                    link.requests.length > 0 ? (
                                        link.requests.map((func: any) => (
                                            <ul className="">
                                                <li className="font-medium">
                                                    {func.type}
                                                </li>
                                                <li className="font-mono text-cyan-600">
                                                    {func.msReturn}
                                                </li>
                                                <li className="font-light font-mono">
                                                    {func.endpointFunction}
                                                </li>
                                                <li>{func.argument}</li>
                                            </ul>
                                        ))
                                    ) : (
                                        <div>None</div>
                                    )
                                }
                                initOpen={false}
                            />
                        ))
                    ) : (
                        <div>None</div>
                    )}
                </ul>
            </div>

            <button
                onClick={() => {
                    props.setFocusNode(null);
                    setShow(false);
                }}
                className="hover:font-bold font-medium hover:text-cyan-600"
            >
                Close Box
            </button>
        </ul>
    );
};

const arrowSvg = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="h-6 w-6"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
    </svg>
);
