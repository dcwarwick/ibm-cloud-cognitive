/**
 * Copyright IBM Corp. 2021, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React from 'react';

// Other standard imports.
import PropTypes from 'prop-types';
import cx from 'classnames';
import { pkg, carbon } from '../../settings';

// Carbon and package components we use.
import { ComposedModal, ModalHeader } from 'carbon-components-react';

// The block part of our conventional BEM class names (bc__E--M).
const bc = `${pkg.prefix}--pattern-modal`;
const componentName = 'PatternModal';

// NOTE: the component SCSS is not imported here: it is rolled up separately.

/**
 * An extended wrapper of ComposedModal that provides transactional/passive
 * behavior and features.
 */
export const PatternModal = React.forwardRef(
  (
    {
      // The component props, in alphabetical order (for consistency).
      children,
      className,
      closeIconDescription,
      hasCloseIcon: hasCloseIconProp,
      kind,
      preventCloseOnClickOutside: preventCloseProp,
      // Collect any other property values passed in.
      ...rest
    },
    ref
  ) => {
    const isPassive = kind === 'passive';
    const hasCloseIcon = hasCloseIconProp ?? isPassive;
    const preventCloseOnClickOutside = preventCloseProp ?? !isPassive;

    const childrenWithProps = React.Children.toArray(children).map((child) => {
      switch (child.type) {
        case React.createElement(ModalHeader).type:
          return React.cloneElement(child, {
            className: hasCloseIcon
              ? `${bc}__header--with-close-icon`
              : `${bc}__header--without-close-icon`,
            iconDescription: closeIconDescription,
          });
        default:
          return child;
      }
    });

    return (
      <ComposedModal
        {
          // Pass through any other property values.
          ...rest
        }
        className={cx(bc, className)}
        {...{ preventCloseOnClickOutside, ref }}>
        {childrenWithProps}
      </ComposedModal>
    );
  }
);

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
PatternModal.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.

PatternModal.propTypes = {
  /**
   * The composed parts of the modal.
   */
  children: PropTypes.node,

  /**
   * An optional class or classes to be added to the outermost element.
   */
  className: PropTypes.string,

  /**
   * The accessibility title for the close icon (if shown). This prop is
   * required if kind is 'passive', and is ignored otherwise.
   */
  closeIconDescription: PropTypes.string,

  /**
   * Enable a close icon ('x') in the header area of the tearsheet. By default,
   * if this prop is omitted/null, a close icon will be shown for passive modals
   * and not for transactional modals (see the kind prop), but this can be
   * overridden either way using this prop if required.
   */
  hasCloseIcon: PropTypes.bool,

  /**
   * The kind of modal: 'passive' or 'transactional'. Passive modals have no
   * action buttons, and display an 'x' close icon and can also be closed by
   * clicking outside the modal area. Transactional modals are interactive and
   * have action buttons, and do not display an 'x' close icon and cannot be
   * closed by clicking outside.
   */
  kind: PropTypes.oneOf(['passive', 'transactional']),

  /**
   * Prevent the modal from automatically closing if the user clicks outside it.
   * By default, if this prop is omitted/null, a passive modal can be closed by
   * clicking outside it while a transactional modal cannot, but this can be
   * overridden either way using this prop if required.
   */
  preventCloseOnClickOutside: PropTypes.bool,
};
