import React, {Component} from 'react';
import styled from 'styled-components'
import * as utils from './utils'
import Input from './input'
import loader from './ajax-loader-small.gif'

class S extends Component {

  constructor(props){
    super()
    this.state={
      open:false,
      mounted:false,
      extraComponent:null,
      extraInputText:''
    }
    if(props.listen){
      utils.EE.on('changeMode',(e)=>{
        if(e.sideKey) {
          this.setState({extraInputText: e.sideKey})
        }
        if(e.mode){
          if(e.mode==='restricted') this.setState({extraComponent:'restricted'})
          else this.setState({extraComponent:null})
        }
      })
    }
  }

  select = (o) => {
    if(o==='restricted'){ // needs more to be selected
      this.setState({extraComponent:o})
    } else {
      this.props.onSelect(o)
      this.close()
      if(!this.props.listen){
        this.setState({extraInputText:''})
      }
    }
  }

  ok = (o,sideKey) => {
    this.props.onSelect(o,sideKey)
    this.close()
  }

  toggle = () => {
    const {open,locked} = this.state
    if(locked) return
    if(open){
      this.close()
    } else {
      this.open()
    }
    if(this.props.mode!=='restricted'){
      this.setState({extraComponent:false})
    }
  }

  open = () => {
    this.setState({mounted:true,locked:true})
    setTimeout(()=>this.setState({open:true,locked:false}),15)
  }

  close = () => {
    this.setState({open:false,locked:true})
    setTimeout(()=>this.setState({mounted:false,locked:false}),165)
  }

  componentWillMount(){
    if(this.props.sideKey){
      this.setState({
        extraInputText:this.props.sideKey,
        extraComponent:'restricted'
      })
    }
  }

  render(){
    const {open, mounted, extraComponent} = this.state
    const {options, active, size, style, mode, background, noBorder, selected} = this.props
    let menuWrapHeight = options.length*35 + 2
    if(extraComponent && open){
      menuWrapHeight += 50
    }
    if (typeof window !== 'undefined'){
      return (<Select>
        <Button {...this.props}
          onClick={this.toggle}>
          {!active ? <Content>
            {mode.charAt(0).toUpperCase() + mode.substr(1)}
            <DropDownArrow active={open} noBorder={noBorder}/>
          </Content> :
          <Spinner src={loader} size={size} />}
        </Button>
        {options && mounted && <MenuWrap height={menuWrapHeight} width={style.width}>
          <Menu height={menuWrapHeight} open={open} background={background} noBorder={noBorder}>
            {options.map((o,i)=>{
              const extra = extraComponent===o && open
              const active = (mode===o && !extraComponent) || extra
              const ExtraComponent = extraComponents['sideKeyInput'] || <span />
              return <MenuItem key={i} onClick={()=>this.select(o)}
                height={35 + (extra ? 50 : 0)} active={active} index={i}> 
                <div style={{width:'100%'}}>
                  <MenuItemName>
                    {noBorder ? <span>{o}</span> :
                      <span>{o.charAt(0).toUpperCase()+o.substr(1)}</span>
                    }
                    {selected===o && <Dot />}
                  </MenuItemName>
                  {extra &&
                    <ExtraComponent
                      onChange={(e)=>this.setState({
                        extraInputText:e.target.value
                      })}
                      sideKey={this.state.extraInputText}
                      ok={()=>this.ok(o, this.state.extraInputText)}
                    /> 
                  }
                </div>
              </MenuItem>
            })}
          </Menu>
        </MenuWrap>}
      </Select>)
    } else return <span />
  }
}
const Dot = () => (<svg viewBox="0 0 100 100" 
  style={{fill:'white',height:7,width:7,marginRight:10}}>
  <circle cx="50" cy="50" r="50"/>
</svg>)
const Select = styled.div`
  display:flex;
  flex-direction:column;
`
const Spinner = styled.img`
  height: ${p=> p.size==='tiny' ? '4px' : '7px'};
`
const Content = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  padding-left:6px;
`
const Button = styled.div`
  background:${p => p.noBorder?'transparent':'rgba(0,0,0,0.1)'};
  pointer-events: ${p=> p.disabled || p.active ? 'none' : 'auto'};
  color: ${p=> p.disabled ? 'grey' : 'white'};
  border: 1px solid ${p=> p.noBorder?'transparent': p.disabled && !p.active ? 'grey' : 'white'};
  width:${p=> (p.style && p.style.width) + 'px' || 'auto'};
  margin: ${p=> (p.margin && p.style.margin) || '7px 0 4px 0'};
  display:flex;
  align-items:center;
  flex:1;
  padding:${p => (p.style && p.style.padding) || 'none'};
  justify-content:${p => (p.style && p.style.justifyContent) || 'center'};
  max-height: ${p=> p.size==='tiny' ? '16' : '32'}px;
  min-height: ${p=> p.size==='tiny' ? '16' : '32'}px;
  transition: all .15s ease-in-out;
  cursor: ${p=> p.disabled || p.active ? 'default' : 'pointer'};
  touch-action: manipulation;
  white-space: nowrap;
  user-select: none;
  -webkit-user-select: none;
  font-size: ${p=> p.size==='tiny' ? '9' : '16'}px;
  letter-spacing: .03em;
  overflow: hidden;
  &:hover{
    background:${p=> p.active ? 'transparent' : 'teal'};
  }
`
const MenuWrap = styled.div`
  overflow:hidden;
  height: ${p=> p.height}px;
  width:${p=> (p.width + 2 + 'px') || 'auto'};
`
const Menu = styled.div`
  background:${p=> p.background || 'rgba(0,0,0,0.1)'};
  border:1px solid white;
  transition: transform 0.07s;
  transform: translateY(${p => p.open ? 0: p.height*-1}px);
  height: ${p=> p.height - 2}px;
`
const MenuItem = styled.div`
  cursor:pointer;
  height: ${p=> p.height}px;
  display:flex;
  align-items:center;
  background:${p=> p.active ? 'teal' : 'transparent'};
  &:hover{
    background:teal;
  }
  
`
const MenuItemName = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding-left:14px;
  height:35px;
`
const DropDownArrow = ({active,noBorder}) => {
  return <svg fill="#FFFFFF" height="24" viewBox="0 0 24 24" width="24"
    style={{marginLeft:4,marginTop:2,marginRight:noBorder?12:0}}>
    <g style={{transform:`rotate(${active?'180':'0'}deg)`,transformOrigin:'center'}}>
      <path d="M7 10l5 5 5-5z"/>
      <path d="M0 0h24v24H0z" fill="none"/>
    </g>
  </svg>
}

const extraComponents = {
  sideKeyInput: ({sideKey,onChange,ok}) => {
    return (<div style={{background:'rgba(0,0,0,0.5)',
      height:49,width:'100%'}}>
      <div style={{marginLeft:14,display:'flex'}}>
        <div style={{marginTop:2}}>
          <Input type="text" label="Sidekey" value={sideKey} onChange={onChange} 
            width="115px" size="small" />
        </div>
        <Button active={false} disabled={!sideKey}
          style={{width:'20px',margin:'8px 7px 0px 6px'}}
          onClick={ok}
        >OK</Button>
      </div>
    </div>
  )}
}

export default S