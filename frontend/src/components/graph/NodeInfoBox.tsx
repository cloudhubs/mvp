import { useInfoBox } from "../../hooks/useInfoBox";

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
                <ul className="list-disc list-inside">
                    <div className="font-medium">Dependencies:</div>
                    {dependencies && dependencies.length > 0 ? (
                        dependencies.map((link: any) => (

                            <div>
                                <div className="rounded-t-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                                    <h2 className="mb-0" id="headingOne">
                                        <button
                                            className="group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
                                            type="button"
                                            aria-controls="collapseOne">
                                            {link.target.nodeName}
                                            <span className="ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                            </svg>
                                            </span>
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseOne"
                                        className="!visible"
                                        aria-labelledby="headingOne">
                                        <div className="px-5 py-4">
                                            {link.requests && link.requests.length > 0 ? (
                                                link.requests.map((func: any) => (
                                                    <li className="margin-left: 20px">{func.type + "\n" + func.msReturn + "\n"
                                                        + func.endPointFunction + "(\n" + func.argument + ")"}</li>
                                                ))
                                            ) : (
                                                <div>None</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>None</div>
                    )}
                </ul>
                <ul className="list-disc list-inside">
                    <div className="font-medium">Depends On:</div>
                    {depends && depends.length > 0 ? (
                        depends.map((link: any) => (
                            <div>
                                <div className="rounded-t-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800">
                                    <h2 className="mb-0" id="headingOne">
                                        <button
                                            className="group relative flex w-full items-center rounded-t-[15px] border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-neutral-800 dark:text-white [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:text-primary [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:bg-neutral-800 dark:[&:not([data-te-collapse-collapsed])]:text-primary-400 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
                                            type="button"
                                            aria-controls="collapseOne2">
                                            {link.target.nodeName}
                                            <span className="ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                            </svg>
                                            </span>
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseOne2"
                                        className="!visible"
                                        aria-labelledby="headingOne">
                                        <div className="px-5 py-4">
                                            {link.requests && link.requests.length > 0 ? (
                                                link.requests.map((func: any) => (
                                                    <li className="margin-left: 20px">{func.type + "\n" + func.msReturn + "\n"
                                                        + func.endPointFunction + "(\n" + func.argument + ")"}</li>
                                                ))
                                            ) : (
                                                <div>None</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
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

// const html = (
//     <div>
//         <input id="menuToggle" type="checkbox" />
//         <div className="infobox md-card">
//             <div className="md-card-content">
//                 <h2 id="nodeName">Name</h2>
//                 <p id="nodeType">Type</p>
//                 <ul id="endpoints" className="endpoints"></ul>
//                 <p id="dependencyNum">Number</p>
//                 <p>
//                     <b>Dependencies:</b>
//                 </p>
//                 <ul className="dependencies">
//                     <li className="md-caption">Coffee</li>
//                     <li className="md-caption">Tea</li>
//                     <li className="md-caption">Milk</li>
//                 </ul>
//                 <p id="dependentNum">Number</p>
//                 <p>
//                     <b>Dependents:</b>
//                 </p>
//                 <ul className="dependson">
//                     <li className="md-caption">Coffee</li>
//                     <li className="md-caption">Tea</li>
//                     <li className="md-caption">Milk</li>
//                 </ul>
//             </div>
//             <div className="md-card-btns">
//                 <label
//                     htmlFor="menuToggle"
//                     className="md-button"
//                     onClick="closeBox()"
//                 >
//                     Close Box
//                 </label>
//             </div>
//         </div>
//     </div>
// );
