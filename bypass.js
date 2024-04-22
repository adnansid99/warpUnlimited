// import https from "https";
// import crypto from "crypto";
const https = require("https");
const crypto = require("crypto");

function genString(stringLength) {
  return crypto
    .randomBytes(Math.ceil(stringLength / 2))
    .toString("hex")
    .slice(0, stringLength);
}

function digitString(stringLength) {
  let digits = "";
  while (digits.length < stringLength) {
    const tempStr = crypto.randomInt(0, 9).toString();
    digits += tempStr;
  }
  return digits;
}

function warpBypass(referrer) {
  const url = `https://api.cloudflareclient.com/v0a${digitString(3)}/reg`;

  function run() {
    return new Promise((resolve, reject) => {
      const install_id = genString(22);
      const body = JSON.stringify({
        key: `${genString(43)}=`,
        install_id: install_id,
        fcm_token: `${install_id}:APA91b${genString(134)}`,
        referrer: referrer,
        warp_enabled: false,
        tos: new Date().toISOString(),
        type: "Android",
        locale: "es_ES",
      });

      const options = {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          "User-Agent": "okhttp/3.12.1",
        },
        method: "POST",
      };

      const req = https.request(url, options, (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.statusCode);
        } else {
          reject(new Error(`HTTP Status Code: ${res.statusCode}`));
        }
      });

      req.on("error", (error) => {
        reject(error);
      });

      req.write(body);
      req.end();
    });
  }

  return run();
}

let success = 0;
let error = 0;
setInterval(() => {
  warpBypass("4be6ddc1-be99-4e53-9096-0f7f9452bcf7")
    .then(() => {
      success += 1;
      console.log(`Success: ${success} | Error: ${error}`);
    })
    .catch(() => {
      error += 1;
      console.log(`Success: ${success} | Error: ${error}`);
    });
}, 12000);
