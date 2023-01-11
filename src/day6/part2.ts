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
    bufferMap.set(signal[4], 0);
    bufferMap.set(signal[5], 0);
    bufferMap.set(signal[6], 0);
    bufferMap.set(signal[7], 0);
    bufferMap.set(signal[8], 0);
    bufferMap.set(signal[9], 0);
    bufferMap.set(signal[10], 0);
    bufferMap.set(signal[11], 0);
    bufferMap.set(signal[12], 0);
    bufferMap.set(signal[13], 0);

    // Inflation
    bufferMap.set(signal[0], bufferMap.get(signal[0])! + 1);
    bufferMap.set(signal[1], bufferMap.get(signal[1])! + 1);
    bufferMap.set(signal[2], bufferMap.get(signal[2])! + 1);
    bufferMap.set(signal[3], bufferMap.get(signal[3])! + 1);
    bufferMap.set(signal[4], bufferMap.get(signal[4])! + 1);
    bufferMap.set(signal[5], bufferMap.get(signal[5])! + 1);
    bufferMap.set(signal[6], bufferMap.get(signal[6])! + 1);
    bufferMap.set(signal[7], bufferMap.get(signal[7])! + 1);
    bufferMap.set(signal[8], bufferMap.get(signal[8])! + 1);
    bufferMap.set(signal[9], bufferMap.get(signal[9])! + 1);
    bufferMap.set(signal[10], bufferMap.get(signal[10])! + 1);
    bufferMap.set(signal[11], bufferMap.get(signal[11])! + 1);
    bufferMap.set(signal[12], bufferMap.get(signal[12])! + 1);
    bufferMap.set(signal[13], bufferMap.get(signal[13])! + 1);

    for (let i = 14; i < signal.length; i++) {
        // all 4 window elements are mapped to 1
        if (
            bufferMap.get(signal[i - 14]) == 1 &&
            bufferMap.get(signal[i - 13]) == 1 &&
            bufferMap.get(signal[i - 12]) == 1 &&
            bufferMap.get(signal[i - 11]) == 1 &&
            bufferMap.get(signal[i - 10]) == 1 &&
            bufferMap.get(signal[i - 9]) == 1 &&
            bufferMap.get(signal[i - 8]) == 1 &&
            bufferMap.get(signal[i - 7]) == 1 &&
            bufferMap.get(signal[i - 6]) == 1 &&
            bufferMap.get(signal[i - 5]) == 1 &&
            bufferMap.get(signal[i - 4]) == 1 &&
            bufferMap.get(signal[i - 3]) == 1 &&
            bufferMap.get(signal[i - 2]) == 1 &&
            bufferMap.get(signal[i - 1]) == 1
        ) {
            return i;
        } else {
            bufferMap.set(signal[i - 14], bufferMap.get(signal[i - 14])! - 1);
            bufferMap.set(signal[i], (bufferMap.get(signal[i]) ?? 0) + 1);
        }
    }

    return signal.length;
}

async function main() {
    const data = await fs.readFile('input/day6.txt', 'utf-8');

    console.log(findMarkerIndex(data));
}
