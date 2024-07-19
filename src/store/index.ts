import {configureStore, EnhancedStore} from '@reduxjs/toolkit';
import {questionsReducer} from './quizStore.ts'

const store: EnhancedStore = configureStore({
    reducer: {
        questions: questionsReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
