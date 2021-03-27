import React from 'react';
import axios from 'axios'
import NewsCom from './newcom/newcom';
import MapCom from './newcom/mapcom';
import GzCom from './newcom/gzcom'
import './css/index.css'


function XcCom(props){
  return(
    <div className="contentItem">
      <h1>这是现场直击组件</h1>
    </div>
  )
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      newData: null,
      navList:['疫情地图','最新进展','广州疫情','直击现场'],
      tabIndex:0,
      barStyle:{
        left:'22px'
      },
      contentStyle:{
        transform:'translate(0,0)'
      }
    }
  }
  async componentWillMount(){
   let res = await axios.get('http://localhost:8080/api/newsdata')
   //console.log(res.data);
   let data = JSON.parse(res.data.forum.extra.ncov_string_list)
   console.log(data);
  }
  
  render(){
    return (
      <div className="App">
         <div className="nav">
               {
                 this.state.navList.map((item,index) => {
                    if(index === this.state.tabIndex){
                      return(
                        <div key={index} onClick={() => {this.tabClickEvent(index)}} className="navItem active">{item}</div>
                      )
                    }else{
                      return(
                        <div key={index} onClick={() => {this.tabClickEvent(index)}} className="navItem">{item}</div>
                      )
                    }
                 })
               }
          <div className="bar" style={this.state.barStyle}></div>
         </div>
         <div className="content" style={this.state.contentStyle}>
             <MapCom/>
             <NewsCom/>
             <GzCom/>
             <XcCom/>
         </div>
      </div>
    )
  }

  tabClickEvent = (index) =>{
      //console.log(index);
      this.setState({
        barStyle:{
          left:(index*88 + 22) + "px"
        },
        contentStyle:{
           transform:`translate(-${index*375}px,0)`
        }
      })     
  }
  
}

export default App;
