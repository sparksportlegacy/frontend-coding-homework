import React, { Component } from "react";
import { shallow, mount } from "enzyme";
import { Search } from "./index";
import SearchBar from "../../components/SearchBar/index";
import SearchResult from "../../components/SearchResult/index";
import Error from "../../components/Error/index";

describe("Shallow rendered Search page", () => {
  let props;
  beforeEach(() => {
    props = {
      movie: {
        pending: false,
        movies: [],
        error: null,
      },
    };
  });
  it("should render a page with the Search bar", () => {
    // Setup wrapper and assign props.
    const enzymeWrapper = shallow(<Search {...props} />);
    // enzymeWrapper.find(selector) : Find every node in the render tree that matches the provided selector.
    expect(enzymeWrapper.find(SearchBar)).toHaveLength(1);
    expect(
      enzymeWrapper.find(SearchBar).dive().find("input").prop("name")
    ).toEqual("search");
    expect(enzymeWrapper.find(SearchResult)).toHaveLength(0);
    expect(enzymeWrapper.find(Error)).toHaveLength(0);
  });

  //   it("should dispatch the fetchMovies action when user stops typing in SearchBar", () => {
  //     jest.useFakeTimers();

  //     props.fetchMovies = jest.fn();
  //     const enzymeWrapper = shallow(<Search {...props} />);
  //     const spy = jest.spyOn(enzymeWrapper.instance().props, "fetchMovies");
  //     const input = enzymeWrapper.find(SearchBar).dive().find("input");
  //     input.props().onChange({ currentTarget: { value: "test" } });
  //     console.log(enzymeWrapper.debug());
  //     expect(spy).not.toHaveBeenCalled();
  //     jest.advanceTimersByTime(1000);
  //     expect(spy).toHaveBeenCalledTimes(1);
  //   });

  it("renders the search results correctly", () => {
    props.movie.movies = {
      page: 1,
      results: [
        {
          id: 77707,
          title: "Test movie",
          adult: false,
          poster_path: null,
        },
      ],
      totalPages: 1,
      totalResults: 1,
    };
    const enzymeWrapper = shallow(<Search {...props} />);

    expect(enzymeWrapper.find(SearchResult).length).toBe(1);
  });

  it("renders the error div when there is an error", () => {
    props.movie.movies = {
      page: 1,
      results: [
        {
          id: 77707,
          title: "Test movie",
          adult: false,
          poster_path: null,
        },
      ],
      totalPages: 1,
      totalResults: 1,
    };
    props.movie.error = "404";
    const enzymeWrapper = shallow(<Search {...props} />);

    expect(enzymeWrapper.find(SearchResult).length).toBe(0);
    expect(enzymeWrapper.find(Error).length).toBe(1);
  });
});
