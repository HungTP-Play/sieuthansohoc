import { describe, expect, it } from "vitest";
import { Numerology } from "./numerology";

describe('Numerology', () => {
    describe('Test Character Map', () => {
        const characters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        const expectedValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8];

        const numerology = new Numerology(1, 1, 2000, 'John', 'Doe');

        for (const character of characters) {
            it(`should return ${expectedValues[characters.indexOf(character)]} for ${character}`, () => {
                expect(numerology.getCharacterValue(character)).toBe(expectedValues[characters.indexOf(character)]);
            });
        }
    });

    describe('Test util functions', () => {
        describe('Test splitDigits', () => {
            const numerology = new Numerology(1, 1, 2000, 'John', 'Doe');
            it('should return [1] for 1', () => {
                expect(numerology.splitDigits(1)).toEqual([1]);
            });
            it('should return [1, 2] for 12', () => {
                expect(numerology.splitDigits(12)).toEqual([1, 2]);
            });
            it('should return [1, 2, 3] for 123', () => {
                expect(numerology.splitDigits(123)).toEqual([1, 2, 3]);
            });
            it('should return [1, 2, 3, 4] for 1234', () => {
                expect(numerology.splitDigits(1234)).toEqual([1, 2, 3, 4]);
            });
        });

        describe('Test addUpToSingleDigit', () => {
            const numerology = new Numerology(1, 1, 2000, 'John', 'Doe');
            it('should return 1 for 1', () => {
                expect(numerology.addUpToSingleDigit(1)).toBe(1);
            });
            it('should return 2 for 11', () => {
                expect(numerology.addUpToSingleDigit(11)).toBe(2);
            });
            it('should return 3 for 111', () => {
                expect(numerology.addUpToSingleDigit(111)).toBe(3);
            });
            it('should return 4 for 1111', () => {
                expect(numerology.addUpToSingleDigit(1111)).toBe(4);
            });
            it('should return 5 for 11111', () => {
                expect(numerology.addUpToSingleDigit(11111)).toBe(5);
            });
            it('should return 6 for 111111', () => {
                expect(numerology.addUpToSingleDigit(111111)).toBe(6);
            });
            it('should return 7 for 1111111', () => {
                expect(numerology.addUpToSingleDigit(1111111)).toBe(7);
            });
            it('should return 8 for 11111111', () => {
                expect(numerology.addUpToSingleDigit(11111111)).toBe(8);
            });
            it('should return 9 for 111111111', () => {
                expect(numerology.addUpToSingleDigit(111111111)).toBe(9);
            });
            it('should return 1 for 1111111111', () => {
                expect(numerology.addUpToSingleDigit(1111111111)).toBe(1);
            });
        });

        describe('Test addUp', () => {
            const numerology = new Numerology(1, 1, 2000, 'John', 'Doe');
            it('should return 1 for 1', () => {
                expect(numerology.addUp([1])).toBe(1);
            });
            it('should return 2 for 11', () => {
                expect(numerology.addUp([1, 1])).toBe(2);
            });
            it('should return 3 for 111', () => {
                expect(numerology.addUp([1, 1, 1])).toBe(3);
            });
            it('should return 4 for 1111', () => {
                expect(numerology.addUp([1, 1, 1, 1])).toBe(4);
            });
            it('should return 5 for 11111', () => {
                expect(numerology.addUp([1, 1, 1, 1, 1])).toBe(5);
            });
            it('should return 6 for 111111', () => {
                expect(numerology.addUp([1, 1, 1, 1, 1, 1])).toBe(6);
            });
            it('should return 7 for 1111111', () => {
                expect(numerology.addUp([1, 1, 1, 1, 1, 1, 1])).toBe(7);
            });
            it('should return 8 for 11111111', () => {
                expect(numerology.addUp([1, 1, 1, 1, 1, 1, 1, 1])).toBe(8);
            });
            it('should return 9 for 111111111', () => {
                expect(numerology.addUp([1, 1, 1, 1, 1, 1, 1, 1, 1])).toBe(9);
            });
            it('should return 1 for 1111111111', () => {
                expect(numerology.addUp([1, 1, 1, 1, 1, 1, 1, 1, 1, 1])).toBe(1);
            });
        });
    });

    describe('Test numerology calculations', () => {
        describe('Test lifePathNumber', () => {
            const cases = [
                { day: 1, month: 1, year: 2000, expected: 4 },
                { day: 2, month: 1, year: 2000, expected: 5 },
                { day: 8, month: 1, year: 2000, expected: 11 },
                { day: 8, month: 1, year: 1998, expected: 9 },
            ];

            for (const { day, month, year, expected } of cases) {
                it(`should return ${expected} for ${day}/${month}/${year}`, () => {
                    const numerology = new Numerology(day, month, year, 'John', 'Doe');
                    expect(numerology.lifePathNumber()).toBe(expected);
                });
            }
        });

        describe('Test destinyNumber', () => {
            const cases = [
                { firstName: 'John', lastName: 'Doe', expected: 8 },
                { firstName: 'Jane', lastName: 'Doe', expected: 9 },
                { firstName: 'Hung', middleName: 'Phat', lastName: 'Tran', expected: 22 },
            ]

            for (const { firstName, middleName, lastName, expected } of cases) {
                it(`should return ${expected} for ${firstName} ${middleName ? middleName + ' ' : ''}${lastName}`, () => {
                    const numerology = new Numerology(1, 1, 2000, firstName, lastName, middleName);
                    expect(numerology.destinyNumber()).toBe(expected);
                });
            }

        });

        describe('Test soulUrgeNumber', () => {
            const cases = [
                { firstName: 'John', lastName: 'Doe', expected: 8 },
                { firstName: 'Jane', lastName: 'Doe', expected: 8 },
                { firstName: 'Hung', middleName: 'Phat', lastName: 'Tran', expected: 5 },
            ]

            for (const { firstName, middleName, lastName, expected } of cases) {
                it(`should return ${expected} for ${firstName} ${middleName ? middleName + ' ' : ''}${lastName}`, () => {
                    const numerology = new Numerology(1, 1, 2000, firstName, lastName, middleName);
                    expect(numerology.soulUrgeNumber()).toBe(expected);
                });
            }

        });

        describe('Test characterNumber', () => {
            const cases = [
                { firstName: 'John', lastName: 'Doe', expected: 9 },
                { firstName: 'Jane', lastName: 'Doe', expected: 1 },
                { firstName: 'Hung', middleName: 'Phat', lastName: 'Tran', expected: 8 },
            ]

            for (const { firstName, middleName, lastName, expected } of cases) {
                it(`should return ${expected} for ${firstName} ${middleName ? middleName + ' ' : ''}${lastName}`, () => {
                    const numerology = new Numerology(1, 1, 2000, firstName, lastName, middleName);
                    expect(numerology.characterNumber()).toBe(expected);
                });
            }
        });

        describe('Test birthdayNumber', () => {
            const cases = [
                { day: 1, month: 1, year: 2000, expected: 1 },
                { day: 2, month: 1, year: 2000, expected: 2 },
                { day: 8, month: 1, year: 2000, expected: 8 },
                { day: 8, month: 1, year: 1998, expected: 8 },
                { day: 12, month: 12, year: 1998, expected: 3 }
            ];

            for (const { day, month, year, expected } of cases) {
                it(`should return ${expected} for ${day}/${month}/${year}`, () => {
                    const numerology = new Numerology(day, month, year, 'John', 'Doe');
                    expect(numerology.birthdayNumber()).toBe(expected);
                });
            }
        });
    });
});