import React from 'react/addons';
import Header from '../Header.jsx';
import { assert } from 'chai';

let { TestUtils } = React.addons;

describe('Header', () => {
  it('Should have the correct css class', () => {

    let header = TestUtils.renderIntoDocument(
      <Header title="Testing" mainNavPosition="left"/>
    );
    let headerElement = React.findDOMNode(header);
    assert.equal(headerElement.className, 'Header left', 'Header class not applied to element');

  });

});
