import './App.css'
import {QuestionsComponent} from "./components/QuizQuestions.tsx";
import {useEffect} from "react";
import {fetchQuestions} from "./api/api.ts";
import {fetchQuestionsSuccess} from "./store/quizStore.ts";
import {AppDispatch} from "./store";
import {useDispatch} from "react-redux";
import {IQuestion} from "./types/quizTypes.ts";

function App() {
    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
        fetchQuestions( undefined,undefined, 'multiple').then((data: ReadonlyArray<IQuestion>) => {
            console.log('data', data);
            dispatch(fetchQuestionsSuccess(data));
        })

    }, [dispatch]);

    return (
        <>
            <h1>Quiz</h1>
            <QuestionsComponent/>
        </>
    )
}

export default App
