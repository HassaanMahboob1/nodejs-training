Array.prototype.populate = async function () {
  const getURL = async (URL) => {
    try {
      let res = await fetch(URL);
      return res.json();
    } catch (err) {
      console.log(err);
    }
  };
  for (let i = 0; i < this.length; i++) {
    this[i] = await getURL(this[i]);
  }
};

var array = [
  "https://jsonplaceholder.typicode.com/users/1",
  "https://jsonplaceholder.typicode.com/users/2",
];
(async () => {
  await array.populate();
  console.log(array);
})();
