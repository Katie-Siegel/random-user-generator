const randomFolks = document.querySelector(
	'.random-peeps'
);
const selectUserNumber =
	document.querySelector('select');

//Gathers data from the API
const getData = async function (numUsers) {
	const userRequest = await fetch(
		`https://randomuser.me/api?results=${numUsers}`
	);
	//Translates data into a JavaScript Object for use on the webpage
	const data = await userRequest.json();
	//Narrows down gathered data to only the individual files by using the property name for the array: "results"
	const userResults = data.results;
	displayUsers(userResults);
};

const displayUsers = function (userResults) {
	randomFolks.innerHTML = ''; //Clears previous content

	for (const user of userResults) {
		const country = user.location.country;
		const name = user.name.first;
		const imageUrl = user.picture.medium;

		//Creates a div for each user
		const userDiv = document.createElement('div');
		userDiv.innerHTML = `<h3>${name}</h3>
        <p>${country}</p>
        <img src=${imageUrl} alt='User avatar'/>`;
		randomFolks.append(userDiv);
	}
};
//Calls the getData function to fetch and display data
getData(1);  //Default number of user to display

selectUserNumber.addEventListener(
	'change',
	function (e) {
        //Get the selected number of users from the dropdown
		const numUsers = e.target.value;
		getData(numUsers);
	}
);
