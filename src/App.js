import React from 'react';
import ReactDOM from 'react-dom';

const authToken = '3b502b3f-b1ff-4128-bd99-626e74836d9c';

const MoviesByRank = React.createClass({
  render() {
    return (
      <div>
        <a href='#' onClick={this.props.showMoviesByRank}>Show Top Ten Movies</a>
      </div>
    );
  }
});

const AllMovies = React.createClass({
  render() {
    return (
      <div>
        <a href='#' onClick={this.props.showAllMovies}>Show All Movies</a>
      </div>
    );
  }
});

const ResultItem = React.createClass({
  render() {
    return <tr><td><span className='title'>{this.props.movName}</span></td></tr>;
  }
});

const Results = React.createClass({
  render() {
    let resultItems;

    if (this.props.viewFormat === 'lessData') {
      resultItems = this.props.movies.map((mov, i) => {
        return (
          <tr key={i}>
            <td>{mov.Rank}</td>
            <td>{mov.Id}</td>
            <td><button>Buy Tix!</button></td>
            <td className='title'>{mov.Name}</td>
          </tr>
        );
      });
    }

    if (this.props.viewFormat === 'allData') {
      resultItems = this.props.movies.map((mov, i) => {
        return (
          <tr key={i}>
            <td>{mov.Rank}</td>
            <td>{mov.Id}</td>
            <td><button>Buy Tix!</button></td>
            <td className='title'>{mov.Name}</td>
            <td>{mov.Director}</td>
            <td>{mov.Description}</td>
            <td>{mov.Duration}</td>
            <td>{mov.Actors}</td>
          </tr>
        );
      });
    }

    return (
      <table>
        <thead>
          <tr className={this.props.viewFormat}>
            <td>Rank</td>
            <td>Id</td>
            <td></td>
            <td>Name</td>
            <td>Director</td>
            <td>Description</td>
            <td>Duration</td>
            <td>Actors</td>
          </tr>
        </thead>
        <tbody>
          {resultItems}
        </tbody>
      </table>
    );
  }
});

const App = React.createClass({
  getInitialState() {
    return {
      viewFormat: 'noData',
      movies: []
    }
  },

  componentDidMount() {
    this.showMoviesByRank();
  },

  showResults(movies) {
    movies.map(mov => mov.Name = mov.Name.toLowerCase());
    this.setState({ movies });
  },

  showMoviesByRank() {
    const rank = 1;
    const amount = 10;
    const url = `https://interview.zocdoc.com/api/1/FEE/MoviesByRank?startRankIndex=${rank}&numMovies=${amount}&authToken=${authToken}`

    this.setState({
      viewFormat: 'lessData',
      movies: []
    });

    this.makeRequest(url);
  },

  showAllMovies() {
    const url = `https://interview.zocdoc.com/api/1/FEE/AllMovies?authToken=${authToken}`;

    this.setState({
      viewFormat: 'allData',
      movies: []
    });

    this.makeRequest(url);
  },

  makeRequest(url) {
    return fetch(url).then(res => res.json()).then(json => this.showResults(json));
  },

  render() {
    return (
      <div>
        <MoviesByRank showMoviesByRank={this.showMoviesByRank} />
        <AllMovies showAllMovies={this.showAllMovies} />
        <Results movies={this.state.movies} viewFormat={this.state.viewFormat} />
      </div>
    );
  },
});

export default App;
