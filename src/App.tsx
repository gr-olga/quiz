import styles from './App.module.scss';
import {QuizQuestions} from './components/QuizQuestions/QuizQuestions.tsx';
import {FormEvent, useEffect, useState} from 'react';
import {fetchCategories, fetchQuestions} from './api/api.ts';
import {fetchQuestionsSuccess, setScore} from './store/quizStore.ts';
import {AppDispatch, RootState} from './store';
import {useDispatch, useSelector} from 'react-redux';
import {Question, QuestionType, QuizCategory, QuizLevel} from './types/quizTypes.ts';
import {PopUpScore} from './components/PopUpScore/PopUpScore.tsx';

function App() {

  const dispatch: AppDispatch = useDispatch();

  const [categoryID, setCategory] = useState<number | undefined>(undefined);
  const [difficulty, setDifficulty] = useState<QuizLevel | undefined>(undefined);
  const [type, setType] = useState<QuestionType | undefined>(undefined);

  const [allCategories, setAllCategories] = useState<ReadonlyArray<QuizCategory>>();

  const [formCategory, setFormCategory] = useState<number | undefined>(undefined);
  const [formDifficulty, setFormDifficulty] = useState<QuizLevel | undefined>(undefined);
  const [formType, setFormType] = useState<QuestionType | undefined>(undefined);

  useEffect((): void => {
    fetchQuestions(categoryID, difficulty, type).then((data: ReadonlyArray<Question>): void => {
      // console.log('Questions:', data);
      dispatch(fetchQuestionsSuccess(data));
    });

  }, [dispatch, categoryID, difficulty, type]);


  useEffect((): void => {
    fetchCategories().then((data: ReadonlyArray<QuizCategory> | undefined) => setAllCategories(data));
  }, []);


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setCategory(formCategory);
    setDifficulty(formDifficulty);
    setType(formType);
    setScore(0);
  };

  const currentQuestion: number = useSelector((state: RootState) => Object.keys(state.questions.score).length);
  const questionsCount: number = useSelector((state: RootState) => state.questions.questions.length);

  const score: number = useSelector((state: RootState) => {
    return Object.values(state.questions.score).reduce((acc: number, curr: unknown) => acc + Number(curr), 0);
  });

  const isDone: boolean = (currentQuestion === questionsCount) && (questionsCount !== 0);

  return (
      <div className={styles.app}>
        <div className={styles.appContainer}>
          <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div className={styles.selectContainer}>
              <h2 className={styles.formTitle}>Select Category</h2>
              <select onChange={(e) => setFormCategory(Number(e.target.value))} className={styles.formSelect}>
                <option value="">Any Category</option>
                {allCategories?.map((category: QuizCategory) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                ))}
              </select>
            </div>
            <div className={styles.selectContainer}>
              <h2 className={styles.formTitle}>Select Difficulty</h2>
              <select onChange={(e) => setFormDifficulty(e.target.value as QuizLevel)} className={styles.formSelect}>
                <option value="">Any Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div className={styles.selectContainer}>
              <h2 className={styles.formTitle}>Select Type</h2>
              <select onChange={(e) => setFormType(e.target.value as QuestionType)} className={styles.formSelect}>
                <option value="">Any Type</option>
                <option value="multiple">Multiple Choice</option>
                <option value="boolean">True/False</option>
              </select>
            </div>
            <button type="submit" className={styles.formButton}>Start Quiz</button>
          </form>
        </div>
        { isDone ? <PopUpScore score={score} onClose={() => window.location.reload()}/> : null }
        <div>
          <h1>Quiz</h1>
          <div>Question {currentQuestion >= 10 ? 10 : currentQuestion + 1}/{questionsCount}</div>
          {<div>Score: {score}</div>}
          <QuizQuestions/>
        </div>
      </div>
  );
}

export default App;
