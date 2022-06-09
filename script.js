"use strict";
let data1 = "";
let localData = JSON.parse(localStorage.getItem("data"));
// document.querySelector(".lData").innerHTML = localData;
const array = [];

async function getData() {
  const response = await fetch(
    `https://ipgeolocation.abstractapi.com/v1/?api_key=f62c08003cb646dcb698199c8a40cc6f&ip_address=${get_val()}`
  );
  const response1 = await fetch(
    `https://geo.ipify.org/api/v2/country?apiKey=at_3J5A9PokRUWVpXHZ3l4wirJ86CgsL&ipAddress=${get_val()}`
  )
    .then((res) => res.json())
    .then((result) => (data1 = result));
  const data = response.json();
  console.log(data1);
  data
    .then((d) => {
      if (
        /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
          get_val()
        ) ||
        /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/.test(
          get_val()
        )
      ) {
        console.log(d);
        array.push(d.ip_address);
        localStorage.removeItem("data");
        window.localStorage.setItem("data", JSON.stringify(array));
        document.querySelector(".ldata1").innerHTML = "";
        array.map((ele) => {
          document.querySelector(".ldata1").innerHTML += `
            <p class="lData text-center p-2 mx-3">${ele}</p>`;
        });

        document.querySelector("#ip-address").innerHTML = d.ip_address;
        document.querySelector(".time").innerHTML = data1.location.timezone;
        document.querySelector(".location").innerHTML = data1.location.region;
        document.querySelector(".isp").innerHTML = data1.isp;
        document.querySelector(".img").style.display = "none";

        var map = L.map("issMap").setView([d.latitude, d.longitude], 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        L.marker([d.latitude, d.longitude])
          .addTo(map)
          .bindPopup("Here is the location of ip address.")
          .openPopup();
        console.log("your ip is");
        return true;
      }
      document.querySelector(".alert").innerHTML =
        "Invalid ip address please enter correct ip address";
      return false;
    })
    .catch((err) => console.log(err));
}

function get_val() {
  return document.querySelector("#inputData").value;
}
