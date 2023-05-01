export interface SimpleOptions {
    text: string;
    is2d3d: string;
}

export type Node = {
    nodeName: string;
    nodeType: string;
    patterns: Array<Antipattern>;
};

export type Antipattern = {
    type: string;
};
