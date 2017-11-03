import React, { Component } from 'react'
import '../css/Portfolio.css'
import MobilePortfolio from './MobilePortfolio'
import Loading from './Partials/Loading'
import { ParallaxProvider, Parallax } from 'react-scroll-parallax'
import PropTypes from 'prop-types'


const Vimeo = require('vimeo').Vimeo;
const clientID = 'a403a67f112f44d9826223d299688cffcdc4c794'
const clientSecret = '4ddwI9d7nHrcRcPlM5UE4YyNTZ9yjCCthnz+9CwY4Hdg5JkaYrOWRu24kgmnq6qmkDXNZ2EejDZ6ZmgmGM6pmMX+m02NeAPx4fty7Dc5rMCwIT1iZ/+T5Goz0xx4aoFV'
const accessToken = '827ba89c1ca4647189da72d793d669b5'

const isPublic = (video) => video.privacy.view != 'nobody' && video.privacy.view != 'password'

export default class Portfolio extends Component {
	constructor(props) {
		super(props)

		this.state = {
			videos: [],
			isMobile: false,
			isLoaded: false
		}
		
		
	}
	static contextTypes = {
        parallaxController: PropTypes.object.isRequired,
	}
	
	mobileCheck() {
		let check = false;
		(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
		
		if(check){
			console.log(check)
			this.setState({isMobile: true})
			console.log(this.state.isMobile)
		}
	  }
	componentWillMount(){
		this.mobileCheck()

	
		if (localStorage.getItem('videos')){
			let videos = JSON.parse(localStorage.getItem('videos'))
			videos = videos.filter(video => isPublic(video))
			console.log(videos)
			this.setState({ videos: videos, isLoaded: true })
	  
		  } else {
			const lib = new Vimeo(clientID, clientSecret, accessToken);
			let videos = [];
			
			lib.request({
				path: '/me/videos'
			}, (err, body, status_code, headers) => {
				console.log(body)
				if (!err) {
					videos = body.data.filter((video) => isPublic(video))
					localStorage.setItem('videos', JSON.stringify(videos))
					this.setState({ videos: videos, isLoaded: true })
				} else {
					console.log(err);
				}
		
			})
		  }
	}
	componentDidMount(){
		console.log(this.props)
		console.log(this.state)
	}


	render() {
		// <img src={bg_image} alt="" className="video__section_bg" />
		const portfolio_styles = {
			paddingTop: '100px',
			// position: 'relative'
		}
		// const bg_style = {
		// 	background: 'transparent'
		// }
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
			let bg_style
			let video_date = `${day}/${month}/${year}`
			if (video.pictures){
				bg_image =  video.pictures.sizes[5].link
				bg_style = {
					backgroundImage: `url(${bg_image})`
				}
				return (
						<div className="video__section" style={bg_style}>
							<div className="video__wrap active">
								<div className="video__wrap_inner">
									<div className="video__player" dangerouslySetInnerHTML={{__html: video.embed.html}}/>
									<span className="number">{video.stats.plays} Plays</span>
									<span className="date">{video_date}<span className="date__time"></span></span>
								</div>
							</div>
						</div>
					)
			}
		})
		if(this.state.isLoaded) {
			if (this.state.isMobile) {
				return (
					<MobilePortfolio videos={this.state.videos}/>
				)
				
			} else {
				return (
					<div id="Portfolio">
						 {videos}
					</div>
				)
			}
		} else {
			return (
				<Loading />
			)
		}
		
	}


}