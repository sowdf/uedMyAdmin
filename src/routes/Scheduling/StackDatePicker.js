class StackDatePicker{
  isLeapYear(year){
    if(year%4==0 && year%100!=0){
      return true;
    }
    else{
      if(year%400==0){
        return true;
      }
      else{
        return false;
      }
    }
  }
  monthDayNum(year,month){
    let dayNum = 30;
    if(month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12){
      dayNum = 31;
    }
    else if(month==4 || month==6 || month==9 || month==11){
      dayNum = 30;
    }
    else if(month==2 && this.isLeapYear(year)){
      dayNum = 29;
    }
    else{
      dayNum = 28;
    }
    return dayNum;
  }
  getWeekDay(year,month,day){ //dayValue=“2014-01-01”
    let dateStr = `${year}/${month}/${day}`;
    let date = new Date(Date.parse(dateStr)); //将日期值格式化
    let today = new Array("日","一","二","三","四","五","六"); //创建星期数组
    return today[date.getDay()];  //返一个星期中的某一天，其中0为星期日
  }
  getMonthAry(year,month){
    let monthAry = [];
    let dayNum = this.monthDayNum(year,month);
    for(let i = 0; i < dayNum; i++){
      let dayData = {year,month};
      let day = i + 1;
      dayData.day = day;
      dayData.ActiveAry = [];
      dayData.weekDay = this.getWeekDay(year,month,day);
      dayData.workingDays =  (dayData.weekDay == '六' || dayData.weekDay == '日') ?  false : true; //加标识如果是工作日就是true 不是就是false
      if( dayData.workingDays){ //如果是工资日就进入数组
        dayData.dayText = `${year}-${month}-${day}`;
        dayData.dayTimestamp = new Date(dayData.dayText).getTime();
        monthAry.push(dayData);
      }
    }
    return monthAry;
  }
  stackActiveList(dateAry,data){
    let {startTime,endTime,frontEnd,design,test,serverSide,operating} = data;
    let activeAry = [];
    dateAry.map((item,index)=>{
      let dayData = {year : startTime.year,month:startTime.month};
      let day = item.day;
      dayData.day = item.day;
      dayData.weekDay = item.weekDay;
      dayData.workingDays =  item.workingDays; //加标识如果是工作日就是true 不是就是false
      if(startTime.day <= day && day <= endTime.day){
        if(startTime.month != item.month){
          dayData.timeStatus = 0;
        }else{
          dayData.timeStatus = 1;
          if(operating.start <= day && day <= operating.end){
            dayData.timeStatus = 2;
          }
          if(design.start <= day && day <= design.end){
            dayData.timeStatus = 3;
          }
          if(frontEnd.start <= day && day <= frontEnd.end){
            dayData.timeStatus = 4;
          }
          if(serverSide.start <= day && day <= serverSide.end){
            dayData.timeStatus = 5;
          }
          if(test.start <= day && day <= test.end){
            dayData.timeStatus = 6;
          }
        }
      }else{
        dayData.timeStatus = 0;
      }
      activeAry.push(dayData);
    });
    /*      if(startTime.month == endTime.month){//[10,29]表示是活动时间
              let dayNum = this.monthDayNum(startTime.year,startTime.month);
                  for(let i = 0; i < dayNum; i++){
                      let dayData = {year : startTime.year,month:startTime.month};
                      let day = i + 1;
                      dayData.day = day;
                      dayData.weekDay = this.getWeekDay(startTime.year,startTime.month,day);
                      dayData.workingDays =  (dayData.weekDay == '六' || dayData.weekDay == '日') ?  false : true; //加标识如果是工作日就是true 不是就是false
                      //是否是活动时间
                      /!*
                      * 1:活动时间
                      * 2:运营时间
                      * 3:设计时间
                      * 4:前端时间
                      * 5:服务端时间
                      * *!/
                      if(startTime.day <= day && day <= endTime.day){
                          dayData.timeStatus = 1;
                          if(operating.start <= day && day <= operating.end){
                              dayData.timeStatus = 2;
                          }
                          if(design.start <= day && day <= design.end){
                              dayData.timeStatus = 3;
                          }
                          if(frontEnd.start <= day && day <= frontEnd.end){
                              dayData.timeStatus = 4;
                          }
                          if(serverSide.start <= day && day <= serverSide.end){
                              dayData.timeStatus = 5;
                          }
                          if(test.start <= day && day <= test.end){
                              dayData.timeStatus = 6;
                          }
                      }else{
                          dayData.timeStatus = 0;
                      }
                  activeAry.push(dayData);
              }
          }*/
    return activeAry;
  }
}

export default StackDatePicker;
