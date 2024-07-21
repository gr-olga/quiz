import {decodeHTMLEntities} from '../../utilas';
import {Question} from '../../types/quizTypes.ts';
import styles from './booleanQuestion.module.scss';

interface BooleanQuestionProps {
  question: Question;
  correctAnswer: string;
  onAnswered: (answer: string) => void;
}

export const BooleanQuestion = ({question, onAnswered}: BooleanQuestionProps) => {

  const handleScore = (answer: string): void => onAnswered(answer);

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
                onClick={() => handleScore('True')}
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
                onClick={() => handleScore('False')}
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