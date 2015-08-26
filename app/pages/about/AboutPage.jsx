import './_AboutPage.scss';

import React from 'react';

class AboutPage extends React.Component {

  render () {
    return (
      <div className="page AboutPage">
        <br></br>

        <h1>About Page</h1>

        <p>This is an example about page, powered by React, ES6 &amp; webpack.</p>

        <p>Check out the Getting Started Wiki&nbsp;
          <a href="https://github.com/lmigpiit/react-starter-kit/wiki/Getting-Started-Guide" target="_blank">here</a>!
        </p>
      </div>
    );
  }

}

AboutPage.propTypes = {};

export default AboutPage;
