import React, {Component} from 'react';
import styled from 'styled-components'
import Send from './send'
import Receive from './receive'
import { asciiToTrytes, trytesToAscii } from '@iota/converter'
import {usePowSrvIO} from '../powsrv/powsrv.js'
import * as utils from './bits/utils'

const Mam = window.dep.mam

class MAM extends Component {

  constructor(){
    super()
    this.state={
      initialized:false,
      sideKey:'',
      mode:'public'
    }
    this.iota = null;
    this.mamState = null;
  }

  // https://testnet140.tangle.works
  // https://field.deviota.com:443
  // 181.143.154.229:14265
  // https://iotanode.us:443
  // https://potato.iotasalad.org:14265

  componentDidMount() {
    this.init('https://nodes.thetangle.org:443')
    utils.EE.on('node-change',this.init)
  }

  init = (e) => {
    console.log(e)
    this.mamState = Mam.init({
      //provider:`https://potato.iotasalad.org:14265`,
      provider:e,
      attachToTangle: usePowSrvIO(5000, null)
    })
    console.log(this.mamState)
    this.setState({initialized:true})
  }

  // componentWillMount(){
  //   this.iota = new IOTA({ provider: `https://testnet140.tangle.works` })
  //   usePowSrvIO(this.iota, 5000, null)
  //   this.mamState = Mam.init(this.iota, seed)
  //   console.log(this.mamState)
  //   this.setState({initialized:true})
  // }

  toTrytes = (a) => asciiToTrytes(JSON.stringify(a))
  fromTrytes = (a) => JSON.parse(trytesToAscii(a))

  changeMode = (mode,sideKey) => {
    if(mode==='public' || mode==='private'){
      this.setState({mode})
      this.mamState = Mam.changeMode(this.mamState, mode)
    } else if(mode==='restricted' && sideKey){
      this.setState({mode,sideKey})
      this.mamState = Mam.changeMode(
        this.mamState,
        'restricted',
        this.toTrytes(sideKey)
      )
    } else {
      console.error('Wrong mode')
    }
  }

  sendMessage = async (msg) => {
    var message = Mam.create(this.mamState, this.toTrytes(msg))
    console.log("MESSAGE",message)
    this.mamState = message.state
    // need to specify 3, 14 for mainnet
    const attached = await Mam.attach(message.payload, message.address, 3, 14)
    if(attached){
      return message.root
    } else {
      console.error("could not attach")
    }
  }

  fetchMessages = async (rooot, sideKey, mode) => {
    //console.log(rooot, sideKey, mode)
    
    if(rooot) {
      const messages = []
      var resp = await Mam.fetch(
          rooot,
          mode,
          sideKey ? this.toTrytes(sideKey) : null,
          (r) => messages.unshift(this.fromTrytes(r))
      )
      if(resp && resp.nextRoot){
        console.log(`fetched ${messages.length} messages`)
        return {
          messages: messages,
          nextRoot: resp.nextRoot,
        }
      }
    }
  }

  render () {
    const {initialized, sideKey, mode} = this.state
    return <Body>
      <Content>
        <Send sideKey={sideKey} mode={mode} 
          changeMode={this.changeMode} 
          sendMessage={this.sendMessage} />
        <Receive fetch={this.fetchMessages} />
      </Content>
    </Body>
  }
}
const Body = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: start;
  align-items:center;
  height:100%;
`
const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: start;
  align-items:center;
  max-height:calc(100vh - 75px);
`

export default MAM
