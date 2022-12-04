import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { Card, Form, Button } from "react-bootstrap";
import NotFoundPage from "./NotFoundPage";
import { Link } from "react-router-dom";

class Login extends Component {
  state = {
    userId: "",
  };
  handleUserChanged = (e) => {
    e.preventDefault();
    const userId = e.target.value;
    this.setState({ userId });
  };
  handleUserLogin = (e) => {
    const { userId } = this.state;
    if (userId !== "Select User" && userId !=="" && userId !==null) {
      this.props.dispatch(setAuthedUser(userId));
    }
  };

  render() {
    const { users } = this.props;

    return (
      <div>
        <Card className="text-center" style={{ width: "36rem" }}>
          <Card.Header>
            Welcome to the Would You Rather App!
            Please sign in to continue
          </Card.Header>
          <Card.Body>
            <Card.Img
              style={{ width: "18rem" }}
              variant="top"
              src="https://repository-images.githubusercontent.com/224272914/9f688f00-1071-11ea-9187-0162a4e3044c"
            />
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label style={{ color: "#30c0a8" }}>Sign in</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={this.handleUserChanged}
                >
                  <option>Select User</option>
                  {Object.values(users).map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Link to={{ pathname: this.props.isNotFound === "true" ? "/PageNotFound" : "/" }}  onClick={this.handleUserLogin}>
              <Button variant="primary" type="submit" >
                Submit
              </Button>
              </Link>

            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ users }, {isNotFound}) {
  console.log("got isnotfound: ", isNotFound)
  return {
    users,
    isNotFound
  };
}

export default connect(mapStateToProps)(Login);
