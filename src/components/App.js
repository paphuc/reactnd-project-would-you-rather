import React, { Component } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navigation from "./Navigation";
import Login from "./Login";
import Home from "./Home";
import Poll from "./Poll";
import AddQuestion from "./AddQuestion";
import LeaderBoard from "./LeaderBoard";
import NotFoundPage from "./NotFoundPage";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Container>
        <main>
          <Router>
            <Navigation />
            {this.props.isLogin ? (
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/questions/:id" element={<Poll />} />
                <Route path="/add" element={<AddQuestion />} />
                <Route path="/leaderboard" element={<LeaderBoard />} />
                <Route path="/login" element={<Login />} />
                <Route path="*"element={<NotFoundPage />} />
              </Routes>
            ) : (
              <Login />
            )}
          </Router>
        </main>
      </Container>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    isLogin: authedUser !== null,
  };
}

export default connect(mapStateToProps)(App);
