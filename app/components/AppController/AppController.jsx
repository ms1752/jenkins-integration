import './_AppController.scss';
import React from 'react';
import Router from 'react-router';

import FlyOutMenu from '../FlyOutMenu/FlyOutMenu';
import Header from '../Header/Header';
import { FlyOutMenuConstants } from '../ComponentConstants';

import { APP_TITLE } from '../../constants/AppConstants';

var RouteHandler = Router.RouteHandler;

class AppController extends React.Component {

  constructor (...args) {
    super(...args);

    //bind needed functions to the scope of this component
    this._handleLeftHeaderButtonClick = this._handleLeftHeaderButtonClick.bind(this);

  }

  componentDidMount () {
  }

  componentWillUnmount () {
  }

  render () {

    let mainNavigation = <FlyOutMenu ref="flyOut" side={FlyOutMenuConstants.Side.LEFT} type={FlyOutMenuConstants.Type.OVERLAY}/>;

    return (
      <div>
        <Header mainNavPosition="left" mainNav={mainNavigation} handleLeftClick={this._handleLeftHeaderButtonClick}
                title={APP_TITLE}/>
        <div className="AppController-Content">
          <RouteHandler />
        </div>
      </div>
    );
  }

  _handleLeftHeaderButtonClick () {
    this.refs.flyOut.toggleShowMenu();
  }

}

export default AppController;
