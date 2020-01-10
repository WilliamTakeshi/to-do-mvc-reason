'use strict';

var React = require("react");
var ReactDOMRe = require("reason-react/src/ReactDOMRe.js");
var TodoApp$ReasonReactExamples = require("./App/TodoApp.bs.js");
var ExampleStyles$ReasonReactExamples = require("./ExampleStyles.bs.js");

var style = document.createElement("style");

document.head.appendChild(style);

style.innerHTML = ExampleStyles$ReasonReactExamples.style;

ReactDOMRe.renderToElementWithId(React.createElement(TodoApp$ReasonReactExamples.make, { }), "root");

exports.style = style;
/* style Not a pure module */
