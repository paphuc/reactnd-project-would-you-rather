import React, { Component } from "react";
import { connect } from "react-redux";
import withRouter from "../utils/withRouter";
import { compose } from "redux";
import { Card, Badge, Row, Col, ProgressBar } from "react-bootstrap";
import Login from "./Login";
import { resetAuthedUser } from "../actions/authedUser";

class Poll extends Component {
  render() {
    const { question, author, authedUser } = this.props;
    const { optionOne, optionTwo } = question
    const { name, avatarURL } = author

    if (authedUser === "") {
      return <Login />;
    }

    if (question === null) {
      this.props.dispatch(resetAuthedUser());
            return <Login />
    }
    const isSelectOptionOne = optionOne.votes.includes(authedUser);
    const isSelectOptionTwo = optionTwo.votes.includes(authedUser);
    const optionOneNo = optionOne.votes.length;
    const optionTwoNo = optionTwo.votes.length;
    const total = optionOneNo + optionTwoNo;
    const optionOnePercent = (optionOneNo * 100) / total;
    const optionTwoPercent = (optionTwoNo * 100) / total;

    return (
      <Card style={{ width: "38rem", margin: "25px auto auto auto" }}>
        <Card.Header>Asked by {name}:</Card.Header>
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
              <Card.Title>Results:</Card.Title>
              <Card>
                <Card.Body>
                  {isSelectOptionOne ? (
                    <Badge pill bg="warning" text="dark">
                      Your vote
                    </Badge>
                  ) : (
                    ""
                  )}
                  <Card.Text>Would You Rather {optionOne.text}?</Card.Text>
                  <ProgressBar now={optionOnePercent} label={`${optionOnePercent.toFixed(2)}%`} />
                  <Card.Text>{`${optionOneNo} out of ${total} vote(s)`}</Card.Text>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  {isSelectOptionTwo ? (
                    <Badge pill bg="warning" text="dark">
                      Your vote
                    </Badge>
                  ) : (
                    ""
                  )}
                  <Card.Text>Would You Rather {optionTwo.text}?</Card.Text>
                  <ProgressBar now={optionTwoPercent} label={`${optionTwoPercent.toFixed(2)}%`} />
                  <Card.Text>{`${optionTwoNo} out of ${total} vote(s)`}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const question = questions[props.params.id];
  const author = users[question.author]
  return {
    question,
    author,
    authedUser,
  }
}

export default compose(withRouter, connect(mapStateToProps))(Poll);
