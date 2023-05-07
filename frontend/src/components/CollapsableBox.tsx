import React, { useState } from "react";

type Props = {
    initOpen?: boolean;
    svg: any;
    title: any;
    body: any;
};

const CollapsableBox: React.FC<Props> = ({ initOpen, svg, title, body }) => {
    const [open, setOpen] = useState(initOpen);
    return (
        <div className="rounded-lg border border-neutral-200 bg-white mr-2 p-2 break-words">
            <h2 className="mb-0" id="headingOne">
                <button
                    className="group relative flex w-full items-center rounded-t-md border-0 
                bg-white p-1 text-left text-base text-neutral-800 transition
                font-medium uppercase"
                    type="button"
                    aria-controls="collapseOne"
                    onClick={(e) => setOpen(!open)}
                >
                    {title}
                    <span
                        className={`ml-auto h-5 w-5 shrink-0  fill-[#336dec] 
                duration-200 ease-in-out ${open ? `rotate-180` : ``}`}
                    >
                        {svg}
                    </span>
                </button>
            </h2>
            <div
                id="collapseOne"
                className="!visible"
                aria-labelledby="headingOne"
            >
                <div
                    className={`duration-200 ease-in-out ${
                        open ? `max-h-fit` : `h-0`
                    }`}
                >
                    <div
                        className={`duration-200 ease-in-out p-2 ${
                            open ? `block` : `hidden`
                        }`}
                    >
                        {body}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CollapsableBox;
