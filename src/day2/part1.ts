import { promises as fs } from 'fs';

try {
    await main();
} catch (err) {
    console.log(`Uncaught exception: \n\n${err}`);
}

// 1 - rock
// 2 - paper
// 3 - scissors
function parseMove(move: string): number {
    switch (move) {
        case 'A':
        case 'X':
            return 1;

        case 'B':
        case 'Y':
            return 2;

        case 'C':
        case 'Z':
            return 3;

        default:
            return 0;
    }
}

// Rock beats scissors
// Scissors beats paper
// Paper beats rock
function parseRoundScore(computer: number, player: number): number {
    return ((player - computer + 4) % 3) * 3; // 0 -> 3, 1 -> 6, 2 -> 0
}

// Enemy: A - rock, B - Paper, C - Scissors
// You: X - rock, Y - paper, Z - Scissors
// Rock - 1pt, Paper - 2pt, Scissors - 3pt
// Win - 6pt, Draw - 3pt, Lose - 0pt
// Total score = symbol + win or not
async function main() {
    const data = await fs.readFile('input/day2.txt', 'utf-8');

    const rounds = data.split('\n');
    let score = 0;

    rounds.forEach((round) => {
        const computer = parseMove(round[0]);
        const player = parseMove(round[2]);

        score += parseRoundScore(computer, player) + player;
    });

    console.log(score);
}
