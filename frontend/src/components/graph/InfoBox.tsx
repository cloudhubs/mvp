import { useInfoBox } from "../../hooks/useInfoBox";
import { useInfoBoxLink } from "../../hooks/useInfoBoxLink";

export const InfoBox = () => {
    const { anchorPoint: nodeAnchor, show: nodeShow, name, type, depends, setShow, dependencies } = useInfoBox();
    const { anchorPoint: linkAnchor, show: linkShow, setShow: linkSetShow, source, target, links } = useInfoBoxLink();

    if (nodeShow) {
        return (
            <ul
                className="absolute flex flex-col bg-slate-200 bg-opacity-80 gap-2 rounded-lg p-4 ml-80"
                style={{ top: nodeAnchor.y, left: nodeAnchor.x }}
            >
                <p>Name: {name}</p>
                <p>Type: {type}</p>
                <ul className="list-disc list-inside">
                    Dependencies: {dependencies}
                </ul>
                <ul className="list-disc list-inside">
                    Depends On: {depends}
                </ul>
                <button
                    onClick={() => setShow(false)}
                    className="hover:blue-green-gradient-text hover:border-blue-green-gradient-text border-black border-2"
                >
                    Close Box
                </button>
            </ul>
        );
    }
    else if (linkShow) {
        return (
            <ul
                className="absolute flex flex-col bg-slate-200 bg-opacity-80 gap-2 rounded-lg p-4 ml-80"
                style={{ top: linkAnchor.y, left: linkAnchor.x }}
            >
                <p>Source: {source}</p>
                <p>Target: {target}</p>
                <ul className="list-disc list-inside">
                    Rest Calls: {links.map((link : any) => <li key={link.source}>{link.type} {link.uri}</li>)}
                </ul>
                <button
                    onClick={() => linkSetShow(false)}
                    className="hover:blue-green-gradient-text hover:border-blue-green-gradient-text border-black border-2"
                >
                    Close Box
                </button>
            </ul>
        )
    }
    return <></>;
};
