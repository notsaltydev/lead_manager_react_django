import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {register} from "../../actions/auth";
import {createMessage} from "../../actions/messages";

class Register extends Component {
    static propTypes = {
        register: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    };

    state = {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    };

    onSubmit = (event) => {
        event.preventDefault();

        const {username, email, password, passwordConfirmation} = this.state;

        if (password !== passwordConfirmation) {
            this.props.createMessage({passwordNotMatch: 'Password do not match.'});
        } else {
            const newUser = {
                username,
                email,
                password
            };

            this.props.register(newUser);
        }

    };

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    render() {
        const {username, email, password, passwordConfirmation} = this.state;

        if (this.props.isAuthenticated) {
            return <Redirect to="/"/>
        }

        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <h2 className="text-center">Register</h2>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                onChange={this.onChange}
                                value={username}/>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                onChange={this.onChange}
                                value={email}/>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                onChange={this.onChange}
                                value={password}/>
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="passwordConfirmation"
                                onChange={this.onChange}
                                value={passwordConfirmation}/>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                        </div>
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {register, createMessage})(Register);