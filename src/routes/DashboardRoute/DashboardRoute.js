import React, { Component } from 'react'
import LS from '../../services/languageService';
import LC from '../../contexts/LanguageContext';
require('./DashboardRoute.css');
class DashboardRoute extends Component {
  static contextType = LC;
  
  componentDidMount = async()=>
  {
    const langData = await LS.getLanguageData();
    this.context.setData(langData)
  }
  populatePracticeWords = ()=>
  {
    if(this.context.words)
    {
      const words = this.context.words;
      const html = [];
      for(const word of words)
      {
        console.log(word);
        html.push(<li key={word.id}>
                    <h4>{word.original}</h4>
                    <p>correct answer count: {word.correct_count}</p>
                    <p>incorrect answer count: {word.incorrect_count}</p>
                  </li>)
      }
      return html;
    }
  }
  render = ()=>{
    
    if(this.context.language)
    {
      const {name,total_score} = this.context.language;
      console.log(this.state);
      return (
        <section className="Dashboard">
          <h2>{name}</h2>
          <h2>Total correct answers: {total_score}</h2>
          <a href="/learn">Start practicing</a>
          <h3>Words to practice</h3>
          <ul>
            {this.populatePracticeWords()}
          </ul>
        </section>
      );
    }
    else
    {
      return(<section className="Dashboard">
        <h2>Error</h2>
      </section>)
    }
    
  }
}

export default DashboardRoute
