import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
let timeout

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    changeNotification(state, action) {
      return action.payload
    }
  } 
})

export const { changeNotification } = notificationSlice.actions

export const setNotification = (message, time) => {
  return async (dispatch) => {
    dispatch(changeNotification(message))
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      dispatch(changeNotification(''))
    }, time * 1000)
  }
}

export default notificationSlice.reducer