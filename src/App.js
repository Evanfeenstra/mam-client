import React, { Component } from 'react';
import styled from "styled-components"
import Mam from './components/mam'
import Select from './components/bits/select'
import * as utils from './components/bits/utils'
import loader from './components/bits/ajax-loader-small.gif'
import { composeAPI } from '@iota/core'

class A extends Component {

  state={node:'',initialized:false}

  componentDidMount(){
    const node = utils.randomNode()
    this.changeNode(node)
  }

  changeNode = (node) => {
    this.testNode(node)
    utils.EE.emit('node-change',node)
    this.setState({node})
  }

  testNode = async (provider) => {
    const iota = composeAPI({provider})
    try{
      await iota.getNodeInfo()
      this.setState({initialized:true})
    }catch(e){
      console.log(`Mam init error: ${e.message}`)
      this.setState({initialized:false})
      setTimeout(()=>this.changeNode(utils.randomNode()), 2187)
    }
  }

  render(){
    const {initialized} = this.state
    return (<App>
      <Header>
        <span>IOTA Masked Messages</span>
        <Choose><Wrap>
          {initialized ? 
            <Select mode={'Node'} 
              selected={this.state.node}
              noBorder background="#025057"
              style={{width:286,justifyContent:'flex-end'}}  
              options={utils.nodes} 
              onSelect={this.changeNode} 
            /> :
          <Spinner src={loader} />}
        </Wrap></Choose>
      </Header>
      <Mam initialized={initialized} />
    </App>)
  }
}

export default A

const App = styled.div`
  display: flex;
  position:relative;
  flex-direction: column;
  justify-content: start;
  min-height: 100vh;
  height:100vh;
  background: linear-gradient(145deg, #00646d 42%, #411cce);
  background-size: cover;
`
const Header = styled.div`
  height:75px;
  border-bottom:1px solid white;
  font-size:32px;
  color:white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left:24px;
  background: rgba(0,0,0,0.2);
`
const Choose = styled.div`
  height:100%;
  font-size:13px;
  position:relative;
`
const Wrap = styled.div`
  position:absolute;
  top:15px;
  right:20px;
`
const Spinner = styled.img`
  height: 7px;
  position: absolute;
  top: 21px;
  right: 21px;
`