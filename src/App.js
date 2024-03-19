
import { MainIntro } from './Component/MainIntro';
import { Skeleton } from './Component/Skeleton';
import { MiniWeather } from './Component/miniWeather';
import  {Wrapper}  from './Component/wrapper';
import './css/app.css';
import React, { useEffect } from 'react';
import cities from 'cities.json';
import { Input } from './Component/Input';

function App() {
  var date = new Date();
  const [data, setData] = React.useState([]);
  const [city, setCity] = React.useState();
  const [dates, setDates] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isNotValid, setIsNotValid] = React.useState(false);
  const [clues, setClues] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');
  const allCityJson = cities;


  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  
  //     try {
  //       if (!city) {
  //         setIsNotValid(true);
  //         return;
  //       }
  //       const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=6557810176c36fac5f0db536711a6c52`);
  //       const json = await response.json();
  //       setData(json);
  //       if (json && json.list && json.list.length > 0) {
  //         const nextDates = nextDays();
  //         setDates(nextDates);
  //       }
  //     } catch (error) {
  //       console.warn(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  
  //   const fetchGEOData = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await fetch(`https://ipapi.co/json`);
  //       const json = await response.json();
  //       setCity(json.city);
  //     } catch (error) {
  //       console.warn(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  
  //   if (city) {
  //     fetchData();
  //   } else {
  //     fetchGEOData();
  //   }
  // }, [city]);
  React.useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        if (!city) {
          setIsNotValid(true);
          return;
        }
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=6557810176c36fac5f0db536711a6c52`);
        const json = await response.json();
        setData(json);
        if (json && json.list && json.list.length > 0) {
          const nextDates = nextDays();
          setDates(nextDates);
        }
      } catch (error) {
        console.warn(error);
        setIsNotValid(true); // Обработка ошибки, установка isNotValid в true
      } finally {
        setIsLoading(false);
      }
    };

    const fetchGEOData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://ipapi.co/json`);
        const json = await response.json();
        setCity(json.city);
      } catch (error) {
        console.warn(error);
        setIsNotValid(true); // Обработка ошибки, установка isNotValid в true
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    fetchGEOData();
  }, [city]);

  // const handleSumbit = async (e) => {
  //   if (e.key === 'Enter') {
  //     const inputCity = e.target.value;
  //     setIsLoading(true);
  //     try {
  //       const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&APPID=6557810176c36fac5f0db536711a6c52`);
  //       const json = await response.json();
  //       if (json.cod === 200) {
  //         setCity(inputCity);
  //         setIsNotValid(false);
  //       } else {
  //         setIsNotValid(true);
  //       }
  //     } catch (error) {
  //       console.warn(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //     document.querySelector('input').value = '';
  //   }
  // }
  

  // const clueChange = (e) => {
  //   const inputCurrent = e.target.value.toLowerCase().trim();
  //   const arrClue = allCityJson
  //   .flatMap(arr => arr)
  //   .filter(obj => obj.name.toLowerCase().includes(inputCurrent))
  //   .map(obj => obj.name);
  //   setClues(arrClue);
  //   console.log(clues);
  // }
  const clueChange = (e) => {
    setInputValue(e.target.value.toLowerCase().trim());
  };

  useEffect(() => {
    const filteredClues = allCityJson
      .flatMap(arr => arr)
      .filter(obj => obj.name.toLowerCase().includes(inputValue))
      .map(obj => obj.name);
    setClues(filteredClues);
  }, [inputValue, allCityJson]);

  const handleSumbit = (e) => {
    if (e.key === 'Enter') {
      setCity(inputValue);
      setInputValue('');
      setIsNotValid(false);
    }
  };
  

  const getNextDate = (daysToAdd) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + daysToAdd);
    return newDate.toISOString().slice(0, 10);
  }

  const nextDays = () => {
    let dates = [];
  for(let i = 1; i <= 5 ; i++){
    dates = [...dates, getNextDate(i)];
  }
  console.log(dates)
    return dates;
  }


  


  return (
    <div className="App">
      {isLoading ? (
        <>
        <Input handleSumbit={handleSumbit} clueChange={clueChange} clues={clues}/>
          <Skeleton/>
        </>
      ) : isNotValid ? (
        <>
        <Input handleSumbit={handleSumbit} clueChange={clueChange} clues={clues}/>
          <div className='wrapper-intro-box'><MainIntro /></div>
        </>
      ) : (
        <>
          <Input handleSumbit={handleSumbit} clueChange={clueChange} clues={clues}/>
          <div className='weather-block'>
            <Wrapper name={data === '' ? '' : (data.city ? data.city.name : '')}
              photo={data === '' ? '' : (data.list && data.list.length > 0 ? data.list[0].weather[0].icon : '')}
              dayOfWeek={data === '' ? '' : (date.toLocaleDateString('en-US', {weekday : 'long'}))}
              temp={data === '' ? '' : (data.list && data.list.length > 0 ? data.list[0].main : '')}
              weather={data === '' ? '' : (data.list && data.list.length > 0 ? data.list[0].weather[0].description : '')}
            />
            <div className='mini-block'>
              <MiniWeather dayOfWeek={data === '' ? '' : (new Date(dates[0]).toLocaleDateString('en-US', {weekday : 'long'}))} 
                data={data} date={dates[0]}
              />
              <MiniWeather dayOfWeek={data === '' ? '' : (new Date(dates[1]).toLocaleDateString('en-US', {weekday : 'long'}))} 
                data={data} date={dates[1]}
              />
              <MiniWeather dayOfWeek={data === '' ? '' : (new Date(dates[2]).toLocaleDateString('en-US', {weekday : 'long'}))} 
                data={data} date={dates[2]}
              />
              <MiniWeather dayOfWeek={data === '' ? '' : (new Date(dates[3]).toLocaleDateString('en-US', {weekday : 'long'}))} 
                data={data} date={dates[3]}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
  
}

export default App;