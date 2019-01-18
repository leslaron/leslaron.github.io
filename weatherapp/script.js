window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description')
    let temperatureDegree = document.querySelector('.temperature-degree')
    let locationTimezone = document.querySelector('.location-timezone')
    let temperatureSection = document.querySelector('.temperature')
    const temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;


            const proxy = `https://cors-anywhere.herokuapp.com/`
            const api = `${proxy}https://api.darksky.net/forecast/65117058594db23e7265f245cbd2557c/${lat},${long}`;
            

        fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            let {temperature, summary, icon } = data.currently;
            temperature = Math.floor(temperature)
            let celsius = Math.floor((temperature - 32) * (5/9));
            //Set DOM elements from the API
            temperatureDegree.textContent = celsius;
            temperatureDescription.textContent = summary;
            locationTimezone.textContent = data.timezone;
            //Temp conversion
            
            //Set Icon
            setIcons(icon, document.querySelector('.icon'));

            //Change temperature to C/F
            temperatureSection.addEventListener('click', () => {
                if(temperatureSpan.textContent === "F"){
                    temperatureSpan.textContent = "C";
                    temperatureDegree.textContent = Math.floor(celsius);
                }else{
                    temperatureSpan.textContent = "F";
                    temperatureDegree.textContent = temperature;
                }
            })
        }); 
    });
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});