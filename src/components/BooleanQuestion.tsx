import {decodeHTMLEntities} from "../utilas";

interface BooleanQuestionProps {
    question: string,
    correctAnswer: ReadonlyArray<string>
}

export const BooleanQuestion = ({question, correctAnswer}: BooleanQuestionProps) => {
    return (
        <div>
            <h3>{decodeHTMLEntities(question)}</h3>
            <form>
                <input type="radio" name="answer" value="true" id="true"/>
                <label htmlFor="true">True</label>
                <input type="radio" name="answer" value="false" id="false"/>
                <label htmlFor="false">False</label>
            </form>
        </div>
    )
}