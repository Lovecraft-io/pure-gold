import React, { Component } from 'react'
import Vimeo from 'react-vimeo'


import '../css/Portfolio.css'


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
				bg_image =  video.pictures.sizes[5].link
				let bg_style = {
					backgroundImage: `url(${bg_image})`
				}
				return (
						<div className="video__section">
							<img src={bg_image} alt="" className="video__section_bg" />
							<div className="video__wrap active">
								<div className="video__wrap_inner">
									<div className="video__player" dangerouslySetInnerHTML={{__html: video.embed.html}}/>
									<span className="number">01</span>
									<span className="date">30 MARCH 2017 <span className="date__time">12:37PM</span></span>
									<div className="content">
									
										<div className="content__slide">
											<h2 className="title"> <span className="title__line"> <span className="title__inner">Breathtaking</span></span><span className="title__line"> <span className="title__inner">Heights</span></span></h2>
											<p className="desc">Nunc orci metus, ornare non molestie ac, ultrices eget  <br/> dolor. Mauris ac mattis lectus. Praesent facilisis  <br/> malesuada sapien nec pharetra. Fusce eleifend, nisl.</p>
											<div className="button-wrap"><a className="button">Learn More<span className="button__hover"></span></a></div>
										</div>
										<div className="content__ping content__ping--noanimation"></div>
									</div>
								</div>
							</div>
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