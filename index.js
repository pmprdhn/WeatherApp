const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityName");
const apiKey= "7bb24bfae863456056e2cec98bf156d7";

const displayWeatherInfo=document.querySelector(".weatherData");

defaultWeather();

async function defaultWeather(){

  await getWeather("Kathmandu");
  await getTime();

}



weatherForm.addEventListener("submit", async event=>{
  event.preventDefault();

  displayWeatherInfo.innerHTML = ""; 



  const cityName = cityInput.value;

  if (cityName){
    try{
      await getWeather(cityName);
    }
    catch(error){
      displayWeatherInfo.innerHTML=`<p style="color:red;">${error.message}</p>`;
    }
  }
  else{
    displayWeatherInfo.innerHTML=`<p style="color:red;"> Please enter a city!! </p>`;

  }

  

  
})


async function getWeather(cityName) {


  let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);

  

  if(!response.ok){
    throw new Error("Please enter a valid city!!");
  }

  const data = await response.json();

  displayWeather(data);

}



function displayWeather(data){

  console.log(data);

  const {name:city, main:{humidity, temp}, weather:[{id, description}, ] }=data;

  console.log(city,humidity,id,description,temp);


  

  const cityElement= document.createElement("h1");
  const tempElement= document.createElement("p");
  const humidityElement= document.createElement("p");
  const emojiElement= document.createElement("p");
  const descElement= document.createElement("p");

  cityElement.textContent=city;
  tempElement.textContent=`${Math.round(temp)} Celsius`;
  humidityElement.textContent=`Humidity: ${humidity}%`;
  descElement.textContent=description;
  emojiElement.textContent=getEmoji(id);

  displayWeatherInfo.appendChild(cityElement);
  displayWeatherInfo.appendChild(tempElement);
  displayWeatherInfo.appendChild(humidityElement);
  displayWeatherInfo.appendChild(descElement);
  displayWeatherInfo.appendChild(emojiElement);



}



function getEmoji(id){

  switch(true){

    case(id>=200 && id<300):
      return "⛈️";
    case(id>=300 && id<400):
      return "⛈️";
    case(id>=500 && id<600):
      return "⛈️";
    case(id>=600 && id<700):
      return "❄️";
    case(id>=700 && id<800):
      return "🌁";
    case(id===800):
      return "☀️";
    case(id>=801 && id<810):
      return "☁️";
    default:
      return "❓";
  }




}
