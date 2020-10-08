//import { faJournalWhills } from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react'
import LS from '../../services/languageService'
import Answers from '../../components/Answers/Answers'
import GuessForm from '../../components/GuessForm/GuessForm';
class LearningRoute extends Component {
  constructor (props) {
    super(props);
    this.state = {
      originalWord: {},
      didSubmit: false,
      rightAnswer: '',
      userAnswer: '',
      isCorrect: null,
      totalScore: 0
    }
  }

  getWord = async () => {
    const data = await LS.getWordsData();
    this.setState({ originalWord: data, didSubmit:false });


  }

  componentDidMount() {
    return this.getWord()
  }

  handleSubmit = async ev => {
    ev.preventDefault();

    let { guess } = ev.target;
    guess = guess.value;
    ev.target.guess.value = "";

    const data = await LS.postGuess(guess, this.state.originalWord);
    
    this.setState({
      didSubmit: true,
      rightAnswer: data.answer,
      userAnswer: guess,
      isCorrect: data.isCorrect,
      totalScore: data.totalScore
    })
  }

  handleNext = () => {
    this.setState({
      didSubmit: false
    })
    return this.getWord();
  }

  render = () => {
    console.log(this.state)
    let currentWord = this.state.originalWord ? this.state.originalWord.nextWord : '';
    console.log(this.state);
    console.log(this.state);
    let translation = this.state.didSubmit ? this.state.rightAnswer : '';
    let userGuess = this.state.didSubmit
      ? <span>{ this.state.userAnswer }</span>
      : '';
    let totalScore = this.state.originalWord ? this.state.originalWord.totalScore : '';
    let correctlyAnswered = this.state.originalWord ? this.state.originalWord.wordCorrectCount : '';
    let incorrectlyAnswered = this.state.originalWord ? this.state.originalWord.wordIncorrectCount : '';
    let hiddenAnswerSection = !this.state.didSubmit ? 'hidden' : '';
    return (
      <section className='learn'>
        <section className="word">
          <h1>Translate the word:</h1>
          <span className="currentWord">{ currentWord }</span>
          <div className="DisplayScore">
            <p>Your total score is: { totalScore }</p>
          </div>
          
        </section>
        
        <GuessForm submitted={this.state.didSubmit} submitHandler={this.handleSubmit}/>
        <section className="results">
          <Answers
            hiddenAnswerSection={ hiddenAnswerSection }
            userGuess={ userGuess }
            translation={ translation }
            totalScore={ totalScore }
            handleNext={ this.handleNext }
            currentWord={ currentWord }
            isCorrect={ this.state.isCorrect }
          />
        </section>
        <section className="score">
          <p>You have answered this word correctly { correctlyAnswered } times.</p>
          <p>You have answered this word incorrectly { incorrectlyAnswered } times.</p>
        </section>
      </section>
    );
  }
}

export default LearningRoute
