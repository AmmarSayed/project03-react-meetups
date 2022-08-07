const redux = require("redux");

const initialState = {
  counter: 0,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        counter: state.counter + 1,
      };
    case "DECREMENT":
      return { counter: state.counter - 1 };
    default:
      return state;
  }
};

const store = redux.createStore(counterReducer);

// A component which listen to the store changes
const counterSubscriber = () => {
  // latest state
  const latestState = store.getState();
  // log the received state
  console.log(latestState);
};

// let the component listen/subscribe to the store
// so it gets the latest updates
store.subscribe(counterSubscriber);

// dispatch actions
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "DECREMENT" });
