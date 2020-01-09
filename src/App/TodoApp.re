type item = {
  title: string,
  completed: bool,
};

type action =
  | AddItem;

type state = {items: list(item)};

let str = React.string;

let newItem = () => {title: "new thing to do", completed: false};

let reducer = (state, action) => {
  switch (action) {
  | AddItem => {items: [newItem(), ...state.items]}
  };
};

[@react.component]
let make = () => {
  let ({items}, dispatch) =
    React.useReducer(
      reducer,
      {items: [{title: "Write some things to do", completed: false}]},
    );
  let numItems = List.length(items);
  <div className="app">
    <div className="title">
      {str("What to do?")}
      <button onClick={_e => dispatch(AddItem)}>
        {str("Add something")}
      </button>
    </div>
    <div className="items"> {str("Nothing")} </div>
    <div> {str(string_of_int(numItems) ++ "items")} </div>
  </div>;
};