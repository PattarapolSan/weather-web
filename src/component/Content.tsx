import React, {useState,useEffect} from 'react';
import './Content.css';
import { WiDayFog,
        WiNightFog, 
        WiNightAltRain, 
        WiDayRain, 
        WiDayShowers, 
        WiNightShowers, 
        WiDayCloudy, 
        WiNightCloudy, 
        WiNightClear, 
        WiDaySunny, 
        WiDayThunderstorm, 
        WiNightThunderstorm } from "react-icons/wi";
import { FiSunrise, FiSunset } from "react-icons/fi";
import axios from 'axios';


interface WeatherIcons {
    [key: string]: JSX.Element;
  }
  
  interface WeatherType {
    [key: string]: WeatherIcons;
  }


const weatherType:WeatherType = {
    day: {
        Clouds: <WiDayCloudy/>,
        Clear: <WiDaySunny/>,
        Rain: <WiDayRain/>,
        Drizzle: <WiDayShowers/>,
        Thunderstorm: <WiDayThunderstorm/>,
        Mist: <WiDayFog/>,
    },
    night: {
        Clouds: <WiNightCloudy/>,
        Clear: <WiNightClear/>,
        Rain: <WiNightAltRain/>,
        Drizzle: <WiNightShowers/>,
        Thunderstorm:<WiNightThunderstorm/>,
        Mist: <WiNightFog/>,
    }
    

}




export const Content = (props:any) => {
   
    
   
    
    const LoadingScreen = () => {
        return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
        );
        
    }

    const riseSet = (time:number) => {
        const timestamp = time;
        const milliseconds = timestamp * 1000; 
        const date = new Date(milliseconds);
        const result = date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            });
        return result;
    }

    const dataScreen = () => {
        
    const currentHour = props.hour;
    const isDaytime = currentHour >= 6 && currentHour < 18;
    const currentWeatherType = props.data.weather[0]?.main;
    const selectedIcon = weatherType[isDaytime ? 'day' : 'night'][currentWeatherType];
      
        
        return (
            <div id="sub-content">
                <h2>{props.data.name}</h2>
                <div id="weather-icon">
                    {selectedIcon}
                </div>
                <p id="description">{props.data.weather[0].description}</p>
                <h3>{props.data.main.temp}˚C</h3>
                <div id="minmax">
                    <p>H: {Math.ceil(props.data.main.temp_max)}˚</p>
                    <p>L: {Math.floor(props.data.main.temp_min)}˚</p>
                </div>
                <div id="riseSet">
                    <p><FiSunrise/> &nbsp; {riseSet(props.data.sys.sunrise)}</p>
                    <p><FiSunset/> &nbsp; {riseSet(props.data.sys.sunset)}</p>
                </div>
                
            </div>
        );
        
    }


    return (
        <div id="content">
            <div>
                {props.loading ? LoadingScreen() : dataScreen()}    
            </div>
        </div>
    )
}

