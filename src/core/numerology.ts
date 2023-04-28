export class Numerology {
    constructor(
        private day: number,
        private month: number,
        private year: number,
        private firstName: string,
        private lastName: string,
        private middleName?: string,
    ) { }

    private CHARACTER_MAP: Record<string, number> = {
        "A": 1,
        "B": 2,
        "C": 3,
        "D": 4,
        "E": 5,
        "F": 6,
        "G": 7,
        "H": 8,
        "I": 9,
        "J": 1,
        "K": 2,
        "L": 3,
        "M": 4,
        "N": 5,
        "O": 6,
        "P": 7,
        "Q": 8,
        "R": 9,
        "S": 1,
        "T": 2,
        "U": 3,
        "V": 4,
        "W": 5,
        "X": 6,
        "Y": 7,
        "Z": 8,
    }

    private VOWELS = ['A', 'E', 'I', 'O', 'U'];
    private CONSONANTS = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];

    /**
     * Return value in number of a character
     * @param character 
     * @returns 
     */
    getCharacterValue(character: string): number {
        return this.CHARACTER_MAP[character.toUpperCase()];
    }

    /**
     * Return the sum of all the digits of a number
     * @param number 
     * @returns 
     */
    splitDigits(number: number): number[] {
        return number.toString().split('').map(Number);
    }


    /**
     * Add all the digits of a number until you get a single digit number
     * 
     * Add some special cases to return here. If the last calculation is 11, 22 or 33, return it.
     * 
     * @param number 
     */
    addUpToSingleDigit(number: number): number {
        const digits = this.splitDigits(number);
        const sum = digits.reduce((a, b) => a + b, 0);
        while (sum > 9) {
            if (sum === 11 || sum === 22 || sum === 33) {
                return sum;
            }
            return this.addUpToSingleDigit(sum);
        }
        return sum;
    }

    /**
     * Add all the digits of an array of numbers until you get a single digit number
     * 
     * Add some special cases to return here. If the last calculation is 11, 22 or 33, return it.
     * 
     * @param numbers 
     * @returns 
     */
    addUp(numbers: number[]): number {
        const sum = numbers.reduce((a, b) => a + b, 0);
        while (sum > 9) {
            if (sum === 11 || sum === 22 || sum === 33) {
                return sum;
            }
            return this.addUpToSingleDigit(sum);
        }
        return sum;
    }

    /**
     * Return the [Life Path Number](https://www.tokenrock.com/numerology/life_path/) of a person
     * 
     * Calculate it by adding up all the digits of the day, month and year of birth
     * 
     * Example: 12/12/1990 => 1 + 2 + 1 + 2 + 1 + 9 + 9 + 0 = 25 => 2 + 5 = 7
     * 
     * @returns 
     */
    lifePathNumber(): number {
        const allDigits = this.splitDigits(this.day)
            .concat(this.splitDigits(this.month))
            .concat(this.splitDigits(this.year));
        return this.addUp(allDigits);
    }

    /**
     * Return the Destiny Number of a person
     * 
     * Calculate it by adding up all the digits of the full name
     * 
     * Example: John Doe => 1 + 6 + 8 + 5 + 4 + 6 + 5 = 35 => 3 + 5 = 8
     * 
     * @returns 
     */
    destinyNumber(): number {
        const firstNameDigits = this.firstName.split('')
            .map((character) => this.getCharacterValue(character));
        const lastNameDigits = this.lastName.split('')
            .map((character) => this.getCharacterValue(character));
        const middleNameDigits = this.middleName?.split('').filter(c => c !== " ")
            .map((character) => this.getCharacterValue(character)) || [];

        const firstName = this.addUp(firstNameDigits);
        const lastName = this.addUp(lastNameDigits);
        const middleName = this.addUp(middleNameDigits);

        return this.addUp([firstName, lastName, middleName]);
    }

    /**
     * Return the [Soul Urge Number](https://www.tokenrock.com/numerology/soul_urge/) of a person
     * 
     * Calculate it by adding up all the digits of the vowels of the full name
     * 
     * @returns 
     */
    soulUrgeNumber(): number {
        const vowels = this.firstName.split('')
            .concat(this.lastName.split(''))
            .concat(this.middleName?.split('').filter(c => c !== " ") || [])
            .filter((character) => this.VOWELS.includes(character.toUpperCase()))
            .map((character) => this.getCharacterValue(character));
        return this.addUp(vowels);
    }

    /**
     * Return the [Personality Number](https://www.tokenrock.com/numerology/personality/) of a person
     * 
     * Calculate it by adding up all the digits of the consonants of the full name
     * 
     * Example: John Doe => 1 + 8 + 4 + 5 + 4 = 22 => 2 + 2 = 4
     * @returns 
     */
    characterNumber(): number {
        const consonants = this.firstName.split('')
            .concat(this.lastName.split(''))
            .concat(this.middleName?.split('').filter(c => c !== " ") || [])
            .filter((character) => this.CONSONANTS.includes(character.toUpperCase()))
            .map((character) => this.getCharacterValue(character));
        return this.addUp(consonants);
    }

    /**
     * Return the [Birth Day Number](https://www.tokenrock.com/numerology/birth_day/) of a person
     * 
     * Calculate it by adding up all the digits of the day of birth
     * 
     * Example: 12/12/1990 => 1 + 2 = 3
     */
    birthdayNumber(): number {
        return this.addUpToSingleDigit(this.day);
    }

}