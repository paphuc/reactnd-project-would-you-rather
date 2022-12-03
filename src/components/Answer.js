import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Login from "./Login";

class answer extends Component {
  render() {
    const { question, author, authedUser } = this.props;
    const { optionOne, optionTwo } = question;
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
              <Card.Text>
                {optionOne.votes.includes(authedUser)
                  ? optionOne.text
                  : optionTwo.text}
              </Card.Text>
              <Link to={{ pathname: "/questions/" + question.id }}>
                <Button
                  style={{ backgroundColor: "#31bea7", border: "#31bea7" }}
                  variant="primary"
                >
                  View Poll
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
export default connect(mapStateToProps)(answer);
