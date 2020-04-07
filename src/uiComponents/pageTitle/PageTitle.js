import React, { Component } from "react";
import "./PageTitle.scss";

class PageTitle extends Component {
  render() {
    return (
      <section className="vol7er-page-title">
        <div className="vol7er-page-title__back" />
        <div className="vol7er-page-title__cover" />
        <div className="vol7er-page-title__content">{this.props.title}</div>
      </section>
    );
  }
}

export default PageTitle;
