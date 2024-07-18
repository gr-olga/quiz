import {IQuestion} from "../types/quizTypes.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface QuestionsState {
    questions: IQuestion[];
    loading: boolean;
    error: string | null;
}

const initialState: QuestionsState = {
    questions: [],
    loading: false,
    error: null,
};

const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        fetchQuestionsStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchQuestionsSuccess(state, action: PayloadAction<IQuestion[]>) {
            state.loading = false;
            state.questions = action.payload;
        },
        fetchQuestionsFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        addQuestion(state, action: PayloadAction<IQuestion>) {
            state.questions.push(action.payload);
        },
        removeQuestion(state, action: PayloadAction<number>) {
            state.questions.splice(action.payload, 1);
        },
    },
});


export const {
    fetchQuestionsStart,
    fetchQuestionsSuccess,
    fetchQuestionsFailure,
    addQuestion,
    removeQuestion,
} = questionsSlice.actions;

export const questionsReducer = questionsSlice.reducer;