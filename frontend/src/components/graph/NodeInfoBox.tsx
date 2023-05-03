import { useInfoBox } from "../../hooks/useInfoBox";

export const InfoBox = () => {
    const { anchorPoint, show, name, type, depends, setShow, dependencies } =
        useInfoBox();

    return (
        <ul
            className={`absolute flex-col top-1/2 left-2/3 bg-slate-200 bg-opacity-80 gap-2 rounded-lg p-4
                ${show ? `flex` : `hidden`}`}
            style={{ top: anchorPoint.y, left: anchorPoint.x }}
        >
            <p>Name: {name}</p>
            <p>Type: {type}</p>
            <ul className="list-disc list-inside">
                Dependencies: {dependencies}
            </ul>
            <ul className="list-disc list-inside">Depends On: {depends}</ul>
            <button
                onClick={() => setShow(false)}
                className="hover:blue-green-gradient-text"
            >
                Close Box
            </button>
        </ul>
    );
};
