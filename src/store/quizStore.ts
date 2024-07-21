import {Question} from '../types/quizTypes.ts';
import {createSlice, PayloadAction, Slice} from '@reduxjs/toolkit';

interface QuestionsState {
  questions: Question[];
  loading: boolean;
  error: string | null;
  score: Record<string, number>;
}

const initialState: QuestionsState = {
  questions: [],
  score: {},
  loading: false,
  error: null
};

const questionsSlice: Slice<QuestionsState> = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    fetchQuestionsStart(state: QuestionsState): void {
      state.loading = true;
      state.error = null;
    },
    fetchQuestionsSuccess(state: QuestionsState, action: PayloadAction<Question[]>): void {
      state.loading = false;
      state.questions = action.payload;
    },
    setScore(state: QuestionsState, action: PayloadAction<{ name: string, value: number }>): void {
      state.score = {...state.score, [action.payload.name]: action.payload.value};
    }
  }
});


export const {
  fetchQuestionsSuccess,
  setScore
} = questionsSlice.actions;

export const questionsReducer = questionsSlice.reducer;