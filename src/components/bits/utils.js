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

export const nodes = [
  'https://dyn.tangle-nodes.com:443',
  'https://iotanode.us:14267',
  'https://pow.iota.community:443',
  'https://node02.iotatoken.nl:443',
  'https://node06.iotatoken.nl:443',
  'https://we-did-it.org:14265',
  'https://nodes.iota.cafe:443',
  'https://ultranode.iotatoken.nl:443',
  'https://papa.iota.family:14267'
]

export function randomNode(){
  return nodes[Math.floor(Math.random() * nodes.length)]
}

export const EE = new EventEmitter() 