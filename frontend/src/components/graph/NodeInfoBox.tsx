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
                        dependencies.map((node: any) => (
                            <li key={node.nodeName}>{node.nodeName}</li>
                        ))
                    ) : (
                        <div>None</div>
                    )}
                </ul>
                <ul className="list-disc list-inside">
                    <div className="font-medium">Depends On:</div>
                    {depends && depends.length > 0 ? (
                        depends.map((node: any) => (
                            <li key={node.nodeName}>{node.nodeName}</li>
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
