import { Notify } from "notiflix/build/notiflix-notify-aio";
import PropTypes from "prop-types";
import { Component } from "react";
import {
  Header,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnLabel,
  SearchFormInput,
} from "./Searchbar.styled";

class Searchbar extends Component {
  state = {
    inputQuerry: "",
  };

  handleInput = (e) => {
    this.setState({ inputQuerry: e.currentTarget.value.toLowerCase() });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    if (this.state.inputQuerry.trim() === "") {
      Notify.failure("Write the correct image name,please", {
        position: "center-center",
        fontSize: "24px",
        timeout: 2500,
        width: "30%",
      });
      return;
    }
    this.props.onSubmit(this.state.inputQuerry);
    this.setState({ inputQuerry: "" });
  };

  render() {
    const { inputQuerry } = this.state;
    return (
      <Header>
        <SearchForm onSubmit={this.handleFormSubmit}>
          <SearchFormBtn type="submit">
            <SearchFormBtnLabel>Search</SearchFormBtnLabel>
          </SearchFormBtn>

          <SearchFormInput
            name="inputQuerry"
            value={inputQuerry}
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInput}
          />
        </SearchForm>
      </Header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
