import React, { useState, useEffect } from "react";
import "./App.css";
import InfoBox from "./InfoBox";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
  colors,
} from "@material-ui/core";
import Map from "./Map";
import Table from "./Table";
import { prettyPrintStat, sortData } from "./utils";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";
function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setcountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  // const [mapcenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  // const [mapZoom, setMapzoom] = useState(3);

  const [mapcenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapzoom] = useState(-1);
  const [casesType, setCaseType] = useState("cases");

useEffect(()=>{
  fetch('https://disease.sh/v3/covid-19/all')
    .then(res => res.json())
    .then(data =>{
       setcountryInfo(data);
})
},[]);

  //state=> write a variable  in react
  //useeffect run a piece of code based on a given codition
  useEffect(() => {
    //async =>sending ,wait for it ,do something info
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
        });
    };
    getCountriesData();
    // onCountryChange({target:{Event:"worldwide"}});
  }, []);

  const onCountryChange = async (event) => {
    const countrycode = event.target.value;
    console.log("countrycode", countrycode);
    setCountry(countrycode);
    const url =
      countrycode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countrycode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setcountryInfo(countrycode);

        setcountryInfo(data);
        if(countrycode!=="worldwide")
        {
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapzoom(4);
      }else{
        setMapzoom(1);
      }

      });
  };
  // console.log(data)

  // console.log("info:", countryInfo);

  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1> COVID - 19 - TRACKER </h1>
          <FormControl className="app_dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {/* Header*/} {/* Title+ Select input dropdown field*/}
        {/* InfoBoxes*/}
        <div className="app_status">
          <InfoBox
         
            isRed
          active={casesType ==="cases"}
            onClick={(_e) => setCaseType("cases")}
            title="Coronavirus Cases"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={countryInfo.cases}
          />
          <InfoBox
            active={casesType ==="recovered"}
            onClick={(_e) => setCaseType("recovered")}
            title="Recovered"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={countryInfo.recovered}
          ></InfoBox>
          <InfoBox
           isRed
           active={casesType ==="deaths"}
            onClick={(_e) => setCaseType("deaths")}
            title="Deaths"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={countryInfo.deaths}
          ></InfoBox>
        </div>
        {/* Map*/}
        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapcenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app_right">
        {/* Table*/}
        {/* Graph*/}
        <CardContent>
          <h3>Live Cases by country</h3>
          <Table countries={tableData} />
          <h3 className="app_graphtitle">Worldwide new cases {casesType}</h3>
          <LineGraph className="app_graph" casestype={casesType}/>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
// onChange={e => setCountry(e.target.value)}
