import React from 'react'
import axios from 'axios'
import bannerImg from '../image/banner.jpg'

class NewsCom extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            datalist:[]
        }
    }

    async componentWillMount(){
      let res = await axios.get('http://localhost:8080/api/news')
      let data = JSON.parse(res.data.data[0].content)
      console.log(data.sub_raw_datas);
      this.setState({
          datalist:data.sub_raw_datas
      })
    }

    render(){
        return(
            <div className="contentItem new">
                 <div className="banner">
                     <img alt="banner" src={bannerImg}></img>
                     <h1>疫情追踪</h1>
                 </div>

                 <div className="newContent">
                     <div className="line"></div>
                     <div className="newsList">
                         {
                            this.state.datalist.map((item,index) => {
                                if(item.raw_data.event_image){
                                    return(
                                        <div className="newListItem" key={index}>
                                             <div className="time">{item.raw_data.event_image}</div>
                                             <div className="desc">{item.raw_data.desc}</div>
                                             <div className="img">
                                                 <img src={item.raw_data.event_image.url} alt="img"></img>
                                             </div>
                                        </div>
                                    )
                                }else{
                                    return(
                                        <div className="newListItem" key={index}>
                                             <div className="time">{item.raw_data.event_image}</div>
                                             <div className="desc">{item.raw_data.desc}</div>
                                        </div>
                                    )
                                }
                            })
                         }
                     </div>
                 </div>
            </div>
        )
    }
}

export default NewsCom;