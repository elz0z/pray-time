import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Prayer from "./Prayer"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import fajr from "./../assets/fajr.jpeg"
import duhr from "./../assets/duhr.jpeg"
import asr from "./../assets/asr.jpeg"
import maghrib from "./../assets/maghrib.jpeg"
import isha from "./../assets/isha.jpeg"

export default function MainContent() {

  const getTime = async (con) => {
    const response = await axios.get(`https://api.aladhan.com/v1/timingsByCity/10-04-2024?country=${con}&city=`)
    setTime(response.data.data.timings);
  }

  const [country, setCountry] = React.useState({
    displayName: "السعودية",
    apiName: "SA",
  });

  const handleCountryChange = (event) => {
    const countryObj = countryList.find((country) => { return country.apiName === event.target.value })
    setCountry(countryObj)
  }

  React.useEffect(() => {
    getTime(country.apiName)
  }, [country])

  const [time, setTime] = React.useState("");
  const [date, setDate] = React.useState("23:11:23");


  const countryList = [
    {
      displayName: "السعودية",
      apiName: "SA",
    },
    {
      displayName: "مصر",
      apiName: "EG",
    },
    {
      displayName: "فلسطين",
      apiName: "PS",
    },
    {
      displayName: "العراق",
      apiName: "IQ",
    },
    {
      displayName: "الاردن",
      apiName: "JO",
    }
  ]

  return (
    <>
      {/* TOP ROW */}
      <Grid container>
        <Grid xs={6}>
          <h2>{country.displayName}</h2>
          <h3>{date}</h3>
        </Grid>
        <Grid xs={6}>
          <h2>الصلاة القادمة</h2>
          <h3>01:40:00</h3>
        </Grid>
      </Grid >
      {/*** TOP ROW END */}
      < Divider style={{ borderColor: "white", opacity: "0.3" }
      } />


      {/* PRAYER CARDS */}
      <Stack id="cardContainer" justifyContent="space-between" direction="row" >
        <Prayer name={"الفجر"} time={time.Fajr} img={fajr} />

        <Prayer name={"الظهر"} time={time.Dhuhr} img={duhr} />

        <Prayer name={"العصر"} time={time.Asr} img={asr} />


        <Prayer name={"المغرب"} time={time.Maghrib} img={maghrib} />

        <Prayer name={"العشاء"} time={time.Isha} img={isha} />

      </Stack>
      {/*### END PRAYER CARDS*/}


      {/*SELECT CITY*/}

      <Stack style={{
        marginTop: "40px",
      }} direction="row" justifyContent="center ">
        <FormControl id="MuiForm">
          <InputLabel id="demo-simple-select-label">
            <span>المدينة</span>
          </InputLabel>

          <Select
            value={country.apiName}
            style={{
              backgroundColor: "white",
            }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={handleCountryChange}
          >
            {countryList.map((country) => {
              return (
                <MenuItem value={country.apiName}>{country.displayName}</MenuItem>)
            })}

          </Select>
        </FormControl>
      </Stack>

      {/*###SELECT CITY*/}

    </>
  );
}
