import React, { Component } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { ModalOverlay, ModalWindow } from "./Modal.styled";

const modalRoot = document.querySelector("#modal-root");

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.closeModal();
    }
  };

  backDropClick = (event) => {
    if (event.target === event.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    return createPortal(
      <ModalOverlay onClick={this.backDropClick}>
        <ModalWindow>
          <img
            src={this.props.modalImg.img}
            alt={this.props.modalImg.tags}
            key={this.props.modalImg.id}
          />
        </ModalWindow>
      </ModalOverlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalImg: PropTypes.object.isRequired,
};
