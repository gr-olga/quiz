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
    const [categoryID, setCategory] = useState<number | undefined>(undefined);
    const [difficulty, setDifficulty] = useState<QuizLevel | undefined>(undefined);
    const [type, setType] = useState<QuestionType | undefined>(undefined);

    const [allCategories, setAllCategories] = useState<ReadonlyArray<QuizCategory>>();

    // Local state for form inputs
    const [formCategory, setFormCategory] = useState<number | undefined>(undefined);
    const [formDifficulty, setFormDifficulty] = useState<QuizLevel | undefined>(undefined);
    const [formType, setFormType] = useState<QuestionType | undefined>(undefined);

    useEffect(() => {
        fetchQuestions(categoryID, difficulty, type).then((data: Array<IQuestion>) => {
            console.log('dataApp', data);
            dispatch(fetchQuestionsSuccess(data));
        })

    }, [dispatch, categoryID, difficulty, type]);

    useEffect(() => {
        fetchCategories().then((data: ReadonlyArray<QuizCategory> | undefined) => setAllCategories(data));
    }, []);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setCategory(formCategory);
        setDifficulty(formDifficulty);
        setType(formType);
    };

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <h2>Select Category</h2>
                    <select onChange={(e) => setFormCategory(Number(e.target.value))}>
                        <option value="">Any Category</option>
                        {allCategories?.map((category: QuizCategory) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <h2>Select Difficulty</h2>
                    <select onChange={(e) => setFormDifficulty(e.target.value as QuizLevel)}>
                        <option value="">Any Difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                    <h2>Select Type</h2>
                    <select onChange={(e) => setFormType(e.target.value as QuestionType)}>
                        <option value="">Any Type</option>
                        <option value="multiple">Multiple Choice</option>
                        <option value="boolean">True/False</option>
                    </select>
                    <button type="submit">Start Quiz</button>
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
