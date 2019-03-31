import React, { Component } from 'react';
import styled from "styled-components"
import Mam from './components/mam'
import Select from './components/bits/select'
import * as utils from './components/bits/utils'

class A extends Component {
  render(){
    return (<App>
      <Header>
        <span>IOTA Masked Messages</span>
        <Choose><Wrap>
          <Select mode={'Node'}
            noBorder background="#025057"
            style={{width:286,justifyContent:'flex-end'}}  
            options={utils.nodes} 
            onSelect={(e)=>utils.EE.emit('node-change',e)} 
          />
        </Wrap></Choose>
      </Header>
      <Mam />
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
  top:14px;
  right:20px;
`