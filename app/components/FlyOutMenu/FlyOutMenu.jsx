import './_FlyOutMenu.scss';

import React from 'react';

import { FlyOutMenuConstants } from '../ComponentConstants';

/**
 * The FlyOutMenu is a reusable component that provides a flyout/hamburger/etc menu to your application.
 * It currently accepts two possible properties:
 *
 * side: Which side of the screen the menu should appear from (left and right only currently)
 * type: How the menu interacts with the main content of the app. Overlay will cause the flyout menu to be
 *  displayed on top of the main content of the app. Push will cause the main content of the app to shift
 *  partially off the screen to make room for the menu.
 *
 */
class FlyOutMenu extends React.Component {

  constructor (...args) {
    super(...args);
    //set initial component state
    this.state = {
      isMenuShown: false
    };
  }

  componentDidMount () {

    let overlayElement = React.findDOMNode(this.refs.overlay);
    let that = this;


    overlayElement.onclick = function overlayClicked () {
      // alert("overlay clicked");
      let body = document.getElementsByTagName('body')[0];

      body.classList.remove('show-menu');
      //add/remove needed classes here
      that.setState({
        isMenuShown: false
      });
      console.log('this.state', that.state);
    }
  }

  render () {
    return (
      <div className={'FlyOutMenu FlyOutMenu--' + this.props.side}>
        <div className="main-nav">
          {/*flyout menu content goes here - below is example stub content*/}
          <h3>Main Nav</h3>
          <nav onClick={this.toggleShowMenu.bind(this)}>
            <ul>
              <li>
                <a href="#/">Home</a>
              </li>
              <li>
                <a href="#/about">About</a>
              </li>
              <li>
                <a target="_blank"
                     href="https://github.com/lmigpiit/react-starter-kit/wiki/Getting-Started-Guide">
                  Getting Started
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div ref="overlay" className="overlay"></div>
      </div>
    );
  }

  /**
   *
   */
  toggleShowMenu () {
    this.state.isMenuShown ? this._hideMenu() : this._showMenu();
  }

  _hideMenu () {
    let rootElement = React.findDOMNode(this);
    let body = document.getElementsByTagName('body')[0];

    body.classList.remove('show-menu');

    //add/remove needed classes here
    this.setState({
      isMenuShown: false
    });
  }

  _showMenu () {
    let rootElement = React.findDOMNode(this);
    rootElement.classList.add('FlyOutMenu--display');


    let body = document.getElementsByTagName('body')[0];
    body.className = body.className + ' show-menu';

    //add/remove needed classes here
    this.setState({
      isMenuShown: true
    });
  }

}

FlyOutMenu.propTypes = {
  side: React.PropTypes.oneOf([FlyOutMenuConstants.Side.LEFT, FlyOutMenuConstants.Side.RIGHT]).isRequired
};

export default FlyOutMenu;
