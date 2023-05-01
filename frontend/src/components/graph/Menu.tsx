import { useContextMenu } from "../../hooks/useContextMenu";
import { showNeighbors } from "../../utils/GraphFunctions";

export const Menu = () => {
    const {
        anchorPoint,
        show,
        node,
        graphData,
        setHideNodes,
        setGraphData,
        setGraphData2,
    } = useContextMenu();

    if (show) {
        return (
            <ul
                className="absolute right-0 z-10 rounded-lg mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bg-opacity-60"
                style={{ top: anchorPoint.y, left: anchorPoint.x }}
            >
                <button
                    onClick={onlyNeighbors}
                    className="inline-flex items-center justify-center w-full text-gray-700 block px-4 py-2 text-sm hover:bg-slate-200 hover:bg-opacity-60"
                >
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
                        <circle cx="12" cy="12" r="10" />
                        <path d="M16.2 7.8l-2 6.3-6.4 2.1 2-6.3z" />
                    </svg>
                    Show Neighbors
                </button>
                <button
                    onClick={highlightNode}
                    className="inline-flex items-center justify-center w-full text-gray-700 block px-4 py-2 text-sm hover:bg-slate-200 hover:bg-opacity-60"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 rounded-full mr-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#f1e906"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    Highlight Node
                </button>
                <button
                    onClick={trackNode}
                    className="inline-flex items-center justify-center w-full text-gray-700 block px-4 py-2 text-sm hover:bg-slate-200 hover:bg-opacity-60"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 rounded-full mr-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ab06f1"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="10" r="3" />
                        <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                    </svg>
                    Track Node
                </button>
                <button
                    onClick={deleteNode}
                    className="inline-flex items-center justify-center w-full text-gray-700 block px-4 py-2 text-sm hover:bg-slate-200 hover:bg-opacity-60"
                >
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
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                    Delete Node
                </button>
            </ul>
        );
    }

    function onlyNeighbors() {
        showNeighbors(node, graphData, setHideNodes);
    }

    function highlightNode() {}

    function trackNode() {}

    function deleteNode() {
        console.log(node);
        if (graphData != null) {
            //setHideNodes(node);
            let index = graphData.nodes.indexOf(node);
            setGraphData2(graphData.nodes.splice(index, 1));
        }
    }

    return <></>;
};

export default Menu;
