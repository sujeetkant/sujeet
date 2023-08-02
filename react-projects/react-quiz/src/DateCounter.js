import { useReducer, useState } from "react";

function counter(state, action){
  console.log(state, action);
  switch(action.type){
    case 'dec':
      return state - action.step
    case 'inc':
      return state + action.step
    case 'reset':
      return 0  
    case 'setCount':
      return action.step 
    default :
      return state 
  }  
}

function DateCounter() {
  const [count, dispatch] = useReducer(counter, 0);
  const [step, setStep] = useState(1);

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({type: 'dec', step : step});
  };

  const inc = function () {
    dispatch({type: 'inc', step : step});    
  };

  const defineCount = function (e) {
    dispatch({ type: "setCount", step : Number(e.target.value) });
  };

  const defineStep = function (e) {
    setStep(Number(e.target.value));
  };

  const reset = function () {
    dispatch({type: 'reset', payload: 0});
    setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
