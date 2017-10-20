import React, {Component} from 'react'
import anime from 'animejs'
import '../css/About.css'

import TabsNav from '../utils/TabsNav'

function extend(a, b) {
    for (var key in b) {
        if (b.hasOwnProperty(key)) {
            a[key] = b[key];
        }
    }
    return a;
}

function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this,
            args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

var win = {
    width: window.innerWidth,
    height: window.innerHeight
}



 


export default class About extends Component {

    _openTab(tab) {

        const contentItems = [].slice.call(document.querySelectorAll('.tabscontent__item'))
        const backCtrl = document.querySelector('.tabscontent > button.btn--back')
        const menuCtrl = document.querySelector('button.btn--menu')
        const isContentShown = false
        let current
        const nav = document.querySelector('.tabsnav')

        const tnav = new TabsNav(nav, {
                movable: 'all',
                extramovable: '.content',
                layout: 'vertical',
                animeduration: 700,
                animeeasing: 'easeInOutCubic',
                animedelay: 100,
                onOpenBarsUpdate: this.openTabCallback,
                onOpenTab: function() {
                    // Show the back button after the tab is open.
                    anime({
                        targets: backCtrl,
                        duration: 800,
                        easing: 'easeOutExpo',
                        scale: [0,1],
                        opacity: {
                            value: 1,
                            duration: 300,
                            easing: 'linear'
                        }
                    });
                }
            })
            backCtrl.addEventListener('click', this.closeTabs(tnav, contentItems, current, isContentShown, backCtrl, menuCtrl))
            menuCtrl.addEventListener('click', this.toggleTabs(tnav, menuCtrl))

        if (tnav.isAnimating) {
            return false;
        }
        tnav.isAnimating = true;

        // Update current value (index of the current tab).
        tnav.current = tnav.DOM.indexOf(tab);

        var bounds = tab.getBoundingClientRect(),
            currentDimensions = {
                left: bounds.left,
                top: bounds.top,
                width: bounds.width,
                height: bounds.height
            },
            self = tnav;

        // Choose the dimentions based on the layout mode.
        tnav.dim = {
            measure: tnav.options.layout === 'vertical' ? currentDimensions.width : currentDimensions.height,
            position: tnav.options.layout === 'vertical' ? currentDimensions.left : currentDimensions.top,
            win: tnav.options.layout === 'vertical' ? win.width : win.height
        };

        tnav.DOM.bars.forEach(function (bar) {
            // Set transform origin on the respective bar.
            bar.style.transformOrigin = self.options.layout === 'vertical' ? '0% 50%' : '50% 0%';
        });

        // Set z-indexes.
        tnav.DOM.forEach(function (tab, idx) {
            tab.style.zIndex = idx === self.current ? 100 : 1;
        });

        // Animate tabs and bars.
        var animeTabs = {
                targets: tnav.options.movable === 'all' ? tnav.DOM.tabs : tnav.DOM.tabs[tnav.current]
            },
            animeBars = {
                targets: tnav.options.movable === 'all' ? tnav.DOM.bars : tnav.DOM.bars[tnav.current]
            },
            animeTabsDelay = function (target, index, cnt) {
                if (cnt === 1 || self.options.animedelay === 0) {
                    return 0;
                } else {
                    var total = cnt + 1,
                        middle = Math.floor(total / 2);
                    if (self.current >= middle) {
                        return index <= self.current ? index * self.options.animedelay : (total - index - 1) * self.options.animedelay;
                    } else {
                        return index < self.current ? index * self.options.animedelay : (total - index - 1) * self.options.animedelay;
                    }
                }
            },
            animeTabsTranslation = function (target, index, cnt) {
                if (index === self.current || cnt === 1) {
                    return -1 * self.dim.position;
                } else {
                    var pixels = 1; // adding an extra pixel for the translation due to the fuzzy rendering.
                    return index > self.current ? self.dim.win - (self.dim.position + self.dim.measure) - pixels : -1 * self.dim.position + pixels;
                }
            },
            animeBarsScale = function (target, index, cnt) {
                return index === self.current || cnt === 1 ? self.dim.win / self.dim.measure : 1;
            }

        animeTabs.duration = animeBars.duration = tnav.options.animeduration;
        animeTabs.easing = animeBars.easing = tnav.options.animeeasing;
        animeTabs.delay = animeBars.delay = animeTabsDelay;
        animeTabs[tnav.options.layout === 'vertical' ? 'translateX' : 'translateY'] = animeTabsTranslation;
        animeBars[tnav.options.layout === 'vertical' ? 'scaleX' : 'scaleY'] = animeBarsScale;
        animeTabs.complete = function () {
            self.isAnimating = false;
            self.isOpen = true;
            // Callback
            self.options.onOpenTab(self.current, tab);
        };
        animeBars.update = function (anim) {
            self.options.onOpenBarsUpdate(anim, self.current, tab);
        }

        anime(animeTabs);
        anime(animeBars);

        // Animate extramovable elements.
        if (tnav.extraEl) {
            var animeExtra = {
                    targets: tnav.extraEl,
                    duration: tnav.options.animeduration,
                    easing: tnav.options.animeeasing,
                    delay: 0
                },
                extraBounds = tnav.extraEl.getBoundingClientRect(),
                animeExtraTranslation = tnav.options.layout === 'vertical' ? tnav.dim.win - (tnav.dim.position + tnav.dim.measure) + Math.abs(extraBounds.left - tnav.dim.position) + tnav.dim.measure : -1 * tnav.dim.position;

            animeExtra[tnav.options.layout === 'vertical' ? 'translateX' : 'translateY'] = animeExtraTranslation;
            anime(animeExtra);
        }
    }

    openTabCallback(anim, idx, tab) {
        const contentItems = [].slice.call(document.querySelectorAll('.tabscontent__item'))
        const backCtrl = document.querySelector('.tabscontent > button.btn--back')
        const menuCtrl = document.querySelector('button.btn--menu')
        let isContentShown = false
        let current
        const nav = document.querySelector('.tabsnav')

        const tnav = new TabsNav(nav, {
                movable: 'all',
                extramovable: '.content',
                layout: 'vertical',
                animeduration: 700,
                animeeasing: 'easeInOutCubic',
                animedelay: 100,
                onOpenBarsUpdate: this.openTabCallback,
                onOpenTab: function() {
                    // Show the back button after the tab is open.
                    anime({
                        targets: backCtrl,
                        duration: 800,
                        easing: 'easeOutExpo',
                        scale: [0,1],
                        opacity: {
                            value: 1,
                            duration: 300,
                            easing: 'linear'
                        }
                    });
                }
            })
            backCtrl.addEventListener('click', this.closeTabs(tnav, contentItems, current, isContentShown, backCtrl, menuCtrl))
            menuCtrl.addEventListener('click', this.toggleTabs(tnav, menuCtrl))


      
    

        if( anim.progress > 60 && !isContentShown ) {
            isContentShown = true;
            current = idx;

            var contentItem = contentItems[idx],
                content = {
                    img: contentItem.querySelector('img.poster__img'),
                    title: contentItem.querySelector('.poster__title'),
                    deco: contentItem.querySelector('.poster__deco'),
                    box: contentItem.querySelector('.poster__box'),
                    number: contentItem.querySelector('.poster__number')
                };

            // Hide the content elements.
            content.img.style.opacity = content.title.style.opacity = content.deco.style.opacity = content.box.style.opacity = content.number.style.opacity = 0;
            // Show content item.
            contentItem.style.opacity = 1;
            contentItem.classList.add('tabscontent__item--current');

            // Animate content elements in.
            anime.remove([content.img, content.title, content.box, content.number, content.deco]);
            anime({
                targets: [content.img, content.title, content.box, content.number, content.deco],
                easing: 'easeOutExpo',
                duration: function(t,i) {
                    return 600 + i*100;
                },
                scaleX: function(t,i) {
                    return i === 0 ? [0,1] : 1;
                },
                translateX: function(t,i) {
                    return [-80-i*150,0];
                },
                rotate: function(t,i) {
                    return i === 2 ? [-40,0] : 0;
                },
                opacity: {
                    value: 1,
                    duration: 300,
                    easing: 'linear'
                }
            });
        }
    }
    
    
    closeTabs() {
        const contentItems = [].slice.call(document.querySelectorAll('.tabscontent__item'))
        const backCtrl = document.querySelector('.tabscontent > button.btn--back')
        const menuCtrl = document.querySelector('button.btn--menu')
        let isContentShown = false
        let current
        const nav = document.querySelector('.tabsnav')

        const tnav = new TabsNav(nav, {
                movable: 'all',
                extramovable: '.content',
                layout: 'vertical',
                animeduration: 700,
                animeeasing: 'easeInOutCubic',
                animedelay: 100,
                onOpenBarsUpdate: this.openTabCallback,
                onOpenTab: function() {
                    // Show the back button after the tab is open.
                    anime({
                        targets: backCtrl,
                        duration: 800,
                        easing: 'easeOutExpo',
                        scale: [0,1],
                        opacity: {
                            value: 1,
                            duration: 300,
                            easing: 'linear'
                        }
                    });
                }
            })
            
            
        if( !tnav.isOpen ) return;

        const contentItem = contentItems[current],
            content = {
                img: contentItem.querySelector('img.poster__img'),
                title: contentItem.querySelector('.poster__title'),
                deco: contentItem.querySelector('.poster__deco'),
                box: contentItem.querySelector('.poster__box'),
                number: contentItem.querySelector('.poster__number')
            };

        // Hide the content elements.
        anime.remove([content.img, content.title, content.box, content.number, content.deco]);
        // Animate content elements out.
        anime({
            targets: [content.deco, content.number, content.box, content.title, content.img],
            easing: 'easeInOutCubic',
            duration: function(t,i) {
                return 600 + i*100;
            },
            delay: function(t,i,c) {
                return (c-i-1)*35;
            },
            translateX: function(t,i) {
                return [0,-200-i*150];
            },
            rotate: function(t,i) {
                return i === 2 ? [0,-40] : 0;
            },
            opacity: {
                value: 0,
                duration: 450
            },
            update: function(anim) {
                if( anim.progress > 20 && isContentShown ) {
                    isContentShown = false;
                    // Close tab.
                    tnav.close();
                }
            },
            complete: function() {
                // Hide content item.
                contentItem.style.opacity = 0;
                contentItem.classList.remove('tabscontent__item--current');
            }
        });

        // Hide back ctrl
        anime.remove(backCtrl);
        anime({
            targets: backCtrl,
            duration: 800,
            easing: 'easeOutExpo',
            scale: [1,0],
            opacity: {
                value: 0,
                duration: 200,
                easing: 'linear'
            }
        });
    }
    show(callback) {
        const contentItems = [].slice.call(document.querySelectorAll('.tabscontent__item'))
        const backCtrl = document.querySelector('.tabscontent > button.btn--back')
        const menuCtrl = document.querySelector('button.btn--menu')
        const isContentShown = false
        let current
        const nav = document.querySelector('.tabsnav')
        const tnav = new TabsNav(nav, {
            movable: 'all',
            extramovable: '.content',
            layout: 'vertical',
            animeduration: 700,
            animeeasing: 'easeInOutCubic',
            animedelay: 100,
            onOpenBarsUpdate: this.openTabCallback,
            onOpenTab: function() {
                // Show the back button after the tab is open.
                anime({
                    targets: backCtrl,
                    duration: 800,
                    easing: 'easeOutExpo',
                    scale: [0,1],
                    opacity: {
                        value: 1,
                        duration: 300,
                        easing: 'linear'
                    }
                });
            }
        })
        var self = tnav;

        tnav.isVisible = true;

        tnav.DOM.tabs.forEach(function (tab) {
            var bar = tab.querySelector('.tabsnav__bar'),
                title = tab.querySelector('.tabsnav__title');

            // Set transform origin.
            bar.style.transformOrigin = '50% 50%';
            bar.style.transform = self.options.layout === 'vertical' ? 'scaleX(0)' : 'scaleY(0)';

            title.style.opacity = 0;
            title.style.transform = self.options.layout === 'vertical' ? 'translateX(10) rotate(-90)' : 'translateY(10)';
        });

        tnav.DOM.el.classList.remove('tabsnav--hidden');

        // Animate bars.
        anime.remove(tnav.DOM.bars);
        var animeBars = {
            targets: tnav.DOM.bars,
            duration: 500,
            delay: function (t, i) {
                return i * 50;
            },
            easing: 'easeOutExpo',
            complete: function () {
                if (typeof callback === 'function') {
                    callback.call();
                }
            }
        };
        animeBars[tnav.options.layout === 'vertical' ? 'scaleX' : 'scaleY'] = [0, 1];
        anime(animeBars);

        // Animate titles.
        var titles = tnav.DOM.el.querySelectorAll('.tabsnav__title');
        anime.remove(titles);
        var animeTitles = {
            targets: titles,
            duration: 500,
            delay: function (t, i) {
                return i * 50;
            },
            easing: 'easeOutExpo',
            opacity: [0, 1]
        };
        animeTitles[tnav.options.layout === 'vertical' ? 'translateX' : 'translateY'] = [10, 0];
        animeTitles.rotate = self.options.layout === 'vertical' ? [-90, -90] : 0;
        anime(animeTitles);
    }

    toggleVisibility() {
        const contentItems = [].slice.call(document.querySelectorAll('.tabscontent__item'))
        const backCtrl = document.querySelector('.tabscontent > button.btn--back')
        const menuCtrl = document.querySelector('button.btn--menu')
        const isContentShown = false
        let current
        const nav = document.querySelector('.tabsnav')
        const tnav = new TabsNav(nav, {
            movable: 'all',
            extramovable: '.content',
            layout: 'vertical',
            animeduration: 700,
            animeeasing: 'easeInOutCubic',
            animedelay: 100,
            onOpenBarsUpdate: this.openTabCallback,
            onOpenTab: function() {
                // Show the back button after the tab is open.
                anime({
                    targets: backCtrl,
                    duration: 800,
                    easing: 'easeOutExpo',
                    scale: [0,1],
                    opacity: {
                        value: 1,
                        duration: 300,
                        easing: 'linear'
                    }
                });
            }
        })

        if (tnav.isAnimating) {
            return false;
        }
        tnav.isAnimating = true;
    
        var self = tnav,
            endAnimation = function () {
                self.isAnimating = false;
            };
    
        if (tnav.isVisible) {
            tnav.hide(endAnimation);
            return 0;
        } else {
            this.show(tnav, endAnimation);
            return 1;
        }
    }
    toggleTabs() {
        const contentItems = [].slice.call(document.querySelectorAll('.tabscontent__item'))
        const backCtrl = document.querySelector('.tabscontent > button.btn--back')
        const menuCtrl = document.querySelector('button.btn--menu')
        const isContentShown = false
        let current
        const nav = document.querySelector('.tabsnav')
        const tnav = new TabsNav(nav, {
            movable: 'all',
            extramovable: '.content',
            layout: 'vertical',
            animeduration: 700,
            animeeasing: 'easeInOutCubic',
            animedelay: 100,
            onOpenBarsUpdate: this.openTabCallback,
            onOpenTab: function() {
                // Show the back button after the tab is open.
                anime({
                    targets: backCtrl,
                    duration: 800,
                    easing: 'easeOutExpo',
                    scale: [0,1],
                    opacity: {
                        value: 1,
                        duration: 300,
                        easing: 'linear'
                    }
                });
            }
        })
        
        var state = this.toggleVisibility()
        console.log(state)
        if( state === 0 ) {
            menuCtrl.classList.remove('btn--menu-active');
        }
        else if( state === 1 ) {
            menuCtrl.classList.add('btn--menu-active');
        }
    }

    componentDidMount(){
        
        
        const contentItems = [].slice.call(document.querySelectorAll('.tabscontent__item'))
        const backCtrl = document.querySelector('.tabscontent > button.btn--back')
        const menuCtrl = document.querySelector('button.btn--menu')
        const isContentShown = false
        let current
        const nav = document.querySelector('.tabsnav')

        const tnav = new TabsNav(nav, {
                movable: 'all',
                extramovable: '.content',
                layout: 'vertical',
                animeduration: 700,
                animeeasing: 'easeInOutCubic',
                animedelay: 100,
                onOpenBarsUpdate: this.openTabCallback,
                onOpenTab: function() {
                    // Show the back button after the tab is open.
                    anime({
                        targets: backCtrl,
                        duration: 800,
                        easing: 'easeOutExpo',
                        scale: [0,1],
                        opacity: {
                            value: 1,
                            duration: 300,
                            easing: 'linear'
                        }
                    });
                }
            })
            backCtrl.addEventListener('click', this.closeTabs(tnav, contentItems, current, isContentShown, backCtrl, menuCtrl))
            menuCtrl.addEventListener('click', this.toggleTabs(tnav, menuCtrl))
    
        
    }
    
           
    

    render() {

      
        
                return (
                    <div id="About" className="About">
 
                        
                            <main className="view">
                                <div className="content">
                                    <div className="deco">
                                        <p className="deco__text">To immortalize the deepest realities of <span>The Story</span></p>
                                    </div>

                                    <header className="codrops-header">
                                        <p className="codrops-header__info">The straight up<br/>freshest vids<br/>I got</p>
                                        <span className="codrops-header__deco">hitherto</span>
                                        <h1 className="codrops-header__title">unseen</h1>
                                        <p className="codrops-header__tagline">peep the show</p>

                                    </header>
                                </div>

                                <button className="btn btn--menu">
                                    <svg className="icon icon--menu"></svg>
                                    <svg className="icon icon--cross"></svg>
                                </button>

                                <nav className="tabsnav tabsnav--vertical tabsnav--ander">
                                    <div className="tabsnav__item" onClick={this._openTab.bind(this)}>
                                        <div className="tabsnav__bar"></div>
                                        <h3 className="tabsnav__title">Shooting</h3>
                                    </div>
                                    <div className="tabsnav__item" onClick={this._openTab.bind(this)}>
                                        <div className="tabsnav__bar"></div>
                                        <h3 className="tabsnav__title">Editing</h3>
                                    </div>
                                    <div className="tabsnav__item" onClick={this._openTab.bind(this)}>
                                        <div className="tabsnav__bar"></div>
                                        <h3 className="tabsnav__title">Production</h3>
                                    </div>

                                </nav>
                                <div className="tabscontent">
                                    <div className="tabscontent__item">
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
                                    <div className="tabscontent__item">
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
                                    <div className="tabscontent__item">
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
                );
            }
}