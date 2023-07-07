const axios = require('axios');
const { signatureV4 } = require('./signatureV4')

async function clientHttp (baseURL, headers) {
  let customAxios = axios.create({
    baseURL: baseURL || 'https://api.example.com', // API base URL
    headers: headers || {
      'Content-Type': 'application/json', // Set default content type
    }
  });

  // INTERCEPTOR FOR REQUEST
  customAxios.interceptors.request.use(
    async function (config) {
      const { sign } = config

      customAxios.interceptors.request.clear()

      console.log("SIGN", sign)

      if (sign != null) {
        const signatureV4Result = await signatureV4({ region: process.env.REGION, service: sign })
        customAxios.interceptors.request.use(signatureV4Result)
      }

      customAxios.interceptors.request.use((req) => {
        console.log('Request Interceptor', {
          baseUrl: req.baseURL,
          data: req.data,
          headers: req.headers,
          method: req.method,
          params: req.params,
          url: req.url
        })
  
        return req
      })

      return config;
    },
    function (error) {
      console.error('Request Interceptor Error:', error);
      return Promise.reject(error);
    }
  );

  customAxios.interceptors.response.use(
    function (response) {
      console.log('Response Interceptor:', response);
      return response;
    },
    function (error) {
      console.error('Response Interceptor Error:', error);
      return Promise.reject(error);
    }
  );

  // Add custom methods to the customAxios instance
  Object.assign(customAxios, {
    get: customAxios.get || axios.get,
    post: customAxios.post || axios.post
    // Add other HTTP methods as needed
  });

  console.log("clientHttp", customAxios)

  return customAxios;
}

module.exports = { clientHttp }