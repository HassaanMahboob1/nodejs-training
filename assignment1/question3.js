function sum(outerarg) {
  let total = outerarg;
  return function innerFunction(innerarg) {
    if (!isNaN(innerarg)) {
      total += innerarg;
      return innerFunction;
    } else return total;
  };
}

console.log(sum(1)(4)(4)(10)());
