import {decodeHTMLEntities} from "../utilas";
import {useDispatch} from "react-redux";
import {setScore} from "../store/quizStore.ts";

interface BooleanQuestionProps {
    question: string,
    correctAnswer: string,
    incorrectAnswers: ReadonlyArray<string>
}

export const BooleanQuestion = ({question, correctAnswer, incorrectAnswers}: BooleanQuestionProps) => {

    const dispatch = useDispatch();

    const handleScore = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const answer = formData.get('answer') as string;
        if (answer === correctAnswer) {
            dispatch(setScore(5));
        }
    };

    return (
        <div>
            <h3>{decodeHTMLEntities(question)}</h3>
            <form onSubmit={handleScore}>
                <input type="radio" name="answer" value={correctAnswer}/>
                <label htmlFor="true">{correctAnswer}</label>
                <input type="radio" name="answer" value={incorrectAnswers[0]}/>
                <label htmlFor="false">{incorrectAnswers[0]}</label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}