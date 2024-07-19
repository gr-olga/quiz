import {decodeHTMLEntities} from '../utilas';
import {useDispatch} from 'react-redux';
import {setScore} from '../store/quizStore.ts';
import {Question} from '../types/quizTypes.ts';

interface MultipleQuestionProps {
  question: Question;
  correctAnswer: string;
  incorrectAnswers: ReadonlyArray<string>;
}


export const MultipleQuestion = ({question, correctAnswer, incorrectAnswers}: MultipleQuestionProps) => {

  const answersPool: ReadonlyArray<string> = [...incorrectAnswers, correctAnswer];

  const dispatch = useDispatch();

  const handleScore = (question: Question, answer: string, correctAnswer: string) => {
    // e.preventDefault();
    // const formData = new FormData(e.currentTarget);
    // const answer = formData.get('answer') as string;
    // if (answer === correctAnswer) {
    //   dispatch(setScore(10));
      dispatch(setScore({name: question.question, value: answer === correctAnswer ? 10 : 0}));
    // }
  };

  return (
      <div>
        <h3>{decodeHTMLEntities(question.question)}</h3>
        {/*<form onSubmit={handleScore}>*/}
          {answersPool.map((answer: string, index: number) => (
              <label key={index}>
                <input type="radio" name={`answer_${question.question}`} value={answer} onClick={() => handleScore(question, answer, correctAnswer)}/>
                {answer}
              </label>
          ))}
          {/*<button type="submit">Submit</button>*/}
        {/*</form>*/}
      </div>
  );
};