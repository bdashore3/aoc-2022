import { promises as fs } from 'fs';

try {
    await main();
} catch (err) {
    console.log(`Uncaught exception: \n\n${err}`);
}

// What should the player choose?

// 1 - rock
// 2 - paper
// 3 - scissors
function parseMove(move: string): number {
    switch (move) {
        case 'A':
            return 1;
        case 'X':
            return 0;
        case 'B':
            return 2;
        case 'Y':
            return 3;
        case 'C':
            return 3;
        case 'Z':
            return 6;
        default:
            return -1;
    }
}

function getPlayerMove(computer: number, result: number): number {
    // Player's move offset example: Computer chooses scissors, player needs to choose rock to win (+1 in numerical terms)
    // Player's move offset from computer -> Result mappings <computer, player> -> Space shifted by -1 from [1,2,3] to [0,1,2]
    // Space shifting makes it modulo-friendly and allows <% 3> operations to be used
    // In the end we add <+1> again to space shift the player move from [0,1,2] to [1,2,3] = player's move
    // -1 -> 1-3, 2-1, 3-2 -> 0-2, 1-0, 2-1
    // 0 -> 1-1, 2-2, 3-3 -> 0-0, 1-1, 2-2
    // 1 -> 1-2, 2-3, 3-1 -> 0-1, 1-2, 2-0

    const offset = result / 3 - 1;
    const playerMove = ((computer + 2 + offset) % 3) + 1;

    return playerMove;
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
        const result = parseMove(round[2]);
        const player = getPlayerMove(computer, result);

        score += result + player;
    });

    console.log(score);
}
