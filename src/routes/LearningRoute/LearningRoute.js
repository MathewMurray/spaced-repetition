import React, { Component } from 'react'
import LS from '../../services/languageService'

class LearningRoute extends Component {
  state = {}

  componentDidMount = async () => {
    const wordData = await LS.getWordsData();
    this.setState(wordData)
  }

  renderWord = () => {
    if (this.state.words) {
      const words = this.state.words;
      const html = [];
      for (const word of words) {
        console.log(word);
        html.push(<li key={ word.id }>
          <h4>{ word.original }</h4>
          <p>correct answer count: { word.correct_count }</p>
        </li>)
      }
      return html;
    }
  }

  render() {
    return (
      <section>
        {this.renderWord() }
      </section>
    );
  }
}

export default LearningRoute
