import {useState, useCallback} from 'react';

import QUESTIONS from '../question.js';
import quizCompleteImage from '../assets/quiz-complete.png';
import QuestionTimer from '../components/QuestionTimer.jsx';


export default function Quiz(){
    const [userAnswers, setUserAnswers] = useState([]);
    const [answerState, setAnswerState] = useState('');

    const activeQuestionIndex =  answerState === '' ?  userAnswers.length : userAnswers.length -1;


    const quizIsCompleted = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer (selectedAnswer){
        setAnswerState('answered');
        setUserAnswers((prevUserAnswers)=>{
            return [...prevUserAnswers, selectedAnswer];
        });

        setTimeout(()=>{
            if(selectedAnswer === QUESTIONS[activeQuestionIndex].answer[0]){  
                setAnswerState('correct');
            }else{
                setAnswerState('wrong');
            }
            setTimeout(()=>{
                setAnswerState('');
            },2000);
        },1000);
    },[activeQuestionIndex]);

    const handleSkipAnswer = useCallback(()=> handleSelectAnswer(null),[handleSelectAnswer]);

    if(quizIsCompleted){
        return(
            <div id='summary'>
                <img src={quizCompleteImage} alt="quiz complete logo"/>
                <h2>Quiz Completed</h2> 
            </div>
        );
    }
    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort((a, b)=> Math.random() - 0.5);

    return(
        
        <div id="quiz">
            <div id="question">
            <QuestionTimer 
            key={activeQuestionIndex}
            timeout={10000} 
            onTimeOut={handleSkipAnswer}/>
            <h1>{QUESTIONS[activeQuestionIndex].text}</h1>
            <ul id="answers">
                {shuffledAnswers.map((answer)=>{

                    const isSelected = userAnswers[userAnswers.length - 1] === answer;
                    let cssClass = ''; 

                    if(answerState === 'answered' && isSelected) {
                        cssClass = 'selected'
                    }

                    if(answerState === 'correct' || answerState === 'wrong' && isSelected) {
                        cssClass = answerState;
                    } 
                    return <li key={answer} className="answer">
                        <button 
                        onClick={()=> handleSelectAnswer(answer)} className={cssClass}>
                            {answer}
                        </button>
                    </li>
                })}
            </ul>
            </div>
        </div>
        
        
    );
}