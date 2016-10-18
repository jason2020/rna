// Getting the submit button and the result text
var button = document.getElementById("submit"),
	text = document.getElementById("rna");

// Adding the event listener to the submit button
button.addEventListener("click", function() {
	// Changes the text to all uppercase, so the capitilization does not matter
	var result = rnaChainBreaker(text.value.toUpperCase());
	// Clear the form after the user clicks 'analyze'
	this.parentNode.reset();
	addPicture(result);
});

// Breaking the RNA chain into seperate 3 letter-long codons
function rnaChainBreaker(rnaChain) {
	// Check if the chain is divisible by 3
	if ((rnaChain.length % 3 == 0)) {
		var array = [];
		// Turns string into array and makes each array have 3 elements each
		var rnaStrands = rnaChain.match(/.{1,3}/g);
		var length = rnaStrands.length;
		// Loop through the array to push each of the amino acids to the array
		for (var i = 0; i < length; i++) {
			var rnaChain = rnaStrands[i].split("");
			var processedRna = processRnaStrand(rnaChain);
			var aminoAcid = getAminoAcid(processedRna);
			array.push(aminoAcid);
		}
	} else {
		return false;
	}
	console.log(array);
	return array;
}

// Turns the first 2 letters in the codon into their corresponding array position to make it easier to sort latter
function processRnaStrand (rnaStrand) {
	// For the first letter UCAG
	// Checking if the letters are "correct" (only U, C, A, or G)
	if (rnaStrand[0] == "U") {
		rnaStrand.splice(0, 1, 0);
	} else if (rnaStrand[0] == "C") {
		rnaStrand.splice(0, 1, 1)
	} else if (rnaStrand[0] == "A") {
		rnaStrand.splice(0, 1, 2);
	} else if (rnaStrand[0] == "G") {
		rnaStrand.splice(0, 1, 3);
	} else {
		console.log("1st letter");
		return false;
	}
	// For the second letter UCAG
	if (rnaStrand[1] == "U") {
		rnaStrand.splice(1, 1, 0);
	} else if (rnaStrand[1] == "C") {
		rnaStrand.splice(1, 1, 1);
	} else if (rnaStrand[1] == "A") {
		rnaStrand.splice(1, 1, 2);
	} else if (rnaStrand[1] == "G") {
		rnaStrand.splice(1, 1, 3);
	} else {
		console.log("2nd letter");
		return false;
	}
	return rnaStrand;
}

// Turn the array with the letters and numbers into the amino acid
function getAminoAcid(processRna) {
	// Check if the RNA is not correct (either due to incorrect letters or being not divisible by 3)
	if (processRna == false) {
		return false;
	} else {
		// Array[0] = U, array[1] = C, array[2] = A, array[3] = G
		// Arrays organized in UCAG patttern
		// All different codons based on RNA codon charts
		var combinations = [[
								["Phenylalanine", "Leucine"], ["Serine"], ["Tyrosine", "Stop Codon"], ["Cysteine", "Stop Codon", "Typtophan"]
							],
							[
								["Leucine"], ["Proline"], ["Histidine", "Glutamine"], ["Arginine"]
							],
							[
								["Isoleucine", "Methionine"], ["Threonine"], ["Asparagine", "Lysine"], ["Serine", "Arginine"]
							],
							[
								["Valine"], ["Alanine"], ["Aspartic Acid", "Glutamic Acid"], ["Glycine"]
							]],
			// The string will contain the amino acid
			resultAminoAcid = "",
			// Using the index numbers from the processedRna to get the index for the amino acid
			index1 = processRna[0],
			index2 = processRna[1];
		
		// Check for the length of the array for the amount of possible elements, then test with the third letter
		if (combinations[index1][index2].length == 1) {
			resultAminoAcid = combinations[index1][index2][0];
		} else if (combinations[index1][index2].length == 2) {
			if ((processRna[2] == "U") || (processRna[2] == "C")) {
				resultAminoAcid = combinations[index1][index2][0];
			} else if ((processRna[2] == "A") || (processRna[2] == "G")) {
				resultAminoAcid = combinations[index1][index2][1];
			} else {
				return false;
			}
		} else if (combinations[index1][index2].length == 3) {
			if ((processRna[2] == "U") || (processRna[2] == "C")) {
				resultAminoAcid = combinations[index1][index2][0];
			} else if (processRna[2] == "A") {
				resultAminoAcid = combinations[index1][index2][1];
			} else if (processRna[2] == "G") {
				resultAminoAcid = combinations[index1][index2][2];
			} else {
				return false;
			}
		} else {
			return false;
		}
		return resultAminoAcid;
	}
}

// Add the pictures and the text by using the amino acid name that we found
function addPicture(results) {
	console.log(results);
	if (results == false) {
		error();
	} else if (results.includes(false) == true){
		error();
	} else {
		var length = results.length;
		var putResults = document.getElementById("results");
		putResults.innerHTML = "";
		for (var i = 0; i < length; i++) {
			var name = results[i].toLowerCase();
			var container = document.createElement("div");
			container.className = "aminoAcid";
			var text = document.createElement("div");
			text.innerHTML = results[i];
			text.className = "aminoAcidName";
			var picture = document.createElement("img");
			picture.className = "picture";
			picture.setAttribute("src", "images/" + name + ".png");
			container.appendChild(text);
			container.appendChild(picture);
			putResults.appendChild(container);
		}
	}
}

// Run error code when there is something wrong with the RNA sequence
function error() {
	swal({
		title: "Error",
		text: "Something is wrong with the RNA sequence that you have entered,",
		type: "error",
		showConfirmButton: false,
		allowOutsideClick: true,
		timer: 1000
	});
}