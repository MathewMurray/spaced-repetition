//import { faJournalWhills } from '@fortawesome/free-solid-svg-icons';
import React, { Component } from 'react'
import LS from '../../services/languageService'

class LearningRoute extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currentWord: {},
      didSubmit: false,
      totalScore: 0
    }
  }

  componentDidMount = async () => {
    return this.getWord()
  }

  getWord() {
    LS.getWordsData()
      .then(res => {
        return res;
      })
      .then(res => {
        this.setState({ currentWord: res });
      })
      .catch(error => console.error(error));
  }

  handleSubmit = ev => {
    ev.preventDefault();
    let { guess } = ev.target;
    guess = guess.value;
    LS.postGuess(guess, this.state.currentWord.id)
      .then(res => res.json())
      .then(res => {
        this.setState({
          didSubmit: true,
          totalScore: res.totalScore
        })
      })
      .catch(error => console.log(error))
  }

  // handleNext = () => {
  //   this.setState({
  //     didSubmit: false
  //   })
  //   return this.getWord();
  // }

  render() {
    let currentWord = this.state.currentWord;
    console.log(this.state);
    let translation = this.state.didSubmit;
    let userGuess = this.state.didSubmit
      ? <span>{ this.state.userAnswer }</span>
      : '';
    let totalScore = this.state.currentWord ? this.state.currentWord.totalScore : '';
    return (
      <section>
        <h2>Translate the word:</h2>
        <span>{ currentWord[0] }</span>
        <p>Your total score is: { totalScore }</p>
        <form onSubmit={ this.handleSubmit }>
          <fieldset>
            <legend>Guess:</legend>
            <label>whats the translation for this word?</label>
            <input name='guess' required></input>
            <button type='submit'>Submit your answer</button>
          </fieldset>
        </form>
      </section>
    );
  }
}

export default LearningRoute
