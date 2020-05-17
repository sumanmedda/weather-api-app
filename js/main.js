window.addEventListener('load', () => {
    let long;
    let lat;
    
    let tempDescription = document.querySelector('.temp-description');
    let tempDegree = document.querySelector('.temp-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperatureSection');
    let temperatureText = document.querySelector('.temperatureSection span');


    let key = 'fd9d9c6418c23d94745b836767721ad1';

    let longitudeLoc = document.getElementById('long');
    let latitudeLoc = document.getElementById('lat');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(latLong => {
            long = latLong.coords.longitude;
            lat = latLong.coords.latitude;
            longitudeLoc.innerHTML = long;
            latitudeLoc.innerHTML = lat;

            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/${key}/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const { temperature,summary,icon} = data.currently;
                    
                    tempDescription.innerHTML = summary;
                    tempDegree.innerHTML = Math.floor(temperature);
                    locationTimezone.innerHTML = data.timezone;

                    const FtoC = (temperature - 32) * 5 / 9;
                    
                    setIcon(icon,document.querySelector('.icon'));

                    temperatureSection.addEventListener('click', () => {
                        if (temperatureText.innerHTML === 'F') {
                            temperatureText.innerHTML = 'C';
                            tempDegree.innerHTML = Math.floor(FtoC);
                        }
                        else {
                            temperatureText.innerHTML = 'F';
                            tempDegree.innerHTML = Math.floor(temperature);
                        };
                    });
                })    
        });
        
    }

    function setIcon(icon,iconID){
        const skycons = new Skycons({color:"white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);

    }
});

