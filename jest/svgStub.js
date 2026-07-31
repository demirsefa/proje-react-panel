/* eslint-env node */
// The rollup build turns `import Icon from './icon.svg'` into a React component via @svgr.
// Jest has no such transform, so tests get this stand-in instead of a parse error.
const React = require('react');

function SvgStub(props) {
  return React.createElement('svg', props);
}

module.exports = SvgStub;
module.exports.default = SvgStub;
module.exports.ReactComponent = SvgStub;
module.exports.__esModule = true;
