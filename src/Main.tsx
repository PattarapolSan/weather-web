import React, {useState,useEffect} from "react";
import './Main.css';
import { Content } from "./component/Content";
import { FiSearch, FiMapPin } from "react-icons/fi";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
import axios from "axios";
  
  


enum TimeOfDay {
    Morning = 'morning',
    Noon = 'noon',
    Sunset = 'sunset',
    Night = 'night'
  }



const Main = () => {

    const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>(TimeOfDay.Night);
    const [currLat, setLat] = useState('');
    const [currLong, setLong] = useState('');
    const [data, setData] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [currTime, setCurrTime] = useState('');
    const [currHour, setCurrHour] = useState<number>();

    const getTime = () => {
        const url = `http://api.timezonedb.com/v2.1/get-time-zone`;

        const options  = {
            params: {
                lat:  currLat,
                lng:  currLong,
                key: 'MF71TVBAE686',
                format: 'json',
                by: 'position'
    
            }
        };

        axios.get(url,options).then((response) => {
            console.log(response);
            const formattedString = response.data.formatted;
            const date = new Date(formattedString);
            
            const options = {
              hour: 'numeric' as const,
              minute: 'numeric' as const,
              hour12: false,
            };
            
            const timeInAmPm = date.toLocaleTimeString('en-US', options);
            setCurrTime(timeInAmPm);
        } )
        .catch((error) => {
            console.log(error);
        })

    }
    

    const getWeather = () => {
        const url = `https://api.openweathermap.org/data/2.5/weather`;

        const options  = {
            params: {
                lat:  currLat,
                lon:  currLong,
                appid: '668bbc3aca97dfcdee5e638e17bcb1e8',
                units: 'metric'
            }
        };

        axios.get(url,options).then((response) => {
            console.log(response.data);
            setData(response.data);
            setIsLoading(false);
        } )
        .catch((error) => {
            console.log(error);
        })

    }

    const success = (pos:any) => {
      const crd = pos.coords;
      setLat(crd.latitude);
      setLong(crd.longitude);
  
      
    }

    useEffect(()=>{
     
      const [hourString] = currTime.split(":");
      const hour = parseInt(hourString, 10);
      setCurrHour(hour);

      if (hour >= 6 && hour < 10) {
        setTimeOfDay(TimeOfDay.Morning);
      } else if (hour >= 10 && hour < 18) {
        setTimeOfDay(TimeOfDay.Noon);
      } else if (hour >= 18 && hour < 20) {
        setTimeOfDay(TimeOfDay.Sunset);
      } else {
        setTimeOfDay(TimeOfDay.Night);
      }


    },[currTime])


    useEffect(() =>{
        
        
        
        navigator.geolocation.getCurrentPosition(success);
            

      }, []);

      const getCurrLocation = () => {
        navigator.geolocation.getCurrentPosition(success);
      }


      useEffect(() => {
        getTime();
        getWeather();
        const intervalId = setInterval(getWeather, 120000);
        return () => clearInterval(intervalId);

      },[currLat,currLong]);


      const handleAddressSelect = async (address: string) => {
        try {
          const results = await geocodeByAddress(address);
          const latLng = await getLatLng(results[0]);
          setSelectedAddress(address);
          setLat(latLng.lat.toString());
          setLong(latLng.lng.toString());
        } catch (error) {
          console.error('Error selecting address:', error);
        }
      };

      const search = () => {
        return(
          <PlacesAutocomplete
            value={selectedAddress}
            onChange={setSelectedAddress}
            onSelect={handleAddressSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: 'Search Places...',
                    style: {
                      width: '100%',
                      padding: '10px',
                      fontSize: '16px',
                      borderRadius: '5px',
                    },
                  })}
                />

              </div>
            )}
          </PlacesAutocomplete>
        );
      }

    


      
    return (
        <div id="main" className={`${timeOfDay}`}>
            <h1>Weather</h1>
          <Content data={data} loading={isLoading} lat={currLat} lon={currLong} hour={currHour}/>
            <div id="menu">
              <div id="menu-first">
                <FiMapPin className="icon" onClick={getCurrLocation}/>
              </div>
              <div>
                {search()}
              </div>
            </div>
        </div>
    )
}

export default Main;
