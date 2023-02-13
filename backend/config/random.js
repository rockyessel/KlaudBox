function generateString(): string {
  let characters =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  let usedChars: string[] = [];
  let index: number;

  characters = characters
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');

  for (let i = 0; i < 5; i++) {
    do {
      index = Math.floor(Math.random() * characters.length);
    } while (usedChars.includes(characters[index]));

    result += characters[index];
    usedChars.push(characters[index]);
  }

  return result;
}
