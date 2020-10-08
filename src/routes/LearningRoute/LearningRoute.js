//import { faJournalWhills } from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react'
import LS from '../../services/languageService'
import Answers from '../../components/Answers/Answers'

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
    this.setState({ originalWord: data });


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
    console.log(data)
    this.setState({
      didSubmit: true,
      rightAnswer: data.translation,
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
    let translation = this.state.didSubmit ? this.state.rightAnswer : '';
    let userGuess = this.state.didSubmit
      ? <span className={ this.state.isCorrect }>{ this.state.userAnswer }</span>
      : '';
    let totalScore = this.state.originalWord ? this.state.originalWord.totalScore : '';
    let correctlyAnswered = this.state.originalWord ? this.state.originalWord.wordCorrectCount : '';
    let incorrectlyAnswered = this.state.originalWord ? this.state.originalWord.wordIncorrectCount : '';
    let hiddenSubmission = this.state.didSubmit ? 'hidden' : '';
    let hiddenAnswerSection = !this.state.didSubmit ? 'hidden' : '';
    return (
      <section className='learn'>
        <section className="word">
          <h2>Translate the word:</h2>
          <span className="currentWord">{ currentWord }</span>
          <p className="DisplayScore p">Your total score is : { totalScore }</p>
        </section>
        <form onSubmit={ this.handleSubmit }>
          <fieldset className={ `form ${hiddenSubmission}` }>
            <legend className="legend">Guess:</legend>
            <label for="learn-guess-input">What's the translation for this word?</label>
            <input name='guess' id="learn-guess-input" type="text" required></input>
            <button type='submit'>Submit your answer</button>
          </fieldset>
        </form>
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
