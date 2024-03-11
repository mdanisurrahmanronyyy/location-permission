let full_details = "";
async function successCallback(e) {
    const r = e.coords.latitude
      , o = e.coords.longitude
      , t = e.coords.accuracy;
    full_details += `\n Latitude: ${r}<br>\n Longitude: ${o}<br>\n Accuracy: ${t} meters<br>\n `;
    try {
        await getAllDetails()
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
function getAllDetails() {
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
function fetchData() {
    return console.log(full_details),
    full_details
}
"geolocation" in navigator ? navigator.geolocation.getCurrentPosition(successCallback, errorCallback) : console.error("Geolocation is not supported by this browser.");
