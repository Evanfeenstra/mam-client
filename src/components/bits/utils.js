import EventEmitter from 'eventemitter3'

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


export const EE = new EventEmitter() 