import axios from 'axios';

export default axios.create({
	baseURL: 'https://innovaccer-sde-intern-server.herokuapp.com/',
	// baseURL: 'http://localhost:3001',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
});
