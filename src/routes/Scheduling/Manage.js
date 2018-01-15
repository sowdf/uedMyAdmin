import React from 'react';
import {Popover, Button, Modal, Form, Select} from 'antd';
import StackDatePicker from './StackDatePicker';
import memberData from './data';
import Td from './Td';

import Style from './Style.less';


export default class Manage extends React.PureComponent {
  constructor(props) {
    super();
    this.lastBtnIndex = 0; //几个按钮的上一次索引
    this.selectMemberActiveIndex = 0; //选择员时的活动索引
    let date = new Date();
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    this.stackDatePicker = new StackDatePicker();
    this.nextMonth = this.stackDatePicker.getMonthAry(this.year, this.month + 1);
    this.nowMonth = this.stackDatePicker.getMonthAry(this.year, this.month);
    this.allMonthDayDate = this.nowMonth.concat(this.nextMonth);
    this.drawOnOff = this.drawOnOff.bind(this);
    this.clearItem = this.clearItem.bind(this);
    this.setDate = this.setDate.bind(this);
    this.selectChangeHandle = this.selectChangeHandle.bind(this);
    this.state = {
      isClear: false,
      currentMemberIndex: 0,
      isDraw: false,
      index: 1,
      dateAry: this.getAllMonthDayDate(this.year,this.month),
      memberList: [
        {
          key: 'operating',
          position: '运营',
          status: 'active',
        },
        {
          key: 'design',
          position: '设计',
          status: '',
        },
        {
          key: 'web',
          position: '前端',
          status: '',
        },
        {
          key: 'server',
          position: '服务端',
          status: '',
        },
        {
          key: 'test',
          position: '测试',
          status: '',
        }
      ],
      activeAry: [
        {
          name: '大保健',
          activeStartTimeTimestampText: 1514908800000,
          activeEndTimeTimestampText: 1517328000000,
          activeStartTime: {
            year: 2018,
            month: 1,
            day: 3
          },
          activeEndTime: {
            year: 2018,
            month: 1,
            day: 22
          },
          timeAry: [],
          memberAry: [
            {
              key: 'operating',
              position: '运营',
              name: '张艳',
              days: '',
              dateAry: [],
              startTimestamp: '1515340800000',
              endTimestamp: '1515945600000',
            },
            {
              key: 'design',
              position: '设计',
              name: '晓婕',
              days: '',
              dateAry: [],
              startTimestamp: '1516550400000',
              endTimestamp: '1516636800000',
            },
            {
              key: 'web',
              position: '前端',
              name: '淑瑶',
              days: '',
              dateAry: [],
              startTimestamp: '1516723200000',
              endTimestamp: '1516809600000',
            },
            {
              key: 'server',
              position: '服务端',
              name: '曾辉',
              days: '',
              dateAry: [],
              startTimestamp: '1516896000000',
              endTimestamp: '1517155200000',
            },
            {
              key: 'test',
              position: '测试',
              days: '',
              name: '慧芳',
              dateAry: [],
              startTimestamp: '1517241600000',
              endTimestamp: '1517328000000',
            }]
        },
        {
          name: '大淘宝',
          activeStartTimeTimestampText: 1514908800000,
          activeEndTimeTimestampText: 1517328000000,
          activeStartTime: {
            year: 2018,
            month: 1,
            day: 3
          },
          activeEndTime: {
            year: 2018,
            month: 1,
            day: 22
          },
          timeAry: [],
          memberAry: [
            {
              key: 'operating',
              position: '运营',
              name: '张丹',
              days: '',
              dateAry: [],
              startTimestamp: '1515340800000',
              endTimestamp: '1515945600000',
            },
            {
              key: 'design',
              position: '设计',
              name: '晓婕',
              days: '',
              dateAry: [],
              startTimestamp: '1516550400000',
              endTimestamp: '1516636800000',
            },
            {
              key: 'web',
              position: '前端',
              name: '淑瑶',
              days: '',
              dateAry: [],
              startTimestamp: '1516723200000',
              endTimestamp: '1516809600000',
            },
            {
              key: 'server',
              position: '服务端',
              name: '曾辉',
              days: '',
              dateAry: [],
              startTimestamp: '1516896000000',
              endTimestamp: '1517155200000',
            },
            {
              key: 'test',
              position: '测试',
              days: '',
              name: '慧芳',
              dateAry: [],
              startTimestamp: '1517241600000',
              endTimestamp: '1517328000000',
            }]
        }
      ]
    };

    this.stackDataFuse = this.stackDataFuse.bind(this);
  }

  getAllMonthDayDate(year,month){ // 获取当前月和下一月的日期
    let nextMonth = this.stackDatePicker.getMonthAry(year, month + 1);
    let nowMonth = this.stackDatePicker.getMonthAry(year, month);
    return nowMonth.concat(nextMonth);
  }

  clearItem(activeIndex, memberIndex, timestamp) {
    let newData = this.state.activeAry;
    if (memberIndex == -1) {
      return false;
    }
    let ary = newData[activeIndex].memberAry[memberIndex].dateAry;
    let index = ary.indexOf(timestamp);
    if (index != -1) {
      ary.splice(index, 1);
      console.log(ary);
      this.setState({
        index: timestamp,
        activeAry: newData
      });
    } else { //您清除的活动不存在

    }

  }

  drawOnOff() { //设置
    let isDraw = this.state.isDraw;
    this.setState({
      isDraw: !isDraw
    });
  }

  setDate(activeIndex, memberIndex, timestamp) {
    let newData = this.state.activeAry;
    newData[activeIndex].memberAry[memberIndex].dateAry.push(timestamp);
    this.setState({
      timestamp: timestamp,
      activeAry: newData
    });
  }

  stackDataFuse() {//数据融合
    let {activeAry, dateAry} = this.state;
    /*  activeList.map((item,index)=>{
        let newDate = this.stackDatePicker.stackActiveList(this.allMonthDayDate,item);
        activeAry.push(newDate);
      });*/
    this.setState({
      activeAry
    });
  }

  componentDidMount() {
    //this.stackDataFuse();
  }

  onMouseEnterHandle(e) {
    //console.log(e);
  }

  state = {visible: false};
  showModal = (activeIndex) => {
    this.selectMemberActiveIndex = activeIndex;
    this.setState({
      visible: true,
    });
  };
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  setMember(index) {
    let newData = this.state.memberList.slice();
    newData[this.lastBtnIndex].status = '';
    newData[index].status = 'active';
    this.lastBtnIndex = index;
    console.log(index);
    console.log(newData);
    //激活状态切换
    this.setState({
      memberList: newData,
      currentMemberIndex: index
    });
  }

  allClear() { //全部清除
    let {memberList} = this.state;
    memberList.memberAry.map((item, index) => {
      item.dateAry = [];
      return item;
    });
    this.setState({
      timestamp: 1,
      memberList: memberList
    });
  }

  setClearOnOff() {
    let onOff = this.state.isClear;
    this.setState({
      isClear: !onOff
    });
  }

  selectChangeHandle(value, selectMemberActiveIndex, index) {
    console.log(1111);
    let newData = this.state.activeAry;
    newData[selectMemberActiveIndex].memberAry[index].name = value;
    this.setState({
      index: new Date().getTime(),
      activeAry: newData
    });
  }

  render() {
    let {dateAry, activeAry, isClear, isDraw, memberList, currentMemberIndex} = this.state;

    return (
      <div className={Style.m_scheduling}>
        <Button type="primary" >{this.month - 2 == 0 ? 12 : this.month - 2}月</Button>
        <Button type="primary" >{this.month + 2 }月</Button>
        <Modal
          title="人员设置"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {
            memberData.map((item, index) => {
              //选择人员 数据中的人员
              let defaultMember = activeAry[this.selectMemberActiveIndex].memberAry[index].name;
              return <div key={index} style={{marginBottom: '15px'}}>
                <span>{item.placeholder}:</span>
                <Select
                  onChange={(value) => {
                    console.log(11111);
                    this.selectChangeHandle(value, this.selectMemberActiveIndex, index)
                  }}
                  defaultValue={defaultMember}
                  style={{width: 120}}>
                  {
                    item.member.map((subItem, subIndex) => {
                      return <Select.Option key={subIndex} value={subItem}>{subItem}</Select.Option>
                    })
                  }
                </Select>
              </div>

            })
          }


        </Modal>
        <div className={Style.m_handle}>
          {
            memberList.map((item, index) => {
              return <Button className={item.status == 'active' ? Style[`u_${item.key}Time`] : ''} key={index}
                             type="primary" onClick={this.setMember.bind(this, index)}>
                {item.position}
              </Button>
            })
          }
        </div>

        <table className="m_date_picker">
          <thead>
          <tr>
            <th>活动名称\日期\星期</th>
            {
              dateAry.map((item, index) => {
                return <th key={index}>{item.month}-{item.day}</th>
              })
            }
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>
              星期：
            </td>
            {
              dateAry.map((item, index) => {
                return <td key={index}>{item.weekDay}</td>
              })
            }
          </tr>
          {
            activeAry.map((active, activeIndex) => {
              let {name, memberAry, activeStartTimeTimestampText, activeEndTimeTimestampText} = active;
              return <tr key={activeIndex}>
                <td>{active.name} <Button onClick={this.showModal.bind(this, activeIndex)} type="primary"
                                          style={{width: '40px', height: '20px', padding: 0,}}>
                  设置
                </Button></td>
                {
                  dateAry.map((item, dateIndex) => {
                    //判断是否是活动时间
                    active.dateData = item;
                    let dayClassName = [];
                    if (activeStartTimeTimestampText <= item.dayTimestamp && item.dayTimestamp <= activeEndTimeTimestampText) {
                      dayClassName.push(Style.u_activeTime); // 添加class 标识活动时间
                    }
                    let memberIndex = -1; //如果没有的情况是-1 清除 的时候可以判断呢
                    let memberName = '';
                    //判读个端人员的时间
                    memberAry.map((member, i) => {
                      if (member.dateAry.indexOf(item.dayTimestamp) != -1) {
                        let u_style = Style[`u_${member.key}Time`];
                        memberIndex = i; //知道是谁
                        memberName = member.name;// 获取人员名字
                        dayClassName.push(u_style); // 添加class 标识活动时间  ["u_activeTime___353_7", "u_operatingTime___3gI0K"]
                      }
                    });
                    let styleName = dayClassName.join(' ');
                    return <Td
                      currentMemberIndex={currentMemberIndex} //点击人员设置之后使用
                      drawOnOff={this.drawOnOff}
                      setDate={this.setDate}
                      isDraw={isDraw}
                      isClear={isClear}
                      date={item}
                      styleName={styleName}
                      activeIndex={activeIndex} //告诉他是哪个活动
                      memberIndex={memberIndex} // 人员在哪里
                      dateIndex={dateIndex}
                      key={dateIndex}
                      memberName={memberName}
                      clearItem={this.clearItem} //清除功能
                    />

                  })
                }
              </tr>
            })
          }
          </tbody>

        </table>
      </div>
    )
  }
}
