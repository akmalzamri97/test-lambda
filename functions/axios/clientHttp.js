const axios = require("axios");
const { signatureV4 } = require("./signatureV4");

function clientHttp({ baseURL, headers, config: { signService } }) {

  console.log("clientHttp", baseURL, headers )
  console.log("clientHttp signService", signService)

  let customAxios = axios.create({
    baseURL: baseURL || "https://api.example.com", // API base URL
    headers: headers || {
      "Content-Type": "application/json", // Set default content type
      // "Authorization": "Bearer eyJraWQiOiJKZDRIekZ6bVkyeGpKRkhFa0xxSmY5bUFvdXpCOTR1UzJ2Z2hUOE9jdElZPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2ZnNwdG0zMTdhY2dtZ2lxdTNpN3JtZzNyMiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoibW9saS1jdXN0b21lclwvYWxsIG1vbGktbmV0d29ya1wvYWxsIiwiYXV0aF90aW1lIjoxNjg4OTUzOTAzLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGhlYXN0LTEuYW1hem9uYXdzLmNvbVwvYXAtc291dGhlYXN0LTFfRGlsZDdWQ000IiwiZXhwIjoxNjg4OTU3NTAzLCJpYXQiOjE2ODg5NTM5MDMsInZlcnNpb24iOjIsImp0aSI6IjRiMDVmYjU4LWUwMDEtNGY1Yi05MGU3LTU4MjMzZjcxYThjNiIsImNsaWVudF9pZCI6IjZmc3B0bTMxN2FjZ21naXF1M2k3cm1nM3IyIn0.LZ5dCObbFKI6q58pJZPTw8I_8-encLw2uLR_3mAfgeCpwADQu13ypy2RAtngnDMwtBb2aGXhhj4MPduiV1_WiVZwIxVxPK1yITWz5yqfMZBUuSLbmygQmcZT1UG8PLAeCX0ungwUwaq_T4vm2-6Unp_TBegBe2d7IPQQIBRg__1jDPmgAGp3AUPBbNX-dxIS4P5s8A10nka4rhUh7UUieudhrESUud24p9vlbZIQgw3vJa_hBszLh4AfMMN30zq6G2Y9j5ayzo2aLjnQaxXw5_EWZ2k54tyOZWxsETLW_CK_fGN0DqAPwhHGkME5s7aP7sVpgCJVY1m-9V4lv7-RFQ"
    },
  });

  // INTERCEPTOR FOR REQUEST

  customAxios.interceptors.request.use((req) => {

    if(signService != null){
      const signatureV4Result = signatureV4({ region: process.env.REGION, service: signService }, req)
      return signatureV4Result;
    }
    return req;
  });


  return customAxios;
}

module.exports = { clientHttp };
