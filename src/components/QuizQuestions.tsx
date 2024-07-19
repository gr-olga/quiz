// import React from 'react';
// import {useSelector} from 'react-redux';
// import {RootState} from '../store';
// import {MultipleQuestion} from './MultipleQuestion.tsx';
// import {Question} from '../types/quizTypes.ts';
// import {BooleanQuestion} from './BooleanQuestion.tsx';
// import {decodeHTMLEntities} from '../utilas';
//
// export const QuizQuestions: React.FC = () => {
//   const {questions, loading, error} = useSelector((state: RootState) => state.questions);
//
//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;
//
//   return (
//       <div>
//         {questions.map((question: Question, index: number) => {
//           return (
//               <div key={index}>
//                 <h2>Question: {(question.category) ? decodeHTMLEntities(question.category) : ''}</h2>
//                 {(question.type === 'multiple') ?
//                     <MultipleQuestion question={question} correctAnswer={question.correct_answer}
//                                       incorrectAnswers={question.incorrect_answers}/> :
//                     <BooleanQuestion question={question} correctAnswer={question.correct_answer}/>
//                 }
//               </div>
//           );
//         })}
//       </div>
//   );
// };
//
//

import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {Button, Carousel} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {MultipleQuestion} from './MultipleQuestion.tsx';
import {BooleanQuestion} from './BooleanQuestion.tsx';
import {decodeHTMLEntities} from '../utilas';
import {Question} from '../types/quizTypes.ts';
import {RootState} from '../store';

export const QuizQuestions: React.FC = () => {
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
      <div>
        <Carousel activeIndex={index} onSelect={handleSelect}>
          {questions.map((question: Question, idx: number) => (
              <Carousel.Item key={idx}>
                <div>
                  <h2>Question: {question.category ? decodeHTMLEntities(question.category) : ''}</h2>
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
        <div className="carousel-controls">
          <Button variant="secondary" onClick={handlePrevious} disabled={index === 0}>
            Previous
          </Button>
          <Button variant="primary" onClick={handleNext} disabled={index === questions.length - 1}>
            Next
          </Button>
        </div>
      </div>
  );
};