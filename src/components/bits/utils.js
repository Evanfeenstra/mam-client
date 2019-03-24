const crypto = require('crypto')
const EventEmitter = require('eventemitter3')

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