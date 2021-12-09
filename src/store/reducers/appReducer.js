const initialState = {
  isOpenAppMask: false,
  isOpenBackdrop: false,
  visitors: {
    day_visitors: [],
    total_visitors: [],
  }

}


export default function (state = initialState, action) {
  let updateState = {...state}
  switch (action.type) {

    case "TOGGLE_BACKDROP":
      if(action.payload){
        updateState.isOpenBackdrop = action.payload
      } else {
        updateState.isOpenBackdrop = !updateState.isOpenBackdrop
      }
    return updateState

    case "TOGGLE_APPMASK":
      if(action.payload){
        updateState.isOpenAppMask = action.payload
      } else {
        updateState.isOpenAppMask = !updateState.isOpenAppMask
      }
    return updateState


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

