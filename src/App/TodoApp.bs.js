'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");

function str(prim) {
  return prim;
}

var lastId = {
  contents: 0
};

function newItem(param) {
  lastId.contents = lastId.contents + 1 | 0;
  return {
          id: lastId.contents,
          title: "Click a button",
          completed: true
        };
}

function reducer(state, action) {
  if (action) {
    var id = action[0];
    var items = List.map((function (item) {
            var match = item.id === id;
            if (match) {
              return {
                      id: item.id,
                      title: item.title,
                      completed: !item.completed
                    };
            } else {
              return item;
            }
          }), state.items);
    return {
            items: items
          };
  } else {
    return {
            items: /* :: */[
              newItem(/* () */0),
              state.items
            ]
          };
  }
}

function TodoApp$TodoItem(Props) {
  var item = Props.item;
  var onToggle = Props.onToggle;
  return React.createElement("div", {
              className: "item",
              onClick: (function (_e) {
                  return Curry._1(onToggle, /* () */0);
                })
            }, React.createElement("input", {
                  checked: item.completed,
                  type: "checkbox"
                }), item.title);
}

var TodoItem = {
  make: TodoApp$TodoItem
};

function TodoApp(Props) {
  var match = React.useReducer(reducer, {
        items: /* :: */[
          {
            id: 0,
            title: "Write some things to do",
            completed: false
          },
          /* [] */0
        ]
      });
  var dispatch = match[1];
  var items = match[0].items;
  var numItems = List.length(items);
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
                }, $$Array.of_list(List.map((function (item) {
                            return React.createElement(TodoApp$TodoItem, {
                                        item: item,
                                        onToggle: (function (param) {
                                            return Curry._1(dispatch, /* ToggleItem */[item.id]);
                                          }),
                                        key: String(item.id)
                                      });
                          }), items))), React.createElement("div", undefined, String(numItems) + "items"));
}

var make = TodoApp;

exports.str = str;
exports.lastId = lastId;
exports.newItem = newItem;
exports.reducer = reducer;
exports.TodoItem = TodoItem;
exports.make = make;
/* react Not a pure module */
