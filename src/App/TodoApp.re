type item = {
  id: int,
  title: string,
  completed: bool,
};

type action =
  | AddItem
  | ToggleItem(int);

type state = {items: list(item)};

let str = React.string;

let lastId = ref(0);
let newItem = () => {
  lastId := lastId^ + 1;
  {id: lastId^, title: "Click a button", completed: true};
};

let reducer = (state, action) => {
  switch (action) {
  | AddItem => {items: [newItem(), ...state.items]}
  | ToggleItem(id) =>
    let items =
      List.map(
        item => item.id === id ? {...item, completed: !item.completed} : item,
        state.items,
      );
    {items: items};
  };
};

module TodoItem = {
  [@react.component]
  let make = (~item, ~onToggle) => {
    <div className="item" onClick={_e => onToggle()}>
      <input type_="checkbox" checked={item.completed} />
      {str(item.title)}
    </div>;
  };
};

[@react.component]
let make = () => {
  let ({items}, dispatch) =
    React.useReducer(
      reducer,
      {
        items: [{id: 0, title: "Write some things to do", completed: false}],
      },
    );
  let numItems = List.length(items);
  <div className="app">
    <div className="title">
      {str("What to do?")}
      <button onClick={_e => dispatch(AddItem)}>
        {str("Add something")}
      </button>
    </div>
    <div className="items">
      {List.map(
         item =>
           <TodoItem
             item
             key={string_of_int(item.id)}
             onToggle={() => dispatch(ToggleItem(item.id))}
           />,
         items,
       )
       |> Array.of_list
       |> React.array}
    </div>
    <div> {str(string_of_int(numItems) ++ "items")} </div>
  </div>;
};