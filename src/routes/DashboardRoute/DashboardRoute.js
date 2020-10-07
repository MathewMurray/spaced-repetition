import React, { Component } from 'react'
import LS from '../../services/languageService';
require('./DashboardRoute.css');
class DashboardRoute extends Component {
  state = {

  }
  componentDidMount = async () => {
    const langData = await LS.getLanguageData();
    this.setState(langData);
  }
  populatePracticeWords = () => {
    if (this.state.words) {
      const words = this.state.words;
      const html = [];
      for (const word of words) {
        console.log(word);
        html.push(<li key={ word.id }>
          <h4>{ word.original }</h4>
          <p>correct answer count: { word.correct_count }</p>
          <p>incorrect answer count: { word.incorrect_count }</p>
        </li>)
      }
      return html;
    }
  }
  render = () => {

    if (this.state.language) {
      const { name, user_id, id, head, total_score } = this.state.language;
      console.log(this.state);
      return (
        <section className="Dashboard">
          <h2>{ name }</h2>
          <h2>Total correct answers: { total_score }</h2>
          <a href="/learn">Start practicing</a>
          <h3>Words to practice</h3>
          <ul>
            { this.populatePracticeWords() }
          </ul>
        </section>
      );
    }
    else {
      return (<section className="Dashboard">
        <h2>Error</h2>
      </section>)
    }

  }
}

export default DashboardRoute
