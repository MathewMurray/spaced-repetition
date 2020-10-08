import React, { Component } from 'react'

class Answers extends Component {
  render() {
    let { hiddenAnswerSection, translation, userGuess, totalScore, currentWord } = this.props;
    let submissionResults = this.props.isCorrect
      ? <h2>Good try, but not quite right :(</h2>
      : <h2>Good try, but not quite right :(</h2>
      console.log(translation);
    return (
      <div className={ `results${hiddenAnswerSection}` }>
        <section className="answers">
          <span>{ submissionResults }</span>
          <div className="DisplayFeedback">
            <p>The correct translation for { currentWord } was { translation } and you chose { userGuess }!</p>
          </div>
          <button onClick={ this.props.handleNext }>Try another word!</button>
        </section>
      </div>
    );
  }
}

export default Answers;