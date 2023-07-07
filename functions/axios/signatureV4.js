const axios = require('axios');
const sign = require('aws4');

const signatureV4 = async (config) => {

  const url = axios.getUri(config)

  const { host, pathname, search } = new URL(url)
  const { data, headers, method } = config
  
  if (method == null) {
    throw new Error('No method in config. Unable to sign request.')
  }

  const transformRequest = getTransformer(config)

  const transformedData = transformRequest(data, headers)

  // Remove all the default Axios headers
  const {
    common,
    delete: _delete, // 'delete' is a reserved word
    get,
    head,
    post,
    put,
    patch,
     ...headersToSign
  } = headers  

  const signingOptions = {
    body: transformedData,
    headers: _.omitBy(headersToSign, _.isNil),
    host,
    method: method.toUpperCase(),
    path: pathname + search,
    region: this.options?.region,
    service: this.options?.service,
    signQuery: false
  }


  sign(signingOptions)

  config.headers = new axios.AxiosHeaders(signingOptions.headers)

  return config
}

const getTransformer = (config) => {
  const { transformRequest } = config

  if (transformRequest != null) {
    if (typeof transformRequest === 'function') {
      return transformRequest
    } else if (transformRequest.length > 0) {
      return transformRequest[0]
    }
  }

  throw new Error('Could not get default transformRequest function from Axios defaults')
}

module.exports = { signatureV4 }