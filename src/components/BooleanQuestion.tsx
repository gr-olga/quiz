import {decodeHTMLEntities} from '../utilas';
import {useDispatch} from 'react-redux';
import {setScore} from '../store/quizStore.ts';
import {Question} from '../types/quizTypes.ts';

interface BooleanQuestionProps {
  question: Question,
  correctAnswer: string,
}

export const BooleanQuestion = ({question, correctAnswer}: BooleanQuestionProps) => {

  const dispatch = useDispatch();

  const handleScore = (question: Question, answer: string, correctAnswer: string) => {
    dispatch(setScore({name: question.question, value: answer === correctAnswer ? 5 : 0}));
  };

  return (
      <div>
        <h3>{decodeHTMLEntities(question.question)}</h3>
        {/*<form onSubmit={handleScore}>*/}
        <label>
          <input type="radio" name="answer" value="True"
                 onClick={() => handleScore(question, 'True', correctAnswer)}/>
          <span>True</span>
        </label>
        <label>
          <input type="radio" name="answer" value="False"
                 onClick={() => handleScore(question, 'False', correctAnswer)}/>
          <span>False</span>
        </label>
        {/*<button type="submit">Submit</button>*/}
        {/*<br/>*/}
        {/*</form>*/}
      </div>
  );
};