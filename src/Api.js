import React from 'react';

function Api() {
  const key = `392295a71823ede3e5a56a6b97ff2bac`;

  let resultatsAPI;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position.coords.latitude);
      const ApiCall = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${key}&units=metric`;
    });
  }
  return <div></div>;
}
export default Api;
