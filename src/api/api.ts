import axios, {AxiosResponse} from 'axios';
import {IQuestion, QuestionType, QuizCategory, QuizLevel} from "../types/quizTypes.ts";

const BASE_URL = 'https://opentdb.com/api.php?amount=10';

export const fetchQuestions = async (category?: number, difficulty?: QuizLevel, type?: QuestionType,): Promise<IQuestion[]> => {
    try {
        const url = `${BASE_URL}${category ? `&category=${category}` : ''}${difficulty ? `&difficulty=${difficulty}` : ''}${type ? `&type=${type}` : ''}`;
        const res: AxiosResponse<{ results: IQuestion[] }> = await axios.get(url);
        return res.data.results;
    } catch (e) {
        console.log('Error:', e);
    }
}

export const fetchCategories = async () => {
    try {
        const res: AxiosResponse<{
            trivia_categories: ReadonlyArray<QuizCategory>
        }> = await axios.get('https://opentdb.com/api_category.php');
        console.log('api', res.data.trivia_categories);
        return res.data.trivia_categories;
    } catch (e) {
        console.log('Error:', e);
    }
}