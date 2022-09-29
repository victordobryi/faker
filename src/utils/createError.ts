import { getRandomNumber } from './getRandomNumber';
const cyrillicPattern = /^[\u0400-\u04FF]+$/;
const numPattern = /^[0-9]+$/;

export const createError = (field: string) => {
  const randomNumber = getRandomNumber(0, field.length);
  const fromOneToThree = getRandomNumber(1, 4);

  return fromOneToThree === 1
    ? removeSymbol(field, randomNumber)
    : fromOneToThree === 2
    ? addSymbol(field, randomNumber)
    : mixSymbols(field, randomNumber);
};

const removeSymbol = (field: string, rndNum: number) => {
  return field.replace(field.substring(rndNum, rndNum + 1), '');
};

const addSymbol = (field: string, rndNum: number) => {
  const randomLetter = cyrillicPattern.test(field[0])
    ? String.fromCharCode(getRandomNumber(1072, 1104))
    : numPattern.test(field.replace(/[^0-9]/g, ''))
    ? getRandomNumber(0, 9)
    : String.fromCharCode(getRandomNumber(97, 123));
  const letterInWord = field.substring(rndNum, rndNum + 1);
  return field.replace(letterInWord, `${letterInWord}${randomLetter}`);
};

const mixSymbols = (field: string, rndNum: number) => {
  let lettersInWord = field.substring(rndNum, rndNum + 2);
  if (lettersInWord.length < 2) {
    lettersInWord = field.substring(rndNum, rndNum - 2);
  }

  return field.replace(lettersInWord, `${lettersInWord[1]}${lettersInWord[0]}`);
};
