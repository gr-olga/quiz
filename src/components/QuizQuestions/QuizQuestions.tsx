import {useSelector} from 'react-redux';
import {Button, Carousel} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {MultipleQuestion} from '../MultipleQuestion.tsx';
import {BooleanQuestion} from '../BooleanQuestion/BooleanQuestion.tsx';
import {decodeHTMLEntities} from '../../utilas';
import {Question} from '../../types/quizTypes.ts';
import {RootState} from '../../store';
import styles from './quizQuestions.module.scss';
import {useState} from 'react';

export const QuizQuestions = () => {
  const {questions, loading, error} = useSelector((state: RootState) => state.questions);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  const handleNext = () => {
    if (index < questions.length - 1) {
      setIndex(index + 1);
    }
  };

  const handlePrevious = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
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
                      />
                  ) : (
                      <BooleanQuestion question={question} correctAnswer={question.correct_answer}/>
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
              disabled={index === questions.length - 1}
          >
            Next
          </Button>
        </div>
      </div>
  );
};