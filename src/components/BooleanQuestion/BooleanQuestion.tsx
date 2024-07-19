import {decodeHTMLEntities} from '../../utilas';
import {useDispatch} from 'react-redux';
import {setScore} from '../../store/quizStore.ts';
import {Question} from '../../types/quizTypes.ts';
import styles from './booleanQuestion.module.scss';

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
      <div className={`${styles.questionContainer} container`}>
        <h3 className={`${styles.questionTitle} display-4`}>{decodeHTMLEntities(question.question)}</h3>
        <div className={styles.answersContainer}>
          <div className="form-check">
            <input
                className={styles.answerInput}
                type="radio"
                name={`answer-${question.question}`}
                value="True"
                id={`true-${question.question}`}
                onClick={() => handleScore(question, 'True', correctAnswer)}
            />
            <label
                className={`${styles.answerLabel} form-check-label`}
                htmlFor={`true-${question.question}`}
            >
              <span className={styles.customRadio}></span> True
            </label>
          </div>
          <div className="form-check">
            <input
                className={styles.answerInput}
                type="radio"
                name={`answer-${question.question}`}
                value="False"
                id={`false-${question.question}`}
                onClick={() => handleScore(question, 'False', correctAnswer)}
            />
            <label
                className={`${styles.answerLabel} form-check-label`}
                htmlFor={`false-${question.question}`}
            >
              <span className={styles.customRadio}></span> False
            </label>
          </div>
        </div>
      </div>
  );
};