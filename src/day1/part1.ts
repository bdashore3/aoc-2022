import { promises as fs } from 'fs';

try {
    await main();
} catch (err) {
    console.log(`Uncaught exception: \n\n${err}`);
}

async function main() {
    const data = await fs.readFile('input/day1.txt', 'utf-8');
    const splitData = data.split('\n\n');
    const addedSplitData = splitData.map((e) => {
        const splitElement = e.split('\n').map((e) => parseInt(e));
        const sumOfElements = splitElement.reduce((partialSum, e) => partialSum + e, 0);
        return sumOfElements;
    });

    const maxCalories = Math.max(...addedSplitData);

    console.log(maxCalories);
}
