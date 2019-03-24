import React, {Component} from 'react';
import styled from 'styled-components'
import Input from './bits/input'
import Button from './bits/button'
import * as utils from './bits/utils'

class Intro extends Component {

  constructor(){
    super()
    this.state={
      seed:''
    }
  }

  render () {
    const {seed, connecting} = this.state
    return <Modal>
      <ModalContent>
        <Text>
          Enter your seed to initiate an IOTA Masked Authenticated Message connection.
        </Text>
        <SeedForm>
          <Input type="text" label="Enter Seed" value={seed}
            onChange={(e)=>this.setState({seed:utils.validSeed(e.target.value)})}
          />
          <Button active={connecting} title="Connect" disabled={!seed}
            style={{width:'50px',margin:'6px 0 0 16px'}}
            onClick={()=>this.props.connect(seed)}
          />
        </SeedForm>
        <Button active={false} title="Random Seed" 
          style={{margin:'30px 0'}}
          onClick={()=>this.setState({seed:utils.keyGen(81)})} 
        />
      </ModalContent>
    </Modal>
  }
}

const Modal = styled.div`
  border:1px solid white;
  position:absolute;
  width:400px;
  height:240px;
  top:calc(50% - 150px);
  left:calc(50% - 200px);
  background:rgba(0,0,0,0.75);
`
const ModalContent = styled.div`
  margin:24px;
`
const SeedForm = styled.div`
  margin-top:35px;
  display:flex;
  flex-direction:row;
  justify-content: space-between;
`
const Text = styled.div`
  color:white;
`

export default Intro
