import {useDispatch, useSelector} from 'react-redux';
import {Button, Carousel} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {MultipleQuestion} from '../MultipleQuestion/MultipleQuestion.tsx';
import {BooleanQuestion} from '../BooleanQuestion/BooleanQuestion.tsx';
import {decodeHTMLEntities} from '../../utilas';
import {Question} from '../../types/quizTypes.ts';
import {RootState} from '../../store';
import styles from './quizQuestions.module.scss';
import {useState} from 'react';
import {setScore} from '../../store/quizStore.ts';

export const QuizQuestions = () => {
  const {questions, loading, error} = useSelector((state: RootState) => state.questions);
  const [index, setIndex] = useState(0);

  const dispatch = useDispatch();

  const handleSelect = (selectedIndex: number) => setIndex(selectedIndex);

  const handleNext = () => {
    if (index < questions.length - 1) setIndex(index + 1);
    dispatch(setScore({name: currentAnswer.question, value: currentAnswer.scoreValue}));
  };

  const scoreValueMultiple: number = 10;
  const scoreValueBoolean: number = 5;

  const currentAnswer = {
    question: '',
    scoreValue: 0
  };

  const onAnswered = (question: Question, answer: string, correctAnswer: string, scoreValue: number): void => {
    currentAnswer.question = question.question;
    currentAnswer.scoreValue = answer === correctAnswer ? scoreValue : 0;
  };

  const handlePrevious = () => {
    if (index > 0) setIndex(index - 1);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
      <div className={styles.carouselWrapper}>
        <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
          {questions.map((question: Question, idx: number) => (
              <Carousel.Item key={idx}>
                <div className={styles.questionContainer}>
                  <h2 className={styles.questionTitle}>
                    {question.category ? decodeHTMLEntities(question.category) : ''}
                  </h2>
                  {question.type === 'multiple' ? (
                      <MultipleQuestion
                          question={question}
                          correctAnswer={question.correct_answer}
                          incorrectAnswers={question.incorrect_answers}
                          onAnswered={(answer: string) => onAnswered(question, answer, question.correct_answer, scoreValueMultiple)}
                      />
                  ) : (
                      <BooleanQuestion
                          question={question}
                          correctAnswer={question.correct_answer}
                          onAnswered={(answer: string) => onAnswered(question, answer, question.correct_answer, scoreValueBoolean)}
                      />
                  )}
                </div>
              </Carousel.Item>
          ))}
        </Carousel>
        <div className={styles.controlWrapper}>
          <Button
              className={styles.styledButton}
              variant="secondary"
              onClick={handlePrevious}
              disabled={index === 0}
          >
            Previous
          </Button>
          <Button
              className={styles.styledButton}
              variant="primary"
              onClick={handleNext}
              disabled={index === questions.length}
          >
            Next
          </Button>
        </div>
      </div>
  );
};