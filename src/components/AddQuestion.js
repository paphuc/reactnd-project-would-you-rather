import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/shared";
import { Link } from "react-router-dom";
import { Card, Button, Form } from "react-bootstrap";

class AddQuestion extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
  };
  handleChange = (e) => {
    const text = e.target.value;
    const option = e.target.id;

    this.setState((state) => ({
      optionOne: option === "optionOne" ? text : state.optionOne,
      optionTwo: option === "optionTwo" ? text : state.optionTwo,
    }));
  };
  handleSubmit = (e) => {
    const { authedUser, dispatch } = this.props;
    const optionOne = this.state.optionOne;
    const optionTwo = this.state.optionTwo;

    if (optionOne && optionTwo) {
      dispatch(handleAddQuestion(authedUser, optionOne, optionTwo));
    }
  };

  render() {
    const { optionOne, optionTwo } = this.state;

    return (
      <Card
        style={{
          width: "36rem",
          margin: "25px auto auto auto",
          fontWeight: "bold",
        }}
      >
        <Card.Header style={{ textAlign: "center" }}>
          <h4>Create New Question</h4>
        </Card.Header>
        <Card.Body>
          <Card.Text>Complete the question:</Card.Text>
          <Card.Text>Would you rather ...</Card.Text>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                id="optionOne"
                type="string"
                placeholder="Enter Option One Text Here"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Card.Text>OR</Card.Text>
            <Form.Group className="mb-3">
              <Form.Control
                id="optionTwo"
                type="string"
                placeholder="Enter Option Two Text Here"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Link to={{ pathname: "/" }} style={{ pointerEvents: optionOne === "" || optionTwo === ""? 'none' : ""}} onClick={this.handleSubmit}>
              <div className="d-grid gap-2">
                <Button
                  style={{ backgroundColor: "#31bea7", border: "#31bea7" }}
                  size="lg"
                  variant="primary"
                  type="submit"
                  disabled={optionOne === "" || optionTwo === ""}
                >
                  Submit
                </Button>
              </div>
            </Link>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(AddQuestion);
