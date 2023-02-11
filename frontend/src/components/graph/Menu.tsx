import { useContextMenu } from "../../hooks/useContextMenu";

export const Menu = () => {
    const { anchorPoint, show } = useContextMenu();

    if (show) {
        return (
            <ul
                className="absolute flex flex-col bg-blue-300 bg-opacity-60 gap-2 rounded-lg p-4"
                style={{ top: anchorPoint.y, left: anchorPoint.x }}
            >
                <button onClick={showNeighbors} className="hover:text-slate-500">
                    Show Neighbors
                </button>
                <button onClick={highlightNode} className="hover:text-slate-500">
                    Highlight Node
                </button>
                <button onClick={trackNode} className="hover:text-slate-500">
                    Track Node
                </button>
            </ul>
        );
    }

    function showNeighbors() {

    }

    function highlightNode() {

    }

    function trackNode() {

    }

    return <></>;
};

export default Menu;