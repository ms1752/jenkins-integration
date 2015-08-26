import React from 'react/addons';
import FlyOutMenu from '../FlyOutMenu.jsx';
import { assert } from 'chai';

let { TestUtils } = React.addons;

describe('FlyOutMenu', () => {
  it('FlyOutMenu element should have the correct css class', () => {

    let flyOutMenu = TestUtils.renderIntoDocument(
      <FlyOutMenu title="Testing" side="left"/>
    );
    let flyOutMenuElement = React.findDOMNode(flyOutMenu);
    assert.equal(flyOutMenuElement.className, 'FlyOutMenu FlyOutMenu--left', 'FlyOutMenu class not applied to FlyOutMenu element');
  });

});
