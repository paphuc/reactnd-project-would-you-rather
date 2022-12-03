import React, { Component } from "react";
import { connect } from "react-redux";
import { resetAuthedUser } from "../actions/authedUser";
import { Navbar, Nav, Figure } from "react-bootstrap";
import { Link } from "react-router-dom";
class Navigation extends Component {
  handleLogout = (e) => {
    e.preventDefault();
    this.props.dispatch(resetAuthedUser());
  };
  render() {
    const { users, authedUser } = this.props;
    const user = users[authedUser];

    return (
      <div style={{ textAlign: "center", backgroundColor: "#cecece" }}>
        <h5>React App</h5>
        <Navbar bg="white" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="nav-link" as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link className="nav-link" as={Link} to="/add">
                New Question
              </Nav.Link>
              <Nav.Link className="nav-link" as={Link} to="/leaderboard">
                Leader Board
              </Nav.Link>
            </Nav>
            <Nav className="me-auto">
              <Nav.Link className="nav-link mt-md-3 me-3" as={Link} to="/">
                  {user && (
                    <Figure>
                      <Figure.Image
                        className="rounded-circle"
                        width={30}
                        height={30}
                        src={`\\${user.avatarURL}`}
                      />
                    </Figure>
                  )}
                  <span>{!user ? "" : user.name}</span>
              </Nav.Link>
              <Nav.Link className="mt-md-3 pt-hack" onClick={this.handleLogout}>
                {!user ? <span></span> : <span>Logout</span>}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

function mapStateToProps({ questions, authedUser, users }) {
  return {
    questions,
    authedUser,
    users,
  };
}

export default connect(mapStateToProps)(Navigation);
