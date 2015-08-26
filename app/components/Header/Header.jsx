import './_Header.scss';
import React from 'react';
import Router from 'react-router';

class Header extends React.Component {

  constructor (...args) {
    super(...args);

    this._handleLeftButtonClick = this._handleLeftButtonClick.bind(this);
    this._handleRightButtonClick = this._handleRightButtonClick.bind(this);
    this._handleTitleClick = this._handleTitleClick.bind(this);
  }

  render () {
    console.log('this.props.mainNav', this.props.mainNav);
    let mainNav = this.props.mainNav;
    let headerCssClass = 'Header ' + this.props.mainNavPosition;

    return (
      <div className={headerCssClass} id="header">
        <div className="Header-button" onTouchTap={this._handleLeftButtonClick}>
        <svg className="mui-svg-icon" viewBox="0 0 24 24" data-reactid=".0.0.0.0.$touchRipple.1:2"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" data-reactid=".0.0.0.0.$touchRipple.1:2.0"></path></svg>
      </div>
      <div className="Header-title" onTouchTap={this._handleTitleClick}>
        <h1 className="Header-title--text">{
          this.props.title || ''}
        </h1>
      </div>
      {mainNav}
      </div>
    );
  }

  _handleLeftButtonClick (event) {
    if (this.props.handleLeftClick) {
      this.props.handleLeftClick(event);
    }
  }

  _handleRightButtonClick (event) {
    if (this.props.handleRightClick) {
      this.props.handleRightClick(event);
    }
  }

  _handleTitleClick (event) {
    if (this.props.handleTitleClick) {
      this.props.handleTitleClick(event);
    }
  }

}

Header.propTypes = {
  handleLeftClick: React.PropTypes.func,
  handleRightClick: React.PropTypes.func,
  handleTitleClick: React.PropTypes.func,
  title: React.PropTypes.string,
  mainNav: React.PropTypes.component,
  mainNavPosition: React.PropTypes.string
};

export default Header;
