import { promises as fs } from 'fs';

try {
    await main();
} catch (err) {
    console.log(`Uncaught exception: \n\n${err}`);
}

function parseStacks(stackInfo: string): string[][] {
    const lines = stackInfo.split('\n');
    const stacks = lines[lines.length - 1];
    const numStacks = +stacks[stacks.length - 2];
    const retVal: string[][] = [];

    for (let index = 0; index < numStacks; index++) {
        retVal[index] = [];
    }

    for (let index = lines.length - 2; index >= 0; --index) {
        const line = lines[index];
        for (let charIndex = 1; charIndex < line.length; charIndex += 4) {
            if (line[charIndex] != ' ') {
                // Find stack num from charIndex
                retVal[(charIndex - 1) / 4].push(line[charIndex]);
            }
        }
    }

    return retVal;
}

function parseMoves(moveInfo: string): MoveInstruction[] {
    const moves: MoveInstruction[] = moveInfo.split('\n').map((instruction) => {
        const splitInstruction = instruction.split(' ');
        return {
            amount: parseInt(splitInstruction[1]),
            source: parseInt(splitInstruction[3]),
            destination: parseInt(splitInstruction[5])
        };
    });

    return moves;
}

function performMoves(crates: string[][], moves: MoveInstruction[]): string[][] {
    for (const move of moves) {
        for (let index = 0; index < move.amount; ++index) {
            const sourceCrate = crates[move.source - 1].pop();
            if (sourceCrate) {
                crates[move.destination - 1].push(sourceCrate);
            }
        }
    }

    return crates;
}

function getTopCrates(crates: string[][]): string {
    let topCrates = '';
    for (const crate of crates) {
        topCrates += crate.pop() ?? ' ';
    }

    return topCrates;
}

async function main() {
    const data = await fs.readFile('input/day5.txt', 'utf-8');
    const splitData = data.split('\n\n');
    const crates = parseStacks(splitData[0]);
    const moves = parseMoves(splitData[1]);
    const newCrates = performMoves(crates, moves);
    console.log(getTopCrates(newCrates));
}

interface MoveInstruction {
    amount: number;
    source: number;
    destination: number;
}
