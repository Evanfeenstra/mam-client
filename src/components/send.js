import React, {Component} from 'react';
import styled from 'styled-components'
import Button from './bits/button'
import Select from './bits/select'
import * as utils from './bits/utils'

class S extends Component {

  constructor(){
    super()
    this.state={
      updatingMode:false,
      sendingMessage:false,
      message:'',
    }
  }

  render () {
    const {updatingMode, message, sendingMessage} = this.state
    const {mode, sideKey, sendMessage, initialized} = this.props
    return <Send>
      <Content>
        <div>
          <Message style={{resize:'none'}} value={message} 
            placeholder="Write your message here" 
            onChange={(e)=>{
              //if(utils.isASCII(e.target.value)){
                this.setState({message: utils.validASCII(e.target.value)})
              //}
            }}
          />
          <Button active={sendingMessage} title="Send Message" 
            style={{margin:'11px 0'}} disabled={!message || !initialized}
            onClick={async ()=>{
              this.setState({sendingMessage:true})
              const rooot = await sendMessage(message)
              console.log(rooot)
              this.setState({message:'',sendingMessage:false})
              utils.EE.emit('root',rooot)
            }}
          />
        </div>
        <ChooseMode>
          <div>Choose Masking mode:</div>
          <Select mode={mode}
            style={{width:184}}  
            options={['public','private','restricted']} 
            onSelect={this.props.changeMode} 
            active={updatingMode}
            extraInputText={sideKey}
          />
        </ChooseMode>
      </Content>
    </Send>
  }
}

const Send = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: start;
  color:white;
  margin:32px;
  border:1px solid white;
  max-height:260px;
  min-height:260px;
  width:715px;
`
const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items:start;
  color:white;
  margin:20px;
`
const Message = styled.textarea`
  border:1px solid white;
  background:rgba(255,255,255,0.1);
  color:white;
  font-size:20px;
  width:429px;
  height:130px;
  padding:20px;
  &::-webkit-input-placeholder{
    color:#9a9a9a;
  }
`
const ChooseMode = styled.div`
  margin-left:20px;
`

export default S
