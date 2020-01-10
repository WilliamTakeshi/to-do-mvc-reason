'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var React = require("react");

function str(prim) {
  return prim;
}

function valueFromEvent(e) {
  return e.target.value;
}

var lastId = {
  contents: 0
};

function newItem(text) {
  lastId.contents = lastId.contents + 1 | 0;
  return {
          id: lastId.contents,
          title: text,
          completed: false
        };
}

function reducer(state, action) {
  if (action.tag) {
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
              newItem(action[0]),
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

function TodoApp$Input(Props) {
  var onSubmit = Props.onSubmit;
  var match = React.useReducer((function (_oldText, newText) {
          return newText;
        }), "");
  var setText = match[1];
  var text = match[0];
  return React.createElement("input", {
              placeholder: "Write something to do",
              type: "text",
              value: text,
              onKeyDown: (function (e) {
                  if (e.key === "Enter") {
                    Curry._1(onSubmit, text);
                    return Curry._1(setText, "");
                  } else {
                    return 0;
                  }
                }),
              onChange: (function (e) {
                  return Curry._1(setText, e.target.value);
                })
            });
}

var Input = {
  make: TodoApp$Input
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
                }, "What to do?", React.createElement(TodoApp$Input, {
                      onSubmit: (function (text) {
                          return Curry._1(dispatch, /* AddItem */Block.__(0, [text]));
                        })
                    })), React.createElement("div", {
                  className: "items"
                }, $$Array.of_list(List.map((function (item) {
                            return React.createElement(TodoApp$TodoItem, {
                                        item: item,
                                        onToggle: (function (param) {
                                            return Curry._1(dispatch, /* ToggleItem */Block.__(1, [item.id]));
                                          }),
                                        key: String(item.id)
                                      });
                          }), items))), React.createElement("div", undefined, String(numItems) + "items"));
}

var make = TodoApp;

exports.str = str;
exports.valueFromEvent = valueFromEvent;
exports.lastId = lastId;
exports.newItem = newItem;
exports.reducer = reducer;
exports.TodoItem = TodoItem;
exports.Input = Input;
exports.make = make;
/* react Not a pure module */
