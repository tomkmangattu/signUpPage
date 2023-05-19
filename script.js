const form = document.getElementById('form');
const userName = document.getElementById('username');
const emailId = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');


userName.addEventListener('blur', (event) => {
	const inputValue = event.target.value;
	validateUserName(inputValue);
});

emailId.addEventListener('blur', (event) => {
	const inputValue = event.target.value;
	validateEmail(inputValue);
});

password.addEventListener('blur', (event) => {
	const inputValue = event.target.value;
	validatePassword(inputValue);

});

confirmPassword.addEventListener('blur', (event) => {
	const inputValue = event.target.value;
	validateConfirmPassword(inputValue);
});

form.addEventListener('submit', (event) => {
	event.preventDefault();
	
	const userNameString = userName.value.trim();
	const emailString = emailId.value.trim();
	const passwordString = password.value.trim();
	const confirmPasswordString = confirmPassword.value.trim();
	
	validateUserName(userNameString);
	validateEmail(emailString);
	validatePassword(passwordString);
	validateConfirmPassword(confirmPasswordString);
})

const validateUserName = (nameString) => {
	if (nameString === '') {
		setErrorFor(userName, 'user name is requird');
	}
	else if (nameString.length < 4) {
		setErrorFor(userName, 'user name should be greater than 4 characters');
	} else {
		setSuccessFor(userName);
	}
}

const validateEmail = (emailString) => {
	if (emailString === '') {
		setErrorFor(emailId, 'Email id is required');
	} else if (!isEmail(emailString)) {
		setErrorFor(emailId, 'Email id is not valid');
	} else {
		setSuccessFor(emailId);
	}
}

const validatePassword = (passwordString) => {
	if (passwordString === '') {
		setErrorFor(password, 'Password is required');
	} else if (passwordString.length <= 6) {
		setErrorFor(password, 'password should be greater than 6 characters')
	} else {
		const numberRegex = /[0-9]/g;
		if (!numberRegex.test(passwordString)) {
			setErrorFor(password, 'password should contain digits')
		} else {
			const alphabetRegex = /[a-z]/g;
			if (!alphabetRegex.test(passwordString)) {
				setErrorFor(password, 'password should contain letters')
			} else {
				setSuccessFor(password)
			}
		}

	}
}

const validateConfirmPassword = (confirmPasswordString) => {
	if (confirmPasswordString === '') {
		setErrorFor(confirmPassword, 'Password is required');
	} else {
		const passwordString = password.value.trim();
		if (confirmPasswordString !== passwordString) {
			setErrorFor(confirmPassword, 'Both the passwords should match');
		} else {
			setSuccessFor(confirmPassword);
		}
	}
}



function isEmail(email) {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
}


const setSuccessFor = element => {
	const parentElement = element.parentElement;
	parentElement.classList.add('success');
	parentElement.classList.remove('error');
}

const setErrorFor = (element, message) => {
	const parentElement = element.parentElement;
	const errorDisplay = parentElement.querySelector('small')

	errorDisplay.innerText = message;
	parentElement.classList.add('error');
	parentElement.classList.remove('success');
}

