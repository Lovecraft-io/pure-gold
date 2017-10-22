import React, { Component } from 'react'
// import Vimeo from 'react-vimeo'
import '../css/Portfolio.css'
// import {Route, Link} from 'react-router-dom'
// import MobilePortfolio from './MobilePortfolio'
// <Route exact path='/mobile' component={MobilePortfolio} videos={this.state.videos}/>
// 				<Link to='/mobile'>MObile</Link>

const Vimeo = require('vimeo').Vimeo;
const clientID = 'a403a67f112f44d9826223d299688cffcdc4c794'
const clientSecret = '4ddwI9d7nHrcRcPlM5UE4YyNTZ9yjCCthnz+9CwY4Hdg5JkaYrOWRu24kgmnq6qmkDXNZ2EejDZ6ZmgmGM6pmMX+m02NeAPx4fty7Dc5rMCwIT1iZ/+T5Goz0xx4aoFV'
const accessToken = '827ba89c1ca4647189da72d793d669b5'
const isPublic = (video) => video.privacy.view != 'nobody' && video.privacy.view != 'password'





export default class Portfolio extends Component {
	constructor(props) {
		super(props)

		this.state = {
			videos: []
		}


	}
	componentWillMount(){
		if (localStorage.getItem('videos')){
			let videos = JSON.parse(localStorage.getItem('videos'))
			videos = videos.filter(video => isPublic(video))
			console.log(videos)
			this.setState({ videos: videos })
	  
		  } else {
			const lib = new Vimeo(clientID, clientSecret, accessToken);
			let videos = [];
			
			lib.request({
				path: '/me/videos'
			}, (err, body, status_code, headers) => {
				if (!err) {
					videos = body.data.filter((video) => isPublic(video))
					localStorage.setItem('videos', JSON.stringify(videos))
					console.log(localStorage.getItem('videos'))
					this.setState({ videos: videos })
				} else {
					console.log(err);
				}
		
			})
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
		
		const videos = this.state.videos.map(video => {
			let bg_image
			let date = new Date(video.release_time)
			let day = date.getDay()
			let month = date.getMonth()
			let year = date.getFullYear()
			let video_date = `${day}/${month}/${year}`
			if (video.pictures){
				bg_image =  video.pictures.sizes[5].link
				let bg_style = {
					backgroundImage: `url(${bg_image})`
				}
				return (
						<div className="video__section">
							<img src={bg_image} alt="" className="video__section_bg" />
							<div className="video__wrap active">
								<div className="content__slide">
									<h2 className="title"> <span className="title__line"> <span className="title__inner"></span></span><span className="title__line"> <span className="title__inner">{video.name}</span></span></h2>
									<p className="desc">{video.description}</p>
											
								</div>
								<div className="content__ping content__ping--noanimation"></div>
								<div className="video__wrap_inner">
									<div className="video__player" dangerouslySetInnerHTML={{__html: video.embed.html}}/>
									<span className="number">{video.stats.plays}</span>
									<span className="date">{video_date}<span className="date__time"></span></span>
									
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