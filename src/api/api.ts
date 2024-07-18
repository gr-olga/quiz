import axios, {AxiosResponse} from 'axios';
import {IQuestion, QuestionType, QuizLevel} from "../types/quizTypes.ts";

const BASE_URL = 'https://opentdb.com/api.php?amount=10';

export const fetchQuestions = async (category?: number, difficulty?: QuizLevel, type?: QuestionType,): Promise<IQuestion[]> => {
    try {
        const url = `${BASE_URL}${category ? `&category=${category}` : ''}${difficulty ? `&difficulty=${difficulty}` : ''}${type ? `&type=${type}` : ''}`;
        const res: AxiosResponse<{ results: IQuestion[] }> = await axios.get(url);
        console.log('api', res.data);
        return res.data.results;
    } catch (e) {
        console.log('Error:', e);
    }
}