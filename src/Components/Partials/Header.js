import React, { Component } from 'react'


export default class Header extends Component {
    constructor(props) {
        super(props)

    }

    render() {

        const social_nav_style = {
            display: 'inline',
            listStyleType: 'none'
        }
        const icon_style = {
            height: '15px',
            width: '15px'
        }

        return (
            <div>
                <svg className="hidden">
                    <symbol id="icon-arrow" viewBox="0 0 24 24">
                        <title>arrow</title>
                        <polygon points="6.3,12.8 20.9,12.8 20.9,11.2 6.3,11.2 10.2,7.2 9,6 3.1,12 9,18 10.2,16.8 " />
                    </symbol>
                 
                    <symbol id="icon-github" viewBox="0 0 32.6 31.8">
                        <title>github</title>
                        <path d="M16.3,0C7.3,0,0,7.3,0,16.3c0,7.2,4.7,13.3,11.1,15.5c0.8,0.1,1.1-0.4,1.1-0.8c0-0.4,0-1.4,0-2.8c-4.5,1-5.5-2.2-5.5-2.2c-0.7-1.9-1.8-2.4-1.8-2.4c-1.5-1,0.1-1,0.1-1c1.6,0.1,2.5,1.7,2.5,1.7c1.5,2.5,3.8,1.8,4.7,1.4c0.1-1.1,0.6-1.8,1-2.2c-3.6-0.4-7.4-1.8-7.4-8.1c0-1.8,0.6-3.2,1.7-4.4C7.4,10.7,6.8,9,7.7,6.8c0,0,1.4-0.4,4.5,1.7c1.3-0.4,2.7-0.5,4.1-0.5c1.4,0,2.8,0.2,4.1,0.5c3.1-2.1,4.5-1.7,4.5-1.7c0.9,2.2,0.3,3.9,0.2,4.3c1,1.1,1.7,2.6,1.7,4.4c0,6.3-3.8,7.6-7.4,8c0.6,0.5,1.1,1.5,1.1,3c0,2.2,0,3.9,0,4.5c0,0.4,0.3,0.9,1.1,0.8c6.5-2.2,11.1-8.3,11.1-15.5C32.6,7.3,25.3,0,16.3,0z" />
                    </symbol>
                </svg>
                <header className="codrops-header">
                    <div className="site-links">
                        <h1 className="codrops-header__title">JUD NICHOLS</h1>
                        <span className="social_nav"></span>
                            <div id="social_elements">
                                <a href><img className="a" src="img/icons/home.svg" alt="" style={icon_style} /></a>
                                <a href><img className="b" src="img/icons/facebook-circle.svg" alt="" style={icon_style} /></a>
                                <a href><img className="c" src="img/icons/instagram-circle.svg" alt="" style={icon_style} /></a>
                                <a href><img className="d" src="img/icons/vimeo-circle.svg" alt="" style={icon_style} /></a>
                            </div>
                    </div>
                        
                    
                    
                    
                </header >  
            </div>

        )
    }
}