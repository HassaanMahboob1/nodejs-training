const EventBus = require("events");

const dataEmitter = new EventBus();

const sensorEmitters = {
  temperature: new EventBus(),
  humidity: new EventBus(),
  airPressure: new EventBus(),
};

const observer = new EventBus();

// Display data to keep track of current and previous values
let currentData = {
  temperature: Math.random(),
  humidity: Math.random(),
  airPressure: Math.random(),
};

let previousData = {
  temperature: Math.random(),
  humidity: Math.random(),
  airPressure: Math.random(),
};

// Defining event handlers

// Observer

observer.on("startObservation", () => {
  setInterval(() => {
    sensorEmitters.temperature.emit("data");
    sensorEmitters.airPressure.emit("data");
    sensorEmitters.humidity.emit("data");

    if (JSON.stringify(currentData) !== JSON.stringify(previousData)) {
      observer.emit("displayData");
    }

    previousData.airPressure = currentData.airPressure;
    previousData.temperature = currentData.temperature;
    previousData.humidity = currentData.humidity;
  }, 100);
});

// Sensors

sensorEmitters.temperature.on("data", () => {
  const randomDelay = getRandomValues();
  setTimeout(() => {
    if (randomDelay < 1000) {
      currentData.temperature = Math.random();
    } else {
      currentData.temperature = "N/A";
    }
  }, randomDelay);
});

sensorEmitters.airPressure.on("data", () => {
  const randomDelay = getRandomValues();
  setTimeout(() => {
    if (randomDelay < 1000) {
      currentData.airPressure = Math.random();
    } else {
      currentData.airPressure = "N/A";
    }
  }, randomDelay);
});

sensorEmitters.humidity.on("data", () => {
  const randomDelay = getRandomValues();
  setTimeout(() => {
    if (randomDelay < 1000) {
      currentData.humidity = Math.random();
    } else {
      currentData.humidity = "N/A";
    }
  }, randomDelay);
});

observer.on("displayData", () => {
  console.log(currentData);
});

const startObservation = () => {
  setInterval(() => {
    observer.emit("startObservation");
  }, 100);
};

startObservation();

// Utility functions
function getRandomValues() {
  const random = (Math.floor(Math.random() * 20) + 1) * 100;
  return random;
}
