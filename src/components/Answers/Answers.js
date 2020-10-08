import React, { Component } from 'react'

class Answers extends Component {
  render() {
    let { hiddenAnswerSection, translation, userGuess, totalScore, currentWord } = this.props;
    let submissionResults = this.props.isCorrect
      ? <div>Good job!</div>
      : <div>better luck next time.</div>

    return (
      <div className={ `results${hiddenAnswerSection}` }>
        <section className="answers">
          <h3>{ submissionResults }</h3>
          <div>
            <p>The correct translation for { currentWord }
            is { translation }</p>
            <p>you chose { userGuess }</p>
          </div>
          <button onClick={ this.props.handleNext }>try another word.</button>
        </section>
      </div>
    );
  }
}

export default Answers;