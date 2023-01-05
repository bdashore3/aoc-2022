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

function getBadge(first: string, second: string, third: string): string {
    const map1: Map<string, boolean> = new Map();
    const map2: Map<string, boolean> = new Map();

    [...first].forEach((character) => {
        map1.set(character, true);
    });

    [...second].forEach((character) => {
        map2.set(character, map1.get(character) ? true : false);
    });

    for (const character of [...third]) {
        if (map2.get(character) == true) return character;
    }

    return '';
}

async function main() {
    const data = await fs.readFile('input/day3.txt', 'utf-8');

    // This can also be a 2D array but regex go brrrr
    const splitSacks = data.split(/((?:[^\n]+\n?){1,3})/).filter((e) => e !== '');

    let totalPriority = 0;
    splitSacks.forEach((e) => {
        const splitElement = e.split('\n').filter((e) => e !== '');
        const duplicate: string = getBadge(splitElement[0], splitElement[1], splitElement[2]);
        console.log(duplicate);
        totalPriority += getPriority(duplicate);
    });

    console.log(totalPriority);
}
