import { promises as fs } from 'fs';

try {
    await main();
} catch (err) {
    console.log(`Uncaught exception: \n\n${err}`);
}

function getPriority(char: string) {
    const ascii = char.charCodeAt(0);

    if (ascii > 95) return ascii - 96;

    return ascii - 38;
}

function getDuplicate(first: string, second: string): string {
    const map: Map<string, boolean> = new Map();

    [...first].forEach((character) => {
        map.set(character, true);
    });

    for (const character of [...second]) {
        if (map.get(character)) return character;
    }

    return '';
}

async function main() {
    const data = await fs.readFile('input/day3.txt', 'utf-8');
    const splitSacks = data.split('\n');
    let totalPriority = 0;
    splitSacks.forEach((e) => {
        const duplicate: string = getDuplicate(
            e.slice(0, e.length / 2),
            e.slice(e.length / 2, e.length)
        );
        totalPriority += getPriority(duplicate);
    });

    console.log(totalPriority);
}
