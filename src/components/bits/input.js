import React from 'react';
import styled from 'styled-components'

const I = props => {
  if (typeof window !== 'undefined'){
    return <Content {...props}>
      <Input onChange={props.onChange} type={props.type || 'text'} 
        value={props.value} size={props.size}
      />
      <Label size={props.size} value={props.value}>
        {props.label}
      </Label>
    </Content>
  }
  return <span />
}

const Content = styled.div`
  display: inline-block;
  padding-top: 10px;
  margin-bottom: 15px;
  margin-top:4px;
  position: relative;
  text-align: left;
  width: ${p => p.width ? p.width : 'auto'};
  margin-top: ${p=>p.size==='small'? '4px' : '0'};
`
const Input = styled.input`
  font-size: ${p=>p.size==='small'?'16px':'20px'};
  height: ${p=>p.size==='small'?'26px':'30px'};
  font-family: inherit;
  color: white;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  box-sizing: border-box;
  display: block;
  background-color: transparent;
  color: rgba(0,0,0,.87);
  border: none;
  border-bottom: 1px solid white;
  outline: 0;
  width: 100%;
  padding: 0;
  box-shadow: none;
  border-radius: 0;
  background-image: none;
  color:white;
  &:focus{
    border-color: teal;
    border-width: 2px;
    margin-bottom: -1px;
    height: ${p=>p.size==='small'?'27px':'31px'};
  }
  &:focus~label{
    transform: translate(0,${p=>labtrans(p,true)});
    -webkit-transform: translate(0,${p=>labtrans(p,true)});
    -ms-transform: translate(0,${p=>labtrans(p,true)});
    font-size: ${p=>labfont(p,true)};
    color: #00a0a0;
  }
  &::-webkit-outer-spin-button, &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}
`
const labfont = (props,bit) =>{
  if(props.value||bit) return props.size==='small'?'10px':'12px'
  return props.size==='small'?'17px':'20px'
}
const labtrans = (props,bit) => {
  if(props.value||bit) return props.size==='small'?'-1px':'-3px';
  return props.size==='small'?'10px':'10px'
}
const Label = styled.label`
  transform: translate(0,${p=>labtrans(p)});
  -webkit-transform: translate(0,${p=>labtrans(p)});
  -ms-transform: translate(0,${p=>labtrans(p)});
  font-size: ${p=>labfont(p)};
  transition: 0.15s ease-out;
  position: absolute;
  top: 0;
  display: block;
  width: 100%;
  color: grey;
  font-weight: 400;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-overflow: clip;
  cursor: text;
  pointer-events: none;
`

export default I
