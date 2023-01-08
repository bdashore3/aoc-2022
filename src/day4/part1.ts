import { promises as fs } from 'fs';

try {
    await main();
} catch (err) {
    console.log(`Uncaught exception: \n\n${err}`);
}

function isSubsetRange(elves: ElfPair): boolean {
    return (
        (elves.firstElf.leftId - elves.secondElf.leftId) *
            (elves.firstElf.rightId - elves.secondElf.rightId) <=
        0
    );
}

async function main() {
    const data = await fs.readFile('input/day4.txt', 'utf-8');
    const splitData = data.split('\n');
    const assignments: ElfPair[] = splitData.map((assignment) => {
        const elves = assignment.split(',');
        const elfAssignments: Elf[] = elves.map((elf) => {
            const indivAssignment = elf.split('-');
            return { leftId: parseInt(indivAssignment[0]), rightId: parseInt(indivAssignment[1]) };
        });

        return { firstElf: elfAssignments[0], secondElf: elfAssignments[1] };
    });

    let total = 0;
    for (const assignment of assignments) {
        if (isSubsetRange(assignment)) total++;
    }

    console.log(total);
}

interface ElfPair {
    firstElf: Elf;
    secondElf: Elf;
}

interface Elf {
    leftId: number;
    rightId: number;
}
