import { useContextMenu } from "../../hooks/useContextMenu";

export const Menu = () => {
    const { anchorPoint, show } = useContextMenu();

    if (show) {
        return (
            <ul
                className="absolute flex flex-col bg-slate-900 bg-opacity-80 gap-2 rounded-lg p-4"
                style={{ top: anchorPoint.y, left: anchorPoint.x }}
            >
                <button onClick={showNeighbors} className="hover:blue-green-gradient-text">
                    Show Neighbors
                </button>
                <button onClick={highlightNode} className="hover:blue-green-gradient-text">
                    Highlight Node
                </button>
                <button onClick={trackNode} className="hover:blue-green-gradient-text">
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