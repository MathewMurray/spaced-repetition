import React, { Component } from 'react'
require('./NotFoundRoute.css');
class NotFoundRoute extends Component {
  render() {
    return (
      <section className="notFound">
        <h2>404 - Page not found</h2>
        <p>Woah there, you just discovered a quantum tunnel into nothingness. Good job, I guess..</p>
      </section>
    );
  }
}

export default NotFoundRoute
