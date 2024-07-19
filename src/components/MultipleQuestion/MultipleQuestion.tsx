import {decodeHTMLEntities} from '../../utilas';
import {useDispatch} from 'react-redux';
import {setScore} from '../../store/quizStore.ts';
import {Question} from '../../types/quizTypes.ts';
import styles from './multipleQuestion.module.scss';

interface MultipleQuestionProps {
  question: Question;
  correctAnswer: string;
  incorrectAnswers: ReadonlyArray<string>;
}


export const MultipleQuestion = ({question, correctAnswer, incorrectAnswers}: MultipleQuestionProps) => {

  const answersPool: ReadonlyArray<string> = [...incorrectAnswers, correctAnswer];

  const dispatch = useDispatch();

  const handleScore = (question: Question, answer: string, correctAnswer: string) => {
    dispatch(setScore({name: question.question, value: answer === correctAnswer ? 10 : 0}));

  };

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
                    onClick={() => handleScore(question, answer, correctAnswer)}
                />
                {decodeHTMLEntities(answer)}
              </label>
          ))}
        </div>
      </div>
  );
};