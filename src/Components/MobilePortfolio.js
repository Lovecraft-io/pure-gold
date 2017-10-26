import React, { Component } from 'react'
import '../css/Portfolio.css'
import SwipeableViews from 'react-swipeable-views';



export default class MobilePortfolio extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }
  componentDidMount() {


  }
  render() {
    // const incrementIndex = (index) => {zIndex: (index + 1)}
    // style={incrementIndex(index)}
    return (

      <div id="MobilePortfolio">
        <SwipeableViews>
          {this.props.videos.map((video, index) => {
            let poster
            if (video.pictures) {
              poster = video.pictures.sizes[4].link
              let bg_style = {
                backgroundImage: `url(${poster})`
              }
            }

            return (
              <div className="slide" key={index} >
                <div className="mobile__video__player" dangerouslySetInnerHTML={{__html: video.embed.html}}/>
              </div>
            )
          })}
        </SwipeableViews>
      </div>
    )
  }

}