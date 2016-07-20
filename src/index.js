export default () => {
  let timers = {}
  let holders = {}

  const middleware = () => dispatch => action => {
    const {
      meta: { gather={} }={},
      type
    } = action

    const {
      time,
      key = type
    } = gather

    const shouldGather = (time && key)
    if (!shouldGather) {
      return dispatch(action)
    }

    if (timers[key]) {
      clearTimeout(timers[key])
    }

    if (!holders.hasOwnProperty(key)) {
      holders[key] = []
    }

    holders[key].push(...action.payload)

    timers[key] = setTimeout(function(){
      dispatch({
        type: key,
        payload: holders[key],
      })
      holders[key] = []
    }, time)

  }

  middleware._timers = timers

  return middleware
}
