import {decodeHTMLEntities} from '../utilas';
import {useDispatch} from 'react-redux';
import {setScore} from '../store/quizStore.ts';
import {FormEvent} from 'react';

interface MultipleQuestionProps {
  question: string;
  correctAnswer: string;
  incorrectAnswers: ReadonlyArray<string>;
}


export const MultipleQuestion = ({question, correctAnswer, incorrectAnswers}: MultipleQuestionProps) => {

  const answersPool: ReadonlyArray<string> = [...incorrectAnswers, correctAnswer];

  const dispatch = useDispatch();

  const handleScore = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const answer = formData.get('answer') as string;
    if (answer === correctAnswer) {
      dispatch(setScore(10));
    }
  };

  return (
      <div>
        <h3>{decodeHTMLEntities(question)}</h3>
        <form onSubmit={handleScore}>
          {answersPool.map((answer: string, index: number) => (
              <label key={index}>
                <input type="radio" name="answer" value={answer}/>
                {answer}
              </label>
          ))}
          <button type="submit">Submit</button>
        </form>
      </div>
  );
};