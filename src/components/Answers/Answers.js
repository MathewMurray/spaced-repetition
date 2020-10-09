import React, { Component } from 'react'

class Answers extends Component {
  render = () => {

    let { submitted, hiddenAnswerSection, translation, userGuess, currentWord } = this.props;
    let submissionResults = this.props.isCorrect
      ? <h2>You were correct! :D</h2>
      : <h2>Good try, but not quite right :(</h2>
    console.log(translation);
    if (submitted) {
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
    } else {
      return (
        <></>
      )
    }
  }
}

export default Answers;