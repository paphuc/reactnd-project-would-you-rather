import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAnswerQuestion } from "../actions/shared";
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Login from "./Login";

class UnansweredQuestion extends Component {
  state = {
    answer: 0,
  };

  handleChange = (e) => {
    this.setState({ answer: e.target.id });
    console.log("Set state", this.state.answer);
  };

  handleAnswer = (e) => {
    const { dispatch, question, authedUser } = this.props;

    dispatch(handleAnswerQuestion(authedUser, question.id, this.state.answer));
  };

  render() {
    const { question, author, authedUser } = this.props;
    const { optionOne, optionTwo, id } = question;
    const { name, avatarURL } = author;

    if (authedUser === "") {
      return <Login />;
    }
    return (
      <Card style={{ width: "28rem", margin: "25px auto auto auto" }}>
        <Card.Header>{name} asks:</Card.Header>
        <Card.Body>
          <Row>
            <Col sm={4}>
              <Card.Img
                variant="left"
                src={`\\${avatarURL}`}
                alt={`Avatar of ${name}`}
                style={{ width: 128, height: 128 }}
              />
            </Col>
            <Col sm={8}>
              <Card.Title>Would You Rather ...</Card.Title>
              <Form>
                <Form.Check
                  type="radio"
                  label={optionOne.text}
                  name="group1"
                  id="optionOne"
                  onChange={this.handleChange}
                />
                <Form.Check
                  type="radio"
                  name="group1"
                  label={optionTwo.text}
                  id="optionTwo"
                  onChange={this.handleChange}
                />
              </Form>
              <Link to={{ pathname: "/questions/" + id }} onClick={this.handleAnswer}>
                <Button
                  style={{ backgroundColor: "#31bea7", border: "#31bea7" }}
                  variant="primary"
                  disabled={!this.state.answer}
                  
                >
                  Submit
                </Button>
              </Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  const author = users[question.author];
  return {
    question,
    author,
    authedUser,
  };
}
export default connect(mapStateToProps)(UnansweredQuestion);
