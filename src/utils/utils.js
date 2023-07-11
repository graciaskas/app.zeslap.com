export const IP_ADDR = window.location.host.replace(":3000", "");
const API_URL = navigator.onLine
	? "https://api.zeslap.com/v1/users/?profile=1"
	: "http://localhost:8081/v1/users/?profile=1";

export const destUrl = navigator.onLine
	? "https://zeslap.com/login"
	: "http://localhost:8082/login";

export const userLocal = () => {
	let client = localStorage.getItem("zeslap-user");
	if (!client) return null;
	client = JSON.parse(client);
	return {
		token: client["z_key"],
		expired: client["expired"],
		create_date: client["create_date"],
	};
};

/**
 * Help provide user's information
 * @returns user information
 */
export const userServer = async () => {
	try {
		const token = userLocal()?.token;
		const request = await fetch(API_URL, {
			method: "GET",
			headers: { authorization: "Bearer " + token },
		});
		const response = await request.json();

		if (response.error) return null;

		return response.error ? null : response;
	} catch (error) {
		throw Error(error);
	}
};

/**
 * Authentification function;
 * @returns
 */
const authenticateUser = async () => {
	try {
		let params = new URLSearchParams(window.location.search);
		let auth = params.has("auth") && params.get("auth");

		//First login, check auth query parameter holding access token
		//Store access token in browser
		if (auth) {
			window.localStorage.setItem(
				"zeslap-user",
				JSON.stringify({
					z_key: auth,
					expired: false,
					create_date: new Date(),
				})
			);
		}

		//Get local token set
		let token = userLocal()?.token;

		if (!token) return (window.location.href = destUrl);

		const user = await userServer();
		if (!user) return (window.location.href = destUrl);
	} catch (error) {
		console.error(error);
	}
};

export default authenticateUser;
