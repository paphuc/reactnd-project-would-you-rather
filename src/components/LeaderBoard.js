import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Row, Col } from "react-bootstrap";
import Login from "./Login";

class LeaderBoard extends Component {
  render() {
    const { authedUser } = this.props;
    const users = Object.assign({}, this.props.users);
    if (authedUser === "") {
      return <Login />;
    }

    Object.keys(users).forEach((key) => {
      const user = users[key];
      user.answer = Object.keys(user.answers).length;
      user.created = user.questions.length;
      user.score = user.answer +  user.created;
    });

    //sort users
    const userIDs = Object.keys(users).sort(
      (a, b) => users[b].score - users[a].score
    );

    return (
      <div>
        {userIDs.map((id) => (
          <Card key={id} style={{ width: "36rem" , margin: "25px auto auto auto"}}>
            <Card.Body>
              <Row>
                <Col sm={3}>
                  <Card.Img
                    variant="left"
                    src={users[id].avatarURL}
                    alt={`Avatar of ${users[id].name}`}
                    style={{ width: 128, height: 128 }}
                  />
                </Col>
                <Col sm={6}>
                  <Card.Title>{users[id].name}</Card.Title>
                  <Card.Text>
                    {`Answered questions: ${users[id].answer}  `}
                    {`Created questions: ${users[id].created}  `}
                  </Card.Text>
                </Col>
                <Col sm={3}>
                  <Card style={{ width: "5rem" }}>
                    <Card.Header>Score</Card.Header>
                    <Card.Body>
                      {`${users[id].answer + users[id].created}`}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users,
  };
}

export default connect(mapStateToProps)(LeaderBoard);
