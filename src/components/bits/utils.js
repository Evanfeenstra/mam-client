const crypto = require('crypto')
const EventEmitter = require('eventemitter3')

export let API_URL = 'mam-broker.herokuapp.com'
let protocol = 'https://'
if (typeof window !== 'undefined'){
  if(window.location.hostname==='localhost'){
    API_URL = 'localhost:5000'
    protocol = 'http://'
  } 
}

export const API = async (url, body) => {
  const options = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(body)
  }
  try {
    let response = await fetch(protocol + API_URL + url, options)
    let responseJson = await response.json()
    return responseJson
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const validAmount = amount => amount.replace(/[^0-9]/g,'')

export const validSeed = seed => seed.replace(/[^9A-Z]/g,'')

export const validASCII = (str) => str.replace(/[^\x00-\x7F]*$/g,'')

export function isASCII(str) {
    return /^[\x00-\x7F]*$/.test(str);
}

export const isClient =
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement

export const keyGen = length => {
    var charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9'
    var values = crypto.randomBytes(length)
    var result = new Array(length)
    for (var i = 0; i < length; i++) {
        result[i] = charset[values[i] % charset.length]
    }
    return result.join('')
}

export const EE = new EventEmitter() 