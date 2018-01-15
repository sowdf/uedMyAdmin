import React from 'react';

export default class Td extends React.PureComponent {
  constructor(props){
      super(props);
      this.onMouseEnterHandle = this.onMouseEnterHandle.bind(this);
      this.onClickHandle = this.onClickHandle.bind(this);
  }
  onMouseEnterHandle(){
    let {setDate,date,isDraw,activeIndex,currentMemberIndex} = this.props;
    if(!isDraw){
      return false;
    }
    setDate(activeIndex,currentMemberIndex,date.dayTimestamp);
  }
  onClickHandle(){
    let {setDate,date,isClear,clearItem,activeIndex,memberIndex,isDraw,currentMemberIndex} = this.props;
    if(memberIndex == -1){//表示使用清除功能
      setDate(activeIndex,currentMemberIndex,date.dayTimestamp);
      return false;
    }else{ //表示上面欧东西  则需要 先清除
      clearItem(activeIndex,memberIndex,date.dayTimestamp);
      setDate(activeIndex,currentMemberIndex,date.dayTimestamp);
    }
  }
  render() {
    let {styleName,memberName} = this.props;
    return (
      <td onClick={this.onClickHandle}
          className={styleName}>{memberName}</td>
    )
  }
}
