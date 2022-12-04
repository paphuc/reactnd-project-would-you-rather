import React, { Component } from "react";
import { connect } from "react-redux";
import Answer from "./Answer";
import Unanswer from "./Unanswer";
import { Tabs, Tab } from "react-bootstrap";
import Login from "./Login";

class Home extends Component {
  render() {
    const { authedUser, users, questions } = this.props;
    console.log("testting ", authedUser)
    if (authedUser === "" || authedUser === null) {
      return <Login />;
    }
    const questionIDs = Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    );
    return (
      <Tabs
        defaultActiveKey="answer"
        id="uncontrolled-tab-example"
        className="mb-2"
      >
        <Tab eventKey="answer" title="Answer Questions">
          {questionIDs
            .filter((id) => users[authedUser].answers.hasOwnProperty(id))
            .map((id) => (
              <Answer key={id} id={id} />
            ))}
        </Tab>
        <Tab eventKey="unanswer" title="Unanswer Questions">
          {questionIDs
            .filter((id) => !users[authedUser].answers.hasOwnProperty(id))
            .map((id) => (
              <Unanswer key={id} id={id} />
            ))}
        </Tab>
      </Tabs>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }) {
  return {
    authedUser,
    users,
    questions,
  };
}

export default connect(mapStateToProps)(Home);
