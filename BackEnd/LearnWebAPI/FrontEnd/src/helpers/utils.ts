export const utils = {
    newGuid() {
        if (crypto?.randomUUID) {
            return crypto.randomUUID();
        }
        return (1e7 + "" + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (
            Number(c) ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4)))
        ).toString(16))
    },
    mathRandom: (number: number = 1): number => {
        const today = new Date();
        let seed = today.getTime();
        function rnd(): number { seed = (seed * 9301 + 49297) % 233280; return seed / 233280.0; }
        return rnd() * number;
    },
    randomWord(isRandomLength?: boolean, min?: number, max?: number): string {
        let str = "",
            pos,
            range = min ?? 0,
            arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'z']
        if (isRandomLength) {
            range = Math.round(utils.mathRandom() * (max! - min!)) + min!;
        }
        for (let i = 0; i < range; i++) {
            pos = Math.round(utils.mathRandom() * (arr.length - 1));
            str += arr[pos]
        }
        return str;
    }
}