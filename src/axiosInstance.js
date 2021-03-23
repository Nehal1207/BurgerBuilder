import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://burgerbuilder-7c9d9-default-rtdb.firebaseio.com/'
})



export default instance;