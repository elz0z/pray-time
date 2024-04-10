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
import moment from 'moment';
import "moment/dist/locale/ar-dz";

export default function MainContent() {
  moment.locale("ar");

  const [country, setCountry] = React.useState({
    displayName: "السعودية",
    apiName: "SA",
  });

  const handleCountryChange = (event) => {
    const countryObj = countryList.find((country) => { return country.apiName === event.target.value })
    setCountry(countryObj)
  }
  const [time, setTime] = React.useState("");
  const [date, setDate] = React.useState("");
  const [timer, setTimer] = React.useState("");
  const [nextPrayerIndex, setNextPrayerIndex] = React.useState(0)

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
  const prayerList = [
    { key: "Fajr", displayName: "الفجر" },
    { key: "Dhuhr", displayName: "الظهر" },
    { key: "Asr", displayName: "العصر" },
    { key: "Maghrib", displayName: "المغرب" },
    { key: "Isha", displayName: "العشاء" },
  ]

  const getTime = async () => {
    const response = await axios.get(`https://api.aladhan.com/v1/timingsByCity/10-04-2024?country=${country.apiName}&city=`)
    setTime(response.data.data.timings);
  }

  React.useEffect(() => {
    getTime()
  }, [country])
  React.useEffect(() => {
    const interval = setInterval(() => {
      countDownTimer()
    }, 1000)

    setDate(moment().format("MMM Do YYYY | h:mm"))
    return () => clearInterval(interval);
  }, [time])

  function countDownTimer() {
    const momentNow = moment();
    let prayerIndex = 1
    if (
      momentNow.isAfter(moment(time.Fajr, "hh:mm")) && momentNow.isBefore(moment(time.Dhuhr, "hh:mm"))
    ) {
      prayerIndex = 1
    } else if (
      momentNow.isAfter(moment(time.Dhuhr, "hh:mm")) && momentNow.isBefore(moment(time.Asr, "hh:mm"))
    ) {
      prayerIndex = 2
    } else if (
      momentNow.isAfter(moment(time.Asr, "hh:mm")) && momentNow.isBefore(moment(time.Maghrib, "hh:mm"))
    ) {
      prayerIndex = 3
    } else if (
      momentNow.isAfter(moment(time.Maghrib, "hh:mm")) && momentNow.isBefore(moment(time.Isha, "hh:mm"))
    ) {
      prayerIndex = 4
    } else {
      prayerIndex = 0
    }

    setNextPrayerIndex(prayerIndex)

    const nextPrayerObj = prayerList[prayerIndex];
    const nextPrayerTime = time[nextPrayerObj.key];
    let remainingTime = moment(nextPrayerTime, "hh:mm").diff(momentNow);
    if (prayerIndex === 0) {
      const remTime = momentNow.diff(moment("02:00:00", "h:mm:ss"))
      remainingTime = moment(nextPrayerTime, "hh:mm").diff(remTime)
    }
    const durationTime = moment.duration(remainingTime);
    setTimer(`${durationTime.seconds()} : ${durationTime.minutes()} : ${durationTime.hours()}`)
  }
  return (
    <>
      {/* TOP ROW */}
      <Grid container>
        <Grid xs={6}>
          <h2>{country.displayName}</h2>
          <h3>{date}</h3>
        </Grid>
        <Grid xs={6}>
          <h2>باقى على صلاة {prayerList[nextPrayerIndex].displayName}</h2>
          <h3>{timer}</h3>
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
                <MenuItem key={country.apiName} value={country.apiName}>{country.displayName}</MenuItem>)
            })}

          </Select>
        </FormControl>
      </Stack>
      {/*###SELECT CITY*/}
    </>
  );
}
