import './App.css'
import {QuestionsComponent} from "./components/QuizQuestions.tsx";
import {useEffect, useState} from "react";
import {fetchCategories, fetchQuestions} from "./api/api.ts";
import {fetchQuestionsSuccess} from "./store/quizStore.ts";
import {AppDispatch} from "./store";
import {useDispatch} from "react-redux";
import {IQuestion, QuestionType, QuizCategory, QuizLevel} from "./types/quizTypes.ts";

function App() {
    const dispatch: AppDispatch = useDispatch();
    const [category, setCategory] = useState<number | undefined>(undefined);
    const [difficulty, setDifficulty] = useState<QuizLevel | undefined>(undefined);
    const [type, setType] = useState<QuestionType | undefined>(undefined);

    const [allCategories, setAllCategories] = useState<ReadonlyArray<QuizCategory>>([]);

    useEffect(() => {
        fetchQuestions(category, difficulty, type).then((data: ReadonlyArray<IQuestion>) => {
            console.log('dataApp', data);
            dispatch(fetchQuestionsSuccess(data));
        })

    }, [dispatch, category, difficulty, type]);

    useEffect(() => {
        fetchCategories().then((data) => setAllCategories(data));
    }, []);


    return (
        <>
            <div>
                <form onSubmit={}>
                    <h2>Select Category</h2>
                    <select onChange={(e) => setCategory(e.target.value as number)}>
                        <option value={undefined}>Any Category</option>
                        {allCategories.map((category: QuizCategory) => <option key={category.id}
                                                                               value={category.id}>{category.name}</option>)}
                    </select>
                    <h2>Select Difficulty</h2>
                    <select onChange={(e) => setDifficulty(e.target.value as QuizLevel)}>
                        <option value={undefined}>Any Difficulty</option>
                        <option value='easy'>Easy</option>
                        <option value='medium'>Medium</option>
                        <option value='hard'>Hard</option>
                    </select>
                    <h2>Select Type</h2>
                    <select onChange={(e) => setType(e.target.value as QuestionType)}>
                        <option value={undefined}>Any Type</option>
                        <option value='multiple'>Multiple Choice</option>
                        <option value='boolean'>True/False</option>
                    </select>
                    <button type='submit'>Start Quiz</button>
                </form>
            </div>
            <div>
                <h1>Quiz</h1>
                <QuestionsComponent/>
            </div>
        </>
    )
}

export default App
