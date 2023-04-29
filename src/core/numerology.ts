export class Numerology {
    private _lifePathNumber = -1;
    private _destinyNumber = -1;
    private _soulUrgeNumber = -1;
    private _characterNumber = -1;
    private _birthdayNumber = -1;
    private _maturityNumber = -1;
    private _bridgeToSuccessNumber = -1;
    private _bridgeToHappyNumber = -1;
    private _karmicLessons = [-1];
    private _karmicDebtsNumber = -1;
    private _balanceNumber = -1;

    constructor(
        private day: number,
        private month: number,
        private year: number,
        private firstName: string,
        private lastName: string,
        private middleName?: string,
    ) {
        this.calculateAll();
    }

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

    private BIRTH_MAP: Record<string, number[] | undefined> = {
        "1": undefined,
        "2": undefined,
        "3": undefined,
        "4": undefined,
        "5": undefined,
        "6": undefined,
        "7": undefined,
        "8": undefined,
        "9": undefined,
    }

    private NAME_MAP: Record<string, number[] | undefined> = {
        "1": undefined,
        "2": undefined,
        "3": undefined,
        "4": undefined,
        "5": undefined,
        "6": undefined,
        "7": undefined,
        "8": undefined,
        "9": undefined,
    }

    private MERGE_MAP: Record<string, number[] | undefined> = {
        "1": undefined,
        "2": undefined,
        "3": undefined,
        "4": undefined,
        "5": undefined,
        "6": undefined,
        "7": undefined,
        "8": undefined,
        "9": undefined,
    }

    private VOWELS = ['A', 'E', 'I', 'O', 'U'];
    private CONSONANTS = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];

    private calculateAll() {
        this.lifePathNumber();
        this.destinyNumber();
        this.soulUrgeNumber();
        this.characterNumber();
        this.birthdayNumber();
        this.maturityNumber();
        this.bridgeToSuccessNumber();
        this.bridgeToHappyNumber();
        this.karmicLessonNumbers();
        this.karmicDebtNumber();
        this.balanceNumber();
        this.birthMap();
        this.nameMap();
        this.mergeMap();
    }

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
        if (this._lifePathNumber !== -1) {
            return this._lifePathNumber;
        }

        const allDigits = this.splitDigits(this.day)
            .concat(this.splitDigits(this.month))
            .concat(this.splitDigits(this.year));
        this._lifePathNumber = this.addUp(allDigits);
        return this._lifePathNumber;
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
        if (this._destinyNumber !== -1) {
            return this._destinyNumber;
        }

        const firstNameDigits = this.firstName.split('')
            .map((character) => this.getCharacterValue(character));
        const lastNameDigits = this.lastName.split('')
            .map((character) => this.getCharacterValue(character));
        const middleNameDigits = this.middleName?.split('').filter(c => c !== " ")
            .map((character) => this.getCharacterValue(character)) || [];

        const firstName = this.addUp(firstNameDigits);
        const lastName = this.addUp(lastNameDigits);
        const middleName = this.addUp(middleNameDigits);

        this._destinyNumber = this.addUp([firstName, lastName, middleName]);
        return this._destinyNumber;
    }

    /**
     * Return the [Soul Urge Number](https://www.tokenrock.com/numerology/soul_urge/) of a person
     * 
     * Calculate it by adding up all the digits of the vowels of the full name
     * 
     * @returns 
     */
    soulUrgeNumber(): number {
        if (this._soulUrgeNumber !== -1) {
            return this._soulUrgeNumber;
        }

        const vowels = this.firstName.split('')
            .concat(this.lastName.split(''))
            .concat(this.middleName?.split('').filter(c => c !== " ") || [])
            .filter((character) => this.VOWELS.includes(character.toUpperCase()))
            .map((character) => this.getCharacterValue(character));
        this._soulUrgeNumber = this.addUp(vowels);
        return this._soulUrgeNumber;
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
        if (this._characterNumber !== -1) {
            return this._characterNumber;
        }

        const consonants = this.firstName.split('')
            .concat(this.lastName.split(''))
            .concat(this.middleName?.split('').filter(c => c !== " ") || [])
            .filter((character) => this.CONSONANTS.includes(character.toUpperCase()))
            .map((character) => this.getCharacterValue(character));
        this._characterNumber = this.addUp(consonants);
        return this._characterNumber;
    }

    /**
     * Return the [Birth Day Number](https://www.tokenrock.com/numerology/birth_day/) of a person
     * 
     * Calculate it by adding up all the digits of the day of birth
     * 
     * Example: 12/12/1990 => 1 + 2 = 3
     */
    birthdayNumber(): number {
        if (this._birthdayNumber !== -1) {
            return this._birthdayNumber;
        }

        this._birthdayNumber = this.addUpToSingleDigit(this.day);
        return this._birthdayNumber;
    }

    /**
     * Return the [Maturity Number](https://www.tokenrock.com/numerology/maturity/) of a person
     * 
     * Calculate it by adding up the [Life Path Number](https://www.tokenrock.com/numerology/life_path/) and the [Destiny Number](https://www.tokenrock.com/numerology/destiny/)
     * 
     * Example: 12/12/1990 => 7 + 8 = 15 => 1 + 5 = 6
     * 
     * @returns 
     */
    maturityNumber(): number {
        if (this._maturityNumber !== -1) {
            return this._maturityNumber;
        }

        const lifePathNumber = this.lifePathNumber();
        const destinyNumber = this.destinyNumber();
        this._maturityNumber = this.addUpToSingleDigit(lifePathNumber + destinyNumber);
        return this._maturityNumber;
    }

    /**
     * Bridge to success number is the difference between the [Life Path Number](https://www.tokenrock.com/numerology/life_path/) and the [Destiny Number](https://www.tokenrock.com/numerology/destiny/)
     * 
     * Calculate by subtracting the [Life Path Number](https://www.tokenrock.com/numerology/life_path/) from the [Destiny Number](https://www.tokenrock.com/numerology/destiny/)
     * 
     * Example: 12/12/1990 => Life Path Number = 7, Destiny Number = 8 => 8 - 7 = 1 (use absolute value)
     * @returns 
     */
    bridgeToSuccessNumber(): number {
        if (this._bridgeToSuccessNumber !== -1) {
            return this._bridgeToSuccessNumber;
        }

        const lifePathNumber = this.lifePathNumber();
        const destinyNumber = this.destinyNumber();
        this._bridgeToSuccessNumber = this.addUpToSingleDigit(Math.abs(lifePathNumber - destinyNumber));
        return this._bridgeToSuccessNumber;
    }

    /**
     * Bridge to happy life number is the difference between the [Character Number](https://www.tokenrock.com/numerology/personality/) and the [Soul Urge Number](https://www.tokenrock.com/numerology/soul_urge/)
     * 
     * Calculate by subtracting the [Character Number](https://www.tokenrock.com/numerology/personality/) from the [Soul Urge Number](https://www.tokenrock.com/numerology/soul_urge/)
     * 
     * Example: John Doe => Character Number = 4, Soul Urge Number = 6 => 6 - 4 = 2 (use absolute value)
     * @returns 
     */
    bridgeToHappyNumber(): number {
        if (this._bridgeToHappyNumber !== -1) {
            return this._bridgeToHappyNumber;
        }

        const characterNumber = this.characterNumber();
        const soulUrgeNumber = this.soulUrgeNumber();
        this._bridgeToHappyNumber = this.addUpToSingleDigit(Math.abs(characterNumber - soulUrgeNumber));
        return this._bridgeToHappyNumber;
    }

    /**
     * Return the [Karmic Lesson Numbers](https://www.tokenrock.com/numerology/karmic_lessons/) of a person
     * 
     * Calculate by return all the numbers that missing from the full name
     * 
     * Example: John Doe => has J, O, H, N, D, E => 1, 6, 8, 5, 4, 5 => 2, 3, 7, 9 are missing
     */
    karmicLessonNumbers(): number[] {
        if (this._karmicLessons[0] !== -1) {
            return this._karmicLessons;
        }

        const allDigits = this.firstName.split('')
            .concat(this.lastName.split(''))
            .concat(this.middleName?.split('').filter(c => c !== " ") || [])
            .map((character) => this.getCharacterValue(character));
        const allNumbers = Array.from(Array(10).keys()).filter((number) => number !== 0);
        this._karmicLessons = allNumbers.filter((number) => !allDigits.includes(number));
        this._karmicLessons = this._karmicLessons.length === 0 ? [-1] : this._karmicLessons;
        return this._karmicLessons;
    }

    /**
     * Return the [Karmic Debt Number](https://www.tokenrock.com/numerology/karmic_debt/) of a person
     * 
     * Is when your Life Path Number is one of the following: 13, 14, 16 or 19
     * 
     * Will return -1 if the person doesn't have a Karmic Debt Number
     * @returns 
     */
    karmicDebtNumber(): number {
        if (this._karmicDebtsNumber !== -1) {
            return this._karmicDebtsNumber;
        }

        const allDigits = this.splitDigits(this.day)
            .concat(this.splitDigits(this.month))
            .concat(this.splitDigits(this.year));

        let lifePathNumber = allDigits.reduce((sum, digit) => sum + digit, 0);
        const karmicDebt = [13, 14, 16, 19];
        while (lifePathNumber > 9) {
            if (karmicDebt.includes(lifePathNumber)) {
                this._karmicDebtsNumber = lifePathNumber;
                return lifePathNumber;
            }

            lifePathNumber = this.addUpToSingleDigit(lifePathNumber);
        }

        this._karmicDebtsNumber = -1;
        return -1;
    }

    /**
     * Return the [Balance Number](https://www.tokenrock.com/numerology/balance/) of a person
     * 
     * Calculate it by adding up all the digits of the first characters of the full name
     * 
     * Example: John Doe => J + D = 1 + 4 = 5
     * 
     * @returns 
     */
    balanceNumber(): number {
        if (this._balanceNumber !== -1) {
            return this._balanceNumber;
        }

        const firstCharactersInFullName = this.firstName[0] + this.lastName[0] + (this.middleName || '').split(' ').reduce((sum, name) => sum + name[0], '');
        const allDigits = firstCharactersInFullName.split('')
            .map((character) => this.getCharacterValue(character));
        this._balanceNumber = this.addUp(allDigits);
        return this._balanceNumber;
    }

    /**
     * Return the birth map of a person
     * 
     * @returns 
     */
    birthMap(): Record<string, number[] | undefined> {

        if (!this.mapIsJustInitialized(this.BIRTH_MAP)) {
            return this.BIRTH_MAP;
        }

        const allDigits = this.splitDigits(this.day)
            .concat(this.splitDigits(this.month))
            .concat(this.splitDigits(this.year));

        this.clearMap(this.BIRTH_MAP);

        for (const digit of allDigits) {
            if (digit === 0) {
                continue;
            }

            if (!this.BIRTH_MAP[`${digit}`]) {
                this.BIRTH_MAP[`${digit}`] = [digit];
            } else {
                this.BIRTH_MAP[`${digit}`] = [...(this.BIRTH_MAP[`${digit}`] || []), digit];
            }
        }

        return this.BIRTH_MAP;
    }

    mapIsJustInitialized(map: Record<string, number[] | undefined>): boolean {
        for (const key in map) {
            if (map[key]) {
                return false;
            }
        }
        return true;
    }

    /**
     * Return the name map of a person
     * 
     * @returns 
     */
    nameMap(): Record<string, number[] | undefined> {
        if (!this.mapIsJustInitialized(this.NAME_MAP)) {
            return this.NAME_MAP;
        }

        const allDigits = this.firstName.split('')
            .concat(this.lastName.split(''))
            .concat(this.middleName?.split('').filter(c => c !== " ") || [])
            .map((character) => this.getCharacterValue(character));

        this.clearMap(this.NAME_MAP);

        for (const digit of allDigits) {
            if (!this.NAME_MAP[`${digit}`]) {
                this.NAME_MAP[`${digit}`] = [digit];
            } else {
                this.NAME_MAP[`${digit}`] = [...(this.NAME_MAP[`${digit}`] || []), digit];
            }
        }

        return this.NAME_MAP;
    }

    clearMap(map: Record<string, number[] | undefined>): Record<string, number[] | undefined> {
        for (const key in map) {
            if (map[key]?.length === 0) {
                delete map[key];
            }
        }
        return map;
    }

    mergeMap() {
        if (!this.mapIsJustInitialized(this.MERGE_MAP)) {
            return this.MERGE_MAP;
        }

        const birthMap = this.birthMap();
        const nameMap = this.nameMap();

        this.clearMap(this.MERGE_MAP);

        for (const key in birthMap) {
            if (!birthMap[key] && !nameMap[key]) {
                continue; 
            }

            this.MERGE_MAP[key] = [...(birthMap[key] || []), ...(nameMap[key] || [])];
        }

        return this.MERGE_MAP;
    }
}