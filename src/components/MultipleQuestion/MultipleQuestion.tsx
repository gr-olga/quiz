import {decodeHTMLEntities} from '../../utilas';
import {Question} from '../../types/quizTypes.ts';
import styles from './multipleQuestion.module.scss';

interface MultipleQuestionProps {
  question: Question;
  correctAnswer: string;
  incorrectAnswers: ReadonlyArray<string>;
  onAnswered: (answer: string) => void;
}

export const MultipleQuestion = ({question, correctAnswer, incorrectAnswers, onAnswered}: MultipleQuestionProps) => {
  const answersPool: ReadonlyArray<string> = [...incorrectAnswers, correctAnswer];
  const handleScore = (answer: string): void => onAnswered(answer);

  return (
      <div className={styles.questionContainer}>
        <h3 className={styles.questionTitle}>{decodeHTMLEntities(question.question)}</h3>
        <div className={styles.answersContainer}>
          {answersPool.map((answer: string, index: number) => (
              <label key={index} className={styles.answerLabel}>
                <input
                    type="radio"
                    name={`answer_${question.question}`}
                    value={answer}
                    className={styles.answerInput}
                    onClick={() => handleScore(answer)}
                />
                {decodeHTMLEntities(answer)}
              </label>
          ))}
        </div>
      </div>
  );
};