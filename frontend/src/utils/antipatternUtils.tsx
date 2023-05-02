function countCyclic(graphData: any, threshold: number) {
    const cyclicIds = graphData.nodes
        .filter((node: any) =>
            node.patterns.find(
                (pattern: any) => pattern.type === "Cyclic Dependency"
            )
        )
        .map((node: any) => {
            const cyclic = node.patterns.find(
                (pattern: any) => pattern.type === "Cyclic Dependency"
            );
            return cyclic.id;
        });
    return new Set(cyclicIds).size;
}

function countBottleneck(graphData: any, threshold: number) {
    return graphData.nodes.filter((node: any) => {
        let bottleneck = node.patterns.find(
            (pattern: any) => pattern.type == "Bottleneck"
        );
        return bottleneck?.threshold > threshold;
    }).length;
}

/**
 * Really really important note to preserver your SANITY.
 *
 * Javascript console logs will not always reflect objects as they are.
 * I spent 2 hours trying to figure out why this didn't work.
 * The console showed the links as having source/target as node objects,
 * but in reality they are strings for a split second when this function is called.
 *
 * I dont know why.
 *
 * It finally works though ;-;
 */
function countHighCoupling(graphData: any, threshold: number) {
    let len = graphData.nodes.filter((node: any) => {
        let neighborLinks = graphData.links.filter(
            (link: any) =>
                link.source.nodeName == node.nodeName ||
                link.target.nodeName == node.nodeName ||
                // In case of the above issue
                link.source == node.nodeName ||
                link.target == node.nodeName
        );

        const neighborNodes = neighborLinks.map((link: any) => {
            if (
                link.source.nodeName == node.nodeName ||
                // In case of the above issue
                link.source == node.nodeName
            ) {
                return link.target;
            } else {
                return link.source;
            }
        });

        return neighborNodes.length > threshold;
    }).length;

    return len;
}

export { countCyclic, countHighCoupling, countBottleneck };
