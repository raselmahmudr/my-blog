const initialState = {

  visitors: {
    day_visitors: [],
    total_visitors: [],
  }

}


export default function (state = initialState, action) {
  let updateState = {...state}
  switch (action.type) {
    case "SET_VISITORS":

      updateState.visitors = {
        ...updateState,
        ...action.payload
      }

      return updateState
    default:
      return state
  }
}

