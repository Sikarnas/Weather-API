const weatherForm = document.querySelector("form");
const weatherInput = document.querySelector("input");
const messageOne = document.querySelector("#m1");
const buttonCurrentLocation = document.querySelector("#button");

// window.addEventListener("load", async (e) => {
//     await fetch(`/weather?location=${location}`).then((res) => {
//         res.json().then((data) => {
//             if(data.error) {
//                 messageOne.textContent = data.error
//             } else {
//                 messageOne.textContent = `Today in ${data.location} it's ${data.summary} and the temperature is ${data.temp} C and ${Math.round(Number(data.constProb)*100)} % chance of rain.`
//             }
//         })
//     })
// })

const getWeather = location => {
  if (location.coords === undefined) {
    fetch(`/weather?location=${location}`).then(res => {
      res.json().then(data => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          messageOne.textContent = `Today in ${
            data.dailySummary.location
          } it's ${data.dailySummary.summary} and the temperature is ${
            data.dailySummary.temp
          } C and ${Math.round(
            Number(data.dailySummary.constProb) * 100
          )} % chance of rain.`;
        }
      });
    });
  } else {
    fetch(
      `/weather?lat=${location.coords.latitude}&long=${
        location.coords.longitude
      }`
    ).then(res => {
      res.json().then(data => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          messageOne.textContent = `Today in ${
            data.dailySummary.location
          } it's ${data.dailySummary.summary} and the temperature is ${
            data.dailySummary.temp
          } C and ${Math.round(
            Number(data.dailySummary.constProb) * 100
          )} % chance of rain.`;
        }
      });
    });
  }
};

navigator.geolocation.getCurrentPosition(location => {
  messageOne.textContent = "Loading...";
  getWeather(location);
});

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  messageOne.textContent = "Loading...";
  const location = weatherInput.value;
  getWeather(location);
  weatherInput.value = "";
});
