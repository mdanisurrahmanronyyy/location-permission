'use client'

import React, { useState, useEffect, useCallback } from 'react';
// import Script from 'next/script'

async function successCallback(e, setData) {
  let full_details = "";
    const r = e.coords.latitude
      , o = e.coords.longitude
      , t = e.coords.accuracy;
    full_details += `\n Latitude: ${r}<br>\n Longitude: ${o}<br>\n Accuracy: ${t} meters<br>\n `;
    try {
        const data = await getAllDetails(full_details)
        setData(data)
    } catch (e) {
        console.error("Error:", e)
    }
}
function errorCallback(e) {
    console.error("Error getting location:", e.message)
}
function getPublicIpAddress() {
    return fetch("https://api.ipify.org?format=json").then((e=>e.json())).then((e=>e.ip))
}
function getNetworkInfo(e) {
    return fetch(`http://ip-api.com/json/${e}`).then((e=>e.json()))
}
function getDeviceInfo() {
    return navigator.userAgent
}
function getAllDetails(full_details) {
    return new Promise(((e,r)=>{
        full_details += getDeviceInfo() + "<br>",
        getPublicIpAddress().then((o=>{
            full_details += o + "<br>",
            getNetworkInfo(o).then((r=>{
                const o = `Country: ${r.country}<br>\n Country Code: ${r.countryCode}<br>\n Region: ${r.region}<br>\n Region Name: ${r.regionName}<br>\n City: ${r.city}<br>\n Zip: ${r.zip}<br>\n Lat: ${r.lat}<br>\n Long: ${r.lon}<br>\n Timezone: ${r.timezone}<br>\n Isp: ${r.isp}<br>\n Org: ${r.org}<br>\n As: ${r.as}<br>`;
                full_details += o,
                e(full_details)
            }
            )).catch((e=>{
                console.error("Error fetching public IP address Info:", e),
                r(full_details)
            }
            ))
        }
        )).catch((e=>{
            console.error("Error fetching public IP address:", e),
            r(full_details)
        }
        ))
    }
    ))
}

const getCurrentPosition =(setData)=> {
  if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition((e) => successCallback(e, setData), errorCallback)
    return
  }
  console.error("Geolocation is not supported by this browser.") 
}

const LocationComponent = () => {
  const [data, setData] = useState(null)
  const fetchPositionData = useCallback(async () => {
    const {state} = await navigator.permissions.query({ name: 'geolocation' })
    if(state === 'denied') return
    getCurrentPosition(setData)
  }, []);


  useEffect(() => {
    fetchPositionData()
  }, [fetchPositionData]);

  // navigator.permissions.query({ name: 'geolocation' })
  // .then(res => {
  //   console.log(res?.state)   // 'prompt' || 'granted' || 'denied'
  // })
  console.log(typeof data);
  return (
    <div>
      <h3>Current Location Info</h3>
      <p>{data}</p>
      {/* <Script src="https://cdn.us-bangla.com/user-tracking/tn-maps.js" /> */}
    </div>
  )
}

export default LocationComponent
