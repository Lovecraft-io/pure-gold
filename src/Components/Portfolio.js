import React, { Component } from 'react'
// import imagesLoaded from 'react-images-loaded'
// import anime from 'animejs'
// import scrollMonitor from 'scrollmonitor'
import Vimeo from 'react-vimeo'


import '../css/Portfolio.css'

{/* <div className="grid grid--layout-3">
					{videos}
					<h2 className="grid__item grid__item--name" >The<br /> Latest <br />2017</h2>
					<h3 className="grid__item grid__item--title">Mpls</h3>
					<p className="grid__item grid__item--text">Immortalizing little slices of reality</p>
						
				</div> */}



export default class Portfolio extends Component {
	constructor(props) {
		super(props)

		this.state = {
			videos: []
		}


	}


	render() {
		const portfolio_styles = {
			paddingTop: '100px',
			// position: 'relative'
		}
		const bg_style = {
			background: 'transparent'
		}
		const icon_style = {
			height: '20px',
			width: '20px',
			display: 'block',
			margin: 'auto'
		}
		const mobile_videos = this.props.videos.slice(0, 4)
		const videos = this.props.videos.map(video => {
			let bg_image
			if (video.pictures){
				bg_image =  video.pictures.sizes[2].link
				return (
						<div className="video__section">
							<div className="video__player" dangerouslySetInnerHTML={{__html: video.embed.html}} />
						</div>
					)
			}
		})
		

		return (
			<div id="Portfolio">
				{videos}
			</div>
		)
	}


}

