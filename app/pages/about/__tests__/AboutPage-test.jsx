import React from 'react';
import AboutPage from '../AboutPage';
import { assert } from 'chai';

let { TestUtils } = React.addons;

describe('AboutPage', () => {

  it('Should have the correct CSS class', () => {

    let aboutPage = TestUtils.renderIntoDocument(
      <AboutPage />
    );

    let pageElement = React.findDOMNode(aboutPage);

    let expectedClass = 'page AboutPage';

    assert.equal(pageElement.className, expectedClass, 'css class not set as expected');
  });


});

