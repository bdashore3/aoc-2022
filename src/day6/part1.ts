import { promises as fs } from 'fs';

try {
    await main();
} catch (err) {
    console.log(`Uncaught exception: \n\n${err}`);
}

function findMarkerIndex(signal: string): number {
    console.log(signal.length);
    const bufferMap = new Map<string, number>();
    // Init
    bufferMap.set(signal[0], 0);
    bufferMap.set(signal[1], 0);
    bufferMap.set(signal[2], 0);
    bufferMap.set(signal[3], 0);

    // Inflation
    bufferMap.set(signal[0], bufferMap.get(signal[0])! + 1);
    bufferMap.set(signal[1], bufferMap.get(signal[1])! + 1);
    bufferMap.set(signal[2], bufferMap.get(signal[2])! + 1);
    bufferMap.set(signal[3], bufferMap.get(signal[3])! + 1);

    for (let i = 4; i < signal.length; i++) {
        // all 4 window elements are mapped to 1
        if (
            bufferMap.get(signal[i - 4]) == 1 &&
            bufferMap.get(signal[i - 3]) == 1 &&
            bufferMap.get(signal[i - 2]) == 1 &&
            bufferMap.get(signal[i - 1]) == 1
        ) {
            return i;
        } else {
            bufferMap.set(signal[i - 4], bufferMap.get(signal[i - 4])! - 1);
            bufferMap.set(signal[i], (bufferMap.get(signal[i]) ?? 0) + 1);
        }
    }

    return signal.length;
}

async function main() {
    const data = await fs.readFile('input/day6.txt', 'utf-8');

    console.log(findMarkerIndex(data));
}
