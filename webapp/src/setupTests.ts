/* eslint-disable import/first */
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import 'jest-styled-components';

import { configure } from 'enzyme'
// oficjalny support dla enzyme kończy się na react 16
// import Adapter from 'enzyme-adapter-react-16'
// configure({ adapter: new Adapter() })
// oficjalnego wsparcia dla react 17 nie ma (w momencie tworzenia kodu)... jest za to nieoficjalny pakiet od @wojtekmaj
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });

import { toHaveNoViolations } from 'jest-axe';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

expect.extend(toHaveNoViolations)
expect.extend({ toMatchImageSnapshot });
