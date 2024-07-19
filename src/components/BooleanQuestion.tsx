import {decodeHTMLEntities} from '../utilas';
import {useDispatch} from 'react-redux';
import {setScore} from '../store/quizStore.ts';
import {FormEvent} from 'react';

interface BooleanQuestionProps {
  question: string,
  correctAnswer: string,
  incorrectAnswers: ReadonlyArray<string>
}

export const BooleanQuestion = ({question, correctAnswer, incorrectAnswers}: BooleanQuestionProps) => {

  const dispatch = useDispatch();

  const handleScore = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const answer = formData.get('answer') as string;
    if (answer === correctAnswer) {
      dispatch(setScore(5));
    }
  };

  return (
      <div>
        <h3>{decodeHTMLEntities(question)}</h3>
        <form onSubmit={handleScore}>
          <label>
            <input type="radio" name="answer" value={correctAnswer}/>
            <span>{correctAnswer}</span>
          </label>
          <label>
            <input type="radio" name="answer" value={incorrectAnswers[0]}/>
            <span>{incorrectAnswers[0]}</span>
          </label>
          <button type="submit">Submit</button>
          <br/>
        </form>
      </div>
  );
};