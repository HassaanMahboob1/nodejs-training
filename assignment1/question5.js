// Function that gets Response of Single URL
const getResponse = async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error(`Failed to fetch ${url}: ${err.message}`);
    return { error: err.message };
  }
};

// URLS
const urls = [
  "https://jsonplaceholder.typicode.com/users/1",
  "https://jsonplaceholder.typicode.com/users/2",
  "https://jsonplaceholder.typicodeop.com/users/1",
];

// Serial Execution using callbacks
function callbackSerialExecution(urls, callback) {
  let results = [];
  let index = 0;

  function processNext() {
    if (index >= urls.length) {
      callback(null, results);
      return;
    }

    getResponse(urls[index])
      .then((data) => {
        results.push({ url: urls[index], data: data });
        index++;
        processNext();
      })
      .catch((err) => {
        results.push({ url: urls[index], error: err.message });
        index++;
        processNext();
      });
  }

  processNext();
}
// caller method (Uncomment below snippet to run)
// callbackSerialExecution(urls, (err, results) => {
//   if (err) {
//     console.error("An error occurred:", err);
//   } else {
//     console.log("Results:", results);
//   }
// });

// Execution using Async Await
const asyncAwait = async (urls) => {
  for (let i = 0; i < urls.length; i++) {
    const a = await getResponse(urls[i]);
    if (a) {
      console.log(a);
    }
  }
};

// caller method (Uncomment below snippet to run)
// asyncAwait(urls);

// Serial Execution using Promises
async function fetchUrlsSerial(urls) {
  const results = [];
  for (const url of urls) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      results.push({ url, data });
    } catch (error) {
      results.push({ url, error: error.message });
    }
  }
  return results;
}

//caller method(Uncomment below snippet to run)
// console.time("Serial Execution");
// fetchUrlsSerial(urls).then((results) => {
//   console.timeEnd("Serial Execution");
//   console.log(results);
// });

// Parallel Execution using Promises
async function fetchUrlsParallel(urls) {
  const fetchPromises = urls.map(async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return { url, data };
    } catch (error) {
      return { url, error: error.message };
    }
  });

  return Promise.all(fetchPromises);
}

// caller method (Uncomment below snippet to run)
// console.time("Parallel Execution");
// fetchUrlsParallel(urls).then((results) => {
//   console.timeEnd("Parallel Execution");
//   console.log(results);
// });
