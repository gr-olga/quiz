import axios, {AxiosResponse} from 'axios';
import {Question, QuestionType, QuizCategory, QuizLevel} from '../types/quizTypes.ts';

const BASE_URL = 'https://opentdb.com/api.php?amount=10';

export const fetchQuestions = async (category?: number, difficulty?: QuizLevel, type?: QuestionType): Promise<ReadonlyArray<Question>> => {
  const url: string = `${BASE_URL}${category ? `&category=${category}` : ''}${difficulty ? `&difficulty=${difficulty}` : ''}${type ? `&type=${type}` : ''}`;
  const res: AxiosResponse<{ results: Question[] }> = await axios.get(url);
  return res.data.results;
};

export const fetchCategories = async (): Promise<ReadonlyArray<QuizCategory>> => {
  const res: AxiosResponse<{
    trivia_categories: ReadonlyArray<QuizCategory>
  }> = await axios.get('https://opentdb.com/api_category.php');
  console.log('api', res.data.trivia_categories);
  return res.data.trivia_categories;
};