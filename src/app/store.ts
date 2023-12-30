import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import homePageReducer from './screens/HomePage/slice';
import reduxLogger from "redux-logger"
import restaurantPageReducer from './screens/RestaurantPage/slice';
import orderPageReducer from './screens/OrdersPage/slice';
export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(reduxLogger),
  reducer: {
    homePage: homePageReducer,
    restaurantPage: restaurantPageReducer,
    orderPage: orderPageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
