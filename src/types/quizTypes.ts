export interface Question {
    type?: QuestionType;
    difficulty: QuizLevel,
    category: QuizCategory,
    question: string,
    correct_answer: string,
    incorrect_answers: Array<string>
}

export type QuestionType = 'multiple' | 'boolean';
export type QuizLevel = 'easy' | 'medium' | 'hard';

export interface QuizCategory {
    id: number,
    name: string
}