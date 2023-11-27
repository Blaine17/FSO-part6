import { createSlice } from '@reduxjs/toolkit'


const notificationSlice = createSlice({
  name: 'notifcation',
  initialState: 'no notification to show',
  reducers: {
    createNotifcation(state, action) {
      console.log(action)
      return action.payload
    },
    removeNotifcation(state, action) {
      return action.payload
    }
  }
})
export const { createNotifcation, removeNotifcation } = notificationSlice.actions

export const setNotification = (message, seconds) => {
  return async dispatch => {
    dispatch(createNotifcation(message))
    const timeout = seconds * 1000
    setTimeout(() => dispatch(removeNotifcation(`notification finished via thunk action creator`)), timeout)
  }
}
export default notificationSlice.reducer