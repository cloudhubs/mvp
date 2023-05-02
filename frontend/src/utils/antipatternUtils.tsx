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

export { countCyclic };
