Array.prototype.populate = function () {
  const fetchPromises = [];
  for (let i = 0; i < this.length; i++) {
    fetchPromises.push(
      fetch(this[i])
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          this[i] = res;
        })
        .catch((err) => {
          console.log("Error Found " + err);
        })
    );
  }
  return Promise.all(fetchPromises).then(() => {
    return this;
  });
};
var array = [
  "https://jsonplaceholder.typicode.com/users/1",
  "https://jsonplaceholder.typicode.com/users/2",
];
array
  .populate()
  .then((updatedArray) => {
    console.log(updatedArray); // Array with fetched data
  })
  .catch((error) => {
    console.error("Error populating array:", error);
  });
