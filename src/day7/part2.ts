import { promises as fs } from 'fs';

try {
    await main();
} catch (err) {
    console.log(`Uncaught exception: \n\n${err}`);
}

function createTree(terminalOutput: string[]): TreeNode {
    const root = createEmptyNode('/', -1, undefined);
    let currentNode: TreeNode = root;

    for (const output of terminalOutput) {
        const splitOutput = output.split(' ');
        if (splitOutput[0] === '$' && splitOutput[1] === 'cd') {
            const nextDir = splitOutput[2];
            switch (nextDir) {
                case '..':
                    currentNode = currentNode.parent ?? root;
                    break;
                case '/':
                    currentNode = root;
                    break;
                default:
                    currentNode = currentNode.children?.get(nextDir) ?? root;
            }
        } else if (splitOutput[0] !== '$') {
            if (currentNode.children?.get(splitOutput[1])) {
                continue;
            }

            const size = splitOutput[0] == 'dir' ? -1 : +splitOutput[0];
            currentNode.children?.set(
                splitOutput[1],
                createEmptyNode(splitOutput[1], size, currentNode)
            );
        }
    }

    return root;
}

function createEmptyNode(name: string, size: number, parent?: TreeNode): TreeNode {
    const node: TreeNode = {
        name: name,
        size: size,
        children: new Map<string, TreeNode>(),
        parent: parent
    };

    return node;
}

function inflateDirSizes(node: TreeNode): number {
    // If the node is a directory, recursively inflate its size
    if (node.size === -1) {
        let sum = 0;
        node.children!.forEach((child) => (sum += inflateDirSizes(child)));
        node.size = sum;
    }

    return node.size;
}

function getSizeArray(node: TreeNode): number[] {
    let childSizes: number[] = [];

    if (node.children?.size != 0) {
        node.children?.forEach((child) => {
            childSizes = childSizes.concat(getSizeArray(child));
        });
    } else {
        childSizes.push(node.parent?.size ?? 0);
    }

    return childSizes;
}

function findLeastDeleteDir(root: TreeNode): number {
    const minSizeNeeded = root.size - 40000000;

    const sizes = getSizeArray(root);
    const filteredSizes = sizes.filter((e) => e >= minSizeNeeded).sort((a, b) => a - b);

    return filteredSizes[0];
}

// First guess: 41272621 (high)
// Second guess:
async function main() {
    const data = await fs.readFile('input/day7.txt', 'utf-8');
    const terminalOutput = data.split('\n');
    const tree = createTree(terminalOutput);
    inflateDirSizes(tree);
    console.log(findLeastDeleteDir(tree));
}

interface TreeNode {
    children?: Map<string, TreeNode>; // type for a known property.
    parent?: TreeNode;
    name: string;
    size: number;
}
