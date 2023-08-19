# This is simple weather app create to study react and implement api call

## List of API source
1 https://openweathermap.org/ \
In  Main.tsx insert api key in appid inside params
```
const getWeather = () => {
        const url = `https://api.openweathermap.org/data/2.5/weather`;

        const options  = {
            params: {
                lat:  currLat,
                lon:  currLong,
                appid: {Api Key Here},
                units: 'metric'
            }
        };
```

2 https://console.cloud.google.com/ \
Include this api in index.html
```
<script src="https://maps.googleapis.com/maps/api/js?key={Api Key Here}&libraries=places"></script>
```
3 https://timezonedb.com/api \
In  Main.tsx insert api key in key inside params
```
    const getTime = () => {
        const url = `http://api.timezonedb.com/v2.1/get-time-zone`;

        const options  = {
            params: {
                lat:  currLat,
                lng:  currLong,
                key: {Api Key Here},
                format: 'json',
                by: 'position'
    
            }
        };
```

## Functions
- Openweather api is use to fetch current weather data based on given longitude and latitude. 
- Google api is use to get longitude and latitude from search function. 
- timezonedb api is use to get time data based on longitude and latitude for each location to make icon display day and night.
