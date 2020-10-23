import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import fetchMovies from "../../actions/fetchMovies";
import Header from "../../components/Header/index";
import SearchBar from "../../components/SearchBar/index";
import SearchResult from "../../components/SearchResult/index";
import { SearchPlaceholder } from "../../constants/messages";
import { SiteHeading } from "../../constants/messages";
import { debounce } from "lodash";
import Error from "../../components/Error/index";
import { Link } from "react-router-dom";

export class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      criteria: "",
    };
  }

  searchWhenUserStopsTyping = debounce(() => {
    const { criteria } = this.state;
    this.props.fetchMovies(criteria);
    console.log(`fetchMovies(${criteria})`);
  }, 300);

  handleCriteriaChange = (e) => {
    this.setState({ criteria: e.currentTarget.value }, () => {
      this.searchWhenUserStopsTyping();
    });
  };
  render() {
    const { movie } = this.props;
    const { criteria } = this.state;
    return (
      <div>
        <Header heading={SiteHeading} />
        <SearchBar
          placeholder={SearchPlaceholder}
          criteria={criteria}
          handleChange={this.handleCriteriaChange}
        ></SearchBar>
        {movie.error !== null ? (
          <Error errorMsg={movie.error}></Error>
        ) : (
          movie.movies.results !== null &&
          Array.isArray(movie.movies.results) &&
          movie.movies.results.length > 0 &&
          movie.movies.results.map((data, index) => {
            const movieId = data.id;
            return (
              <Link
                to={{
                  pathname: `/movies/${movieId}/detail`,
                  title: data.title,
                  overview: data.overview,
                }}
                key={index}
                className="link"
              >
                <SearchResult
                  key={index}
                  id={data.id}
                  title={data.title}
                ></SearchResult>
              </Link>
            );
          })
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    movie: state.movie,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchMovies: fetchMovies,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Search);
