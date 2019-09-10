import React, { useState } from 'react';
import SigninForm from './SigninForm';
import { Redirect } from 'react-router-dom';
import { login, authenticate, isAuthenticated } from '../../Utils/Requests';

const Login = () => {
	const [state, setState] = useState({
		username: 'admin',
		password: 'admin@123',
		error: '',
		loading: false,
	});

	const { username, password, loading, error } = state;

	const handleChange = event => {
		setState({
			...state,
			error: false,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async event => {
		event.preventDefault();
		setState({ ...state, error: false, loading: true });
		const data = await login({ username, password }).catch(err => {
            console.log(err)
			setState({ ...state, error: err.response.data.error });
		});

		console.log(data);
		if (data && data.status === 200) {
			authenticate(data, () => {
        if (isAuthenticated()){
          setState({...state});
        }
			});
		}
	};

	const showError = () => <div className="alert alert-danger">{error}</div>;

	const showLoading = () => (
		<div className="alert alert-info">
			<h2>Loading...</h2>
		</div>
	);

	const redirectUser = () => <Redirect to="/" />;

	return (
		<div className="login-dark">
			{loading && showLoading()}
			{error && showError()}
			{!loading && <SigninForm handleSubmit={handleSubmit} handleChange={handleChange} state={state} />}
			{isAuthenticated() && redirectUser()}
		</div>
	);
};

export default Login;