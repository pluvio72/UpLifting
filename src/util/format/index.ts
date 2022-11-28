export const Capitalize = (text: string) => {
  return text[0].toUpperCase() + text.substring(1).toLowerCase();
};

export const ShuffleArray = <T>(_array: Array<T>) => {
  let array = [..._array];
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};
