import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../store';
import {MultipleQuestion} from './MultipleQuestion.tsx';
import {Question} from '../types/quizTypes.ts';
import {BooleanQuestion} from './BooleanQuestion.tsx';
import {decodeHTMLEntities} from '../utilas';

export const QuizQuestions: React.FC = () => {
  const {questions, loading, error} = useSelector((state: RootState) => state.questions);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
      <div>
        {questions.map((question: Question, index: number) => {
          return (
              <div key={index}>
                <h2>Question: {(question.category) ? decodeHTMLEntities(question.category) : ''}</h2>
                {(question.type === 'multiple') ?
                    <MultipleQuestion question={question} correctAnswer={question.correct_answer}
                                      incorrectAnswers={question.incorrect_answers}/> :
                    <BooleanQuestion question={question} correctAnswer={question.correct_answer}/>
                }
              </div>
          );
        })}
      </div>
  );
};


