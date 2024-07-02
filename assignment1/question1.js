const sumfunc = (...args) => {
  try {
    let output = {
      total: 0,
      numbers: [],
      not_numbers: [],
    };
    output = args.reduce((result, item) => {
      if (isNaN(item)) {
        result.not_numbers.push(item);
      } else {
        result.numbers.push(item);
        result.total += item;
      }
      return result;
    }, output);
    return output;
  } catch (err) {
    console.log(err);
  }
};

const { total: sum, numbers, not_numbers } = sumfunc(1, 2, 3, 4, 5, -1, "abc");
console.log(`Valid Numbers : ${numbers}`);
console.log(`Invalid Numbers : ${not_numbers}`);
console.log(`Total sum : ${sum}`);
