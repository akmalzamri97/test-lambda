const AWS = require("aws-sdk");
const axios = require('axios');
const { clientHttp } = require('./functions/axios/clientHttp')

// import { clientHttp } from ('./functions/axios/clientHttp')

const lambdaCallApi = async (event) => {
  const URL = 'https://st7lhswbxdvcc2vhfor2rby77m0zrvmv.lambda-url.ap-southeast-1.on.aws/v1.0'
  console.log("lambdaCallApi event", event)

  const { params } = event

  const customAxios = clientHttp( { baseURL: URL, headers: null, config: { signService: 'lambda' } } )


  let result = await customAxios.get(`/customers/${params}`)


  console.log("RESULT", result.data)

  return {
    statusCode: 200,
    body: `Lambda Completed!! ${result}`,
  };
};

module.exports = { lambdaCallApi };
