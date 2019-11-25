import axios from 'axios';

export default axios.create({
	baseURL: 'https://innovaccer-sde-intern-server.herokuapp.com/',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	}
});
