function sanitize(name) {
	const branchWhitespaceChar = '-';
	const output = name ?
		(shouldTrimEmptySpaces() ? name.replace(/\s+/g, " ") : name).trim().replace(/^-+/, '').replace(/^\.|\/\.|\.\.|~|\^|:|\/$|\.lock$|\.lock\/|\\|\*|\s|^\s*$|\.$|\[|\]$/g, branchWhitespaceChar)
		: name;

	let cleanOutput = output.replace(/["']/g, '')    // Remove double and single quotes
		.replace(/\s+/g, ' ')        // Remove extra spaces
		.replace(/-+/g, '-')          // Remove extra dashes
		.replace(/[()\[\]?,#&`]/g, '') // Remove unwanted characters
		.trim();                     // Trim spaces from both ends

	// Remove the first character if it's not a letter
	if (cleanOutput[0] && !/^[a-zA-Z]/.test(cleanOutput[0])) {
		cleanOutput = cleanOutput.replace(/^./, '');
	}

	return shouldLowerCase() ? cleanOutput.toLowerCase() : cleanOutput;
}


function shouldTrimEmptySpaces() {
	return true;
}

function shouldLowerCase() {
	return true;
}

function getInputText() {
	return document.getElementById("git-input").value;
}

function getResultText() {
	return document.getElementById("git-result").value;
}

function setResultText(text) {
	document.getElementById("git-result").value = text;
}

function onClickNormalize() {
	const inputValue = getInputText();
	const sanitizedValue = sanitize(inputValue);
	setResultText(sanitizedValue);
}

// Function to copy the result text to the clipboard
function onClickCopyToClipboard() {
	const result = getResultText();
	const textarea = document.createElement('textarea');

	textarea.value = result;
	textarea.style.position = 'absolute';
	textarea.style.left = '-9999px';

	document.body.appendChild(textarea);

	textarea.select();
	textarea.setSelectionRange(0, 99999);

	try {
		document.execCommand('copy');
		console.log('Text copied to clipboard successfully!');
	} catch (err) {
		console.error('Failed to copy text: ', err);
	} finally {
		document.body.removeChild(textarea);
	}
}

