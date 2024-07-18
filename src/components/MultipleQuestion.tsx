import {decodeHTMLEntities} from "../utilas";

interface MultipleQuestionProps {
    question: string;
    correctAnswer: string;
    incorrectAnswers: ReadonlyArray<string>;
}


export const MultipleQuestion = ({question, correctAnswer, incorrectAnswers}: MultipleQuestionProps) => {
    const answersPool: ReadonlyArray<string> = [...incorrectAnswers, correctAnswer];
    return (
        <div>
            <h3>{decodeHTMLEntities(question)}</h3>
            <form>
                {answersPool.map((answer: string, index: number) => (
                    <label key={index}>
                        <input type="radio" name="answer" value={answer}/>
                        {answer}
                    </label>
                ))}
            </form>
        </div>
    );
};