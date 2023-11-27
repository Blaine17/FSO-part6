const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  console.log(state)
  switch (action.type) {
    case 'GOOD':
     const updatedState = {...state, good: state.good + 1}
      return  updatedState
    case 'OK':
      return {...state, ok: state.ok + 1}
    case 'BAD':
      const cloneState = Object.assign({}, state)
      cloneState.bad = cloneState.bad + 1
      return cloneState
    case 'ZERO':
      return { good: 0, bad: 0, ok:0 }
    default: return state
  }
  
}

export default counterReducer
