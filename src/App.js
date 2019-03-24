import React, { Component } from 'react';
import styled from "styled-components"
import Mam from './components/mam'

class A extends Component {
  render(){
    return (<App>
      <Header>
        IOTA Masked Messages
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
  background: linear-gradient(145deg, #00646d 42%, #411cce);
  background-size: cover;
`
const Header = styled.div`
  height:75px;
  border-bottom:1px solid white;
  font-size:32px;
  color:white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left:24px;
  background: rgba(0,0,0,0.2);
`