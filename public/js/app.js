const weatherForm = document.querySelector('form')
const weatherInput = document.querySelector('input')
const messageOne = document.querySelector('#m1')
const buttonCurrentLocation = document.querySelector('#button')

window.addEventListener("load",(e) => {
    console.log('laoded')
})

navigator.geolocation.getCurrentPosition((position) => {
    fetch(`/weather?lat=${position.coords.latitude}&long=${position.coords.longitude}`).then((res) => {
        res.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = `Today in ${data.location} it's ${data.summary} and the temperature is ${data.temp} C and ${Math.round(Number(data.constProb)*100)} % chance of rain.`
            }
        })
          
    })
})

// console.log(location1)

// buttonCurrentLocation.addEventListener('click',(e) => {
//     console.log('balls')
// })

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = "Loading..."

    const location = weatherInput.value 
    
    fetch(`/weather?location=${location}`).then((res) => {
        res.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = `Today in ${data.location} it's ${data.summary} and the temperature is ${data.temp} C and ${Math.round(Number(data.constProb)*100)} % chance of rain.`
            }
        })
          
    })
    weatherInput.value = ""     
})
