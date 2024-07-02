const cache = {}; // Assuming cache is defined somewhere accessible

const memoizedFetch = (url_link) => {
  if (cache.hasOwnProperty(url_link)) {
    console.log("Found in Cache!!!");
    return Promise.resolve(cache[url_link]);
  } else {
    // Fetch the data and return the Promise
    const fetchPromise = fetch(url_link)
      .then((res) => res.json())
      .then((data) => {
        console.log("\nNot Found in Cache!!!\nFetching... \n");
        cache[url_link] = data;
        return data;
      });
    cache[url_link] = fetchPromise;

    return fetchPromise;
  }
};
memoizedFetch("https://jsonplaceholder.typicode.com/users/1")
  .then((data) => {
    console.log("Fetched data:", data);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
console.log("cache : ", cache);
memoizedFetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((data) => {
    console.log("Fetched data:", data);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
console.log("cache : ", cache);
memoizedFetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((data) => {
    console.log("Fetched data:", data);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
