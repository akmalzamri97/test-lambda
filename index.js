const AWS = require("aws-sdk");
// const { default: axios } = require("axios");

const { clientHttp } = require('./functions/axios/clientHttp')

// import { clientHttp } from ('./functions/axios/clientHttp')

const lambdaCallApi = async (event) => {
  const URL = 'https://st7lhswbxdvcc2vhfor2rby77m0zrvmv.lambda-url.ap-southeast-1.on.aws'
  console.log("lambdaCallApi event", event)

  const { params } = event

  const customAxios = await clientHttp(URL, null)

  console.log('customAxios', customAxios)

  let result = await customAxios.get(`/customers/${params}`)
    .then(res => 
    {
      return res
    }); 

  console.log("RESULT result", result)
  console.log("RESULT", result.data)

  return {
    statusCode: 200,
    body: `Lambda Completed!! ${result}`,
  };
};

module.exports = { lambdaCallApi };
