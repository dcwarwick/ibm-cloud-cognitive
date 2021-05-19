/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { action } from '@storybook/addon-actions';

import { pkg } from '../../settings';
import { getStorybookPrefix } from '../../../config';

import { Button, ButtonSet } from 'carbon-components-react';
import { ButtonMenu, ButtonMenuItem } from '.';
import mdx from './ButtonMenu.mdx';

import styles from './_storybook-styles.scss';

import { Add16, ChevronDown16, ChevronUp16 } from '@carbon/icons-react';

const storybookPrefix = getStorybookPrefix(pkg, ButtonMenu.displayName);

export default {
  title: `${storybookPrefix}/${ButtonMenu.displayName}`,
  component: ButtonMenu,
  // TODO: Define argTypes for props not represented by standard JS types.
  // argTypes: {
  //   egProp: { control: 'color' },
  // },
  parameters: {
    styles,
    docs: {
      page: mdx,
    },
  },
};

const Template = (args) => {
  return (
    <ButtonMenu label="Primary button" renderIcon={Add16} {...args}>
      <ButtonMenuItem
        itemText="Option 1a"
        onClick={action(`Click on Option 1`)}
      />
      <ButtonMenuItem
        itemText="Option 2"
        onClick={action(`Click on Option 2`)}
      />
      <ButtonMenuItem
        itemText="Option 3"
        onClick={action(`Click on Option 3`)}
      />
      <ButtonMenuItem
        itemText="Option 4"
        onClick={action(`Click on Option 4`)}
        hasDivider
      />
    </ButtonMenu>
  );
};

const ComboButton = (args) => {
  return (
    <div className="button-menu--combo-button" data-floating-menu-container>
      <Button onClick={action(`Click on ComboButtonItem 1`)}>
        ComboButtonItem 1
      </Button>
      <ButtonMenu renderIcon={ChevronDown16} {...args} flipped>
        <ButtonMenuItem
          itemText="ComboButtonItem 2"
          onClick={action(`Click on ComboButtonItem 2`)}
        />
        <ButtonMenuItem
          itemText="ComboButtonItem 3"
          onClick={action(`Click on ComboButtonItem 3`)}
        />
      </ButtonMenu>
    </div>
  );
};

export const buttonMenu = Template.bind({});
buttonMenu.storyName = 'Button menu';
buttonMenu.args = {};

export const comboButton = ComboButton.bind({});
comboButton.storyName = 'ComboButton pattern';
comboButton.args = {};
