const axios = require("axios");
const { signatureV4 } = require("./signatureV4");

function clientHttp({ baseURL, headers, config: { signService } }) {

  console.log("clientHttp", baseURL, headers )
  console.log("clientHttp signService", signService)

  let customAxios = axios.create({
    baseURL: baseURL || "https://api.example.com", // API base URL
    headers: headers || {
      "Content-Type": "application/json", // Set default content type
    },
  });

  // INTERCEPTOR FOR REQUEST

  customAxios.interceptors.request.use((req) => {
    console.log("Request Interceptor 1", req);

    if(signService != null){
      const signatureV4Result = signatureV4({ region: process.env.REGION, service: signService }, req, customAxios)
      return signatureV4Result;
    }
    return req;
  });

  console.log("request interceptor: DONE")

  console.log("clientHttp", customAxios);

  return customAxios;
}

module.exports = { clientHttp };
