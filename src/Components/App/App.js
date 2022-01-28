import { Notify } from "notiflix/build/notiflix-notify-aio";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Component } from "react";
import fetchGallery from "../../api/api";
import Searchbar from "../Searchbar/Searchbar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import { AppWrap } from "./App.styled";

export default class App extends Component {
  state = {
    inputQuerry: "",
    page: 1,
    status: "idle",
    gallery: [],
    error: null,
    modalImg: null,
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { inputQuerry, page } = this.state;
    if (prevState.inputQuerry !== inputQuerry) {
      this.setState({ status: "pending" });

      fetchGallery(inputQuerry, page)
        .then((data) => data.hits)
        .then((response) => {
          if (response.length === 0) {
            Notify.failure("Sorry, we couldn't find any matches", {
              position: "center-center",
              fontSize: "24px",
              timeout: 2500,
              width: "30%",
            });
            Loading.remove();
          } else {
            this.setState({ gallery: response, status: "resolved" });
          }
        });
    }
    if (prevState.page !== page && page !== 1) {
      this.setState({ status: "pending" });

      fetchGallery(inputQuerry, page)
        .then((data) => data.hits)
        .then((response) => {
          if (response.length === 0) {
            Notify.failure("Sorry, we couldn't find any matches", {
              position: "center-center",
              fontSize: "24px",
              timeout: 2500,
              width: "30%",
            });
            Loading.remove();
          } else {
            this.setState((prevState) => ({
              gallery: [...prevState.gallery, ...response],
              status: "resolved",
            }));
          }
        });
    }
  }

  onSubmitForm = (inputQuerry) => {
    this.setState({ inputQuerry });
  };

  buttonLoadMore = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
    console.log("LOAD MORE");
  };

  modalImg = (id, img, tags) => {
    this.setState({ modalImg: { id: id, img: img, tags: tags } });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { gallery, status, showModal, modalImg } = this.state;

    return (
      <AppWrap>
        <Searchbar onSubmit={this.onSubmitForm} />
        {status === "pending" && Loading.pulse()}
        {status === "resolved" && Loading.remove()}
        <ImageGallery
          response={gallery}
          toggleModal={this.toggleModal}
          onImageClick={this.modalImg}
        />
        {status === "resolved" && (
          <Button loadMoreClick={this.buttonLoadMore} />
        )}
        {showModal && (
          <Modal closeModal={this.toggleModal} modalImg={modalImg} />
        )}
      </AppWrap>
    );
  }
}
