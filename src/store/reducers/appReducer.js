const initialState = {
  appMask: {
    as: "transparent", //  "transparent" | "backdrop",
    isOpen: false
  },
  isOpenBackdrop: false,
  visitors: {
    all_time_visit: 0,
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
        // payload = {
        //   as: "transparent", //  "transparent" | "backdrop",
        //   isOpen: false
        // }
        updateState.appMask = action.payload
      } else {
        updateState.appMask = !updateState.appMask.isOpen
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

