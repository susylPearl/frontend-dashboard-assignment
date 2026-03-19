import { configureStore } from '@reduxjs/toolkit'
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from 'react-redux'

export const store = configureStore({
  reducer: {
    // Add feature slices here as the app grows
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
