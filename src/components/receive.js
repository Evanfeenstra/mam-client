import React, { Component } from 'react';
import styled from 'styled-components'
import Button from './bits/button'
import Select from './bits/select'
import Input from './bits/input'
import { EE } from './bits/utils'
import { asciiToTrytes, trytesToAscii } from '@iota/converter'

//LENGTH OF MAM MESSAGE
// 8687 is MAX LENGTH OF MESSAGE

// skills n exp, lingk, remote, lingk why leave?, tech sttrength, iota + fognet, ideas! teaching exp advocate too. next week time slots

class R extends Component {

  constructor() {
    super()
    this.state = {
      mode: 'public',
      nextRoot: '',
      fetching: false,
      messages: []
    }
  }

  componentDidMount() {
    setTimeout(() => this.preload(), 500)
  }

  preload() {
    if (typeof window !== 'undefined') {
      let params = (new URL(document.location)).searchParams;
      const nextRoot = params.get('root')
      let sideKey = params.get('sideKey')
      const mode = params.get('mode')
      const sideKeyTrytes = params.get('sideKeyTrytes')
      if (sideKeyTrytes) {
        sideKey = this.fromTrytes(sideKeyTrytes)
      }
      //console.log(nextRoot,sideKey,mode)
      if (nextRoot && sideKey && mode) {
        this.setState({ mode, sideKey, nextRoot }, () => {
          this.fetch()
        })
      }
    }
    EE.on('root', (rooot) => {
      this.setState({ nextRoot: rooot })
    })
  }

  toTrytes = (a) => asciiToTrytes(JSON.stringify(a))
  fromTrytes = (a) => JSON.parse(trytesToAscii(a))

  fetch = async () => {
    this.setState({ fetching: true })
    const { nextRoot, sideKey, mode } = this.state
    try {
      const r = await this.props.fetch(
        nextRoot, this.toTrytes(sideKey), mode
      )
      console.log(r)
      if (r && r.messages) {
        const newMessages = r.messages.map((m) => {
          let j = m
          try {
            j = JSON.parse(m)
          } catch (e) { }
          return j
        })
        const messages = newMessages.concat(this.state.messages)
        this.setState({ messages })
      }
      this.setState({ fetching: false })
    } catch (e) {
      this.setState({ fetching: false })
    }
  }

  render() {
    const { mode, fetching, nextRoot, messages, sideKey } = this.state
    const { initialized } = this.props
    const rooot = nextRoot
    return <Receive>
      <Toolbar>
        <div style={{ margin: '7px 12px' }}>
          <Input type="text" label="Root Address" value={rooot}
            onChange={(e) => this.setState({ nextRoot: e.target.value })}
            width="400px" size="small" val={rooot} />
        </div>
        <Button active={fetching} title="Fetch"
          disabled={!rooot || !initialized}
          style={{ margin: '14px 0' }}
          onClick={this.fetch}
        />
        <ChooseMode>
          <Select mode={mode} sideKey={sideKey}
            style={{ width: 184 }} listen background="#0b4864"
            options={['public', 'private', 'restricted']}
            onSelect={(mode, sideKey) => this.setState({ mode, sideKey })}
          />
        </ChooseMode>
      </Toolbar>
      <Messages>
        {messages.map((m, i) => {
          return (<Message key={i}>
            {JSON.stringify(m, null, 2)}
          </Message>)
        })}
      </Messages>
    </Receive>
  }
}

const Receive = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: start;
  color:white;
  margin:0 32px 32px 32px;
  border:1px solid white;
  width:715px;
  background:rgba(0,0,0,0.2);
  height:calc(100% - 350px);
`
const Toolbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items:start;
  width:100%;
  height:60px;
  min-height:60px;
  border-bottom:1px solid white;
`
const ChooseMode = styled.div`
  margin:7px 13px;
`
const Messages = styled.div`
  overflow:scroll;
  padding-bottom:10px;
`
const Message = styled.pre`
  margin:6px 12px;
  padding:6px 12px 8px 12px;
  background:rgba(255,255,255,0.1);
  border-radius:5px;
  font-size:14px;
`

export default R
