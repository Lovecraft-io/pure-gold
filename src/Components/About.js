import React, {Component} from 'react'
import '../css/About.css'
import anime from 'animejs'




 


export default class About extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tabs: [],
            isAnimating: false
        }
    }

   
    componentDidMount(){ 
      


    
      }
      show(e) {
        let nav_item = e.target
        let title = nav_item.querySelector('.tabsnav__title')
        let bar = nav_item.querySelector('.tabsnav__bar')
        let tabs = document.querySelectorAll('.tabscontent__item')
        let target_div = document.querySelector(`#${nav_item.getAttribute('value')}`)
        const bounds = bar.getBoundingClientRect()
        console.log(bounds)
        const currentDimensions = {
          left: bounds.left,
          top: bounds.top,
          width: bounds.width,
          height: bounds.height
        }
        console.log(currentDimensions)
        const dim = {
            measure: currentDimensions.width,
            position: currentDimensions.left,
            win: window.innerWidth 
          }
          console.log(dim)

        let scale_length = ((dim.win/dim.measure) * 1.998)
        console.log(scale_length)
        bar.style.transformOrigin = '50% 50%'
        bar.style.transform = `scaleX(${scale_length})`
        nav_item.style.transform = 'translateX(0), rotate(-90)'
        target_div.style.opacity = 1
        title.style.opacity = 0

        
     
      }
 
    render() {    
        return (
            <div id="About" className="About">
            

                    
                <main className="view">
                    <div className="content">
                        <div className="deco">
                            <p className="deco__text">To immortalize the deepest realities of <span>The Story</span></p>
                        </div>

                        <header className="about-header">
                            <p className="about-header__info">The straight up<br/>freshest vids<br/>I got</p>
                            <span className="about-header__deco">hitherto</span>
                            <h1 className="about-header__title">unseen</h1>
                            <p className="about-header__tagline">peep the show</p>

                        </header>
                    </div>

                    <button className="btn btn--menu">
                        <svg className="icon icon--menu"></svg>
                        <svg className="icon icon--cross"></svg>
                    </button>

                    <nav className="tabsnav tabsnav--vertical tabsnav--ander">
                        <div className="tabsnav__item" value="shooting" onClick={this.show.bind(this)}>
                            <div className="tabsnav__bar"></div>
                            <h3 className="tabsnav__title">Shooting</h3>
                        </div>
                        <div className="tabsnav__item" value="editing" onClick={this.show.bind(this)}>
                            <div className="tabsnav__bar"></div>
                            <h3 className="tabsnav__title">Editing</h3>
                        </div>
                        <div className="tabsnav__item" value="production" onClick={this.show.bind(this)}>
                            <div className="tabsnav__bar"></div>
                            <h3 className="tabsnav__title">Production</h3>
                        </div>

                    </nav>
                    <div className="tabscontent">
                        <div className="tabscontent__item" id="shooting">
                            <figure className="poster">
                                    <img className="poster__img" src="img/mpls.jpg" />
                                    <figcaption className="poster__caption">
                                        <h2 className="poster__title">Cinema<br/>style</h2>
                                        <p className="poster__deco">professional video equipment</p>
                                        <div className="poster__box"></div>
                                        <span className="poster__number">unparalleled</span>
                                    </figcaption>
                            </figure>
                        </div>
                        <div className="tabscontent__item" id="editing">
                            <figure className="poster">
                                <img className="poster__img" src="img/streetlight.jpg" />

                                <figcaption className="poster__caption editing">

                                    <h2 className="poster__title">color<br/>grading</h2>
                                    <p className="poster__deco">professional software and effects</p>
                                    <div className="poster__box"></div>
                                    <span className="poster__number">sound <br/> design</span>
                                </figcaption>
                            </figure>
                        </div>
                        <div className="tabscontent__item" id="production">
                            <figure className="poster">
                                <img className="poster__img" src="img/camera_2.jpg" />
                                <figcaption className="poster__caption">

                                    <h2 className="poster__title">scripts<br/>locations</h2>
                                    <p className="poster__deco">shot lists</p>
                                    <div className="poster__box"></div>
                                    <span className="poster__number">Preproduction</span>
                                </figcaption>
                            </figure>
                        </div>


                        <button className="btn btn--back">
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </button>
                    </div>

                </main>
            </div>
        )
    }
}