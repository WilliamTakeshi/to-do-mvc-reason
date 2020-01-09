'use strict';

var List = require("bs-platform/lib/js/list.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");

function str(prim) {
  return prim;
}

function newItem(param) {
  return {
          title: "new thing to do",
          completed: false
        };
}

function reducer(state, action) {
  return {
          items: /* :: */[
            {
              title: "new thing to do",
              completed: false
            },
            state.items
          ]
        };
}

function TodoApp(Props) {
  var match = React.useReducer(reducer, {
        items: /* :: */[
          {
            title: "Write some things to do",
            completed: false
          },
          /* [] */0
        ]
      });
  var dispatch = match[1];
  var numItems = List.length(match[0].items);
  return React.createElement("div", {
              className: "app"
            }, React.createElement("div", {
                  className: "title"
                }, "What to do?", React.createElement("button", {
                      onClick: (function (_e) {
                          return Curry._1(dispatch, /* AddItem */0);
                        })
                    }, "Add something")), React.createElement("div", {
                  className: "items"
                }, "Nothing"), React.createElement("div", undefined, String(numItems) + "items"));
}

var make = TodoApp;

exports.str = str;
exports.newItem = newItem;
exports.reducer = reducer;
exports.make = make;
/* react Not a pure module */
