import { faJournalWhills } from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react'
import LS from '../../services/languageService'
import Answers from '../../components/Answers/Answers'
import GuessForm from '../../components/GuessForm/GuessForm';
require('./LearningRoute.css')
class LearningRoute extends Component {
  constructor (props) {
    super(props);
    this.state = {
      originalWord: "",
      didSubmit: false,
      rightAnswer: '',
      userAnswer: '',
      isCorrect: null,
      totalScore: 0
    }
  }

  getWord = async (nextButton = false) => {
    const data = await LS.getWordsData();
    if (data) {
      const { nextWord, wordCorrectCount, wordIncorrectCount, totalScore } = data;
      if (nextButton) {
        this.setState({ wordCorrectCount: wordCorrectCount, wordIncorrectCount: wordIncorrectCount });
      }
      else {
        this.setState({ originalWord: nextWord, wordCorrectCount: wordCorrectCount, wordIncorrectCount: wordIncorrectCount, totalScore: totalScore });
      }

    }
    else {
      throw new Error("Database returned nothing.");
    }
  }

  componentDidMount() {
    this.getWord()
  }

  handleSubmit = async ev => {
    ev.preventDefault();

    let { guess } = ev.target;
    guess = guess.value;
    ev.target.guess.value = "";

    const data = await LS.postGuess(guess, this.state.originalWord);
    this.setState({
      nextWord: data.nextWord,
      didSubmit: true,
      rightAnswer: data.answer,
      userAnswer: guess,
      isCorrect: data.isCorrect,
      totalScore: data.totalScore,
      wordIncorrectCount: data.wordIncorrectCount,
      wordCorrectCount: data.wordCorrectCount
    })
  }

  handleNext = async () => {
    this.getWord(1);

    this.setState({
      didSubmit: false,
      originalWord: this.state.nextWord
    })
  }

  render = () => {


    if (this.state) {
      const { originalWord, totalScore, wordCorrectCount, wordIncorrectCount, didSubmit, userAnswer, rightAnswer, isCorrect, nextWord } = this.state;

      return (
        <section className='learn'>
          <section className="word">
            <div className="DisplayScore">
              <p>Your total score is: { totalScore }</p>
            </div>
          </section>

          <GuessForm totalScore={ totalScore } currentWord={ originalWord } submitted={ didSubmit } submitHandler={ this.handleSubmit } />
          <section className="results">
            <Answers
              submitted={ didSubmit }
              userGuess={ userAnswer }
              translation={ rightAnswer }
              totalScore={ totalScore }
              handleNext={ this.handleNext }
              currentWord={ originalWord }
              isCorrect={ isCorrect }
            />
          </section>
          <section className="score">
            <p>You have answered this word correctly { wordCorrectCount } times.</p>
            <p>You have answered this word incorrectly { wordIncorrectCount } times.</p>
          </section>
        </section>
      );

    }
    else {
      return <></>
    }
  }
}

export default LearningRoute
