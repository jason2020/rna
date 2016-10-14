var button = document.getElementById("submit");
var text = document.getElementById("rna");
button.addEventListener("click", function() {
	var result = rnaChainBreaker(text.value.toUpperCase());
	this.parentNode.reset();
	addPicture(result);
});

function rnaChainBreaker(rnaChain) {
	var array = [];
	var rnaStrands = rnaChain.match(/.{1,3}/g);
	var length = rnaStrands.length;
	if ((length % 3 == 0) || (rnaChain.includes("") == true)) {
		error();
	} else {
		for (var i = 0; i < length; i++) {
			var rnaChain = rnaStrands[i].split("");
			var processedRna = processRnaStrand(rnaChain);
			var aminoAcid = getAminoAcid(processedRna);
			array.push(aminoAcid);
		}
	}
	console.log(array);
	return array;
}

function processRnaStrand (rnaStrand) {
	if (rnaStrand[0] == "U") {
		rnaStrand.splice(0, 1, 0)
	} else if (rnaStrand[0] == "C") {
		rnaStrand.splice(0, 1, 1)
	} else if (rnaStrand[0] == "A") {
		rnaStrand.splice(0, 1, 2)
	} else if (rnaStrand[0] == "G") {
		rnaStrand.splice(0, 1, 3)
	} else {
		return "";
	}
	
	if (rnaStrand[1] == "U") {
		rnaStrand.splice(1, 1, 0)
	} else if (rnaStrand[1] == "C") {
		rnaStrand.splice(1, 1, 1)
	} else if (rnaStrand[1] == "A") {
		rnaStrand.splice(1, 1, 2)
	} else if (rnaStrand[1] == "G") {
		rnaStrand.splice(1, 1, 3)
	} else {
		return "";
	}
	return rnaStrand;
}

function getAminoAcid(processRna) {
	if (processRna == "") {
		return "";
	}
	// array[0] = U, array[1] = C, array[2] = A, array[3] = G
	// inner array organized by: UCAG
	var combinations = [[
							["Phenylalanine", "Leucine"], ["Serine"], ["Tyrosine", "Stop Codon"], ["Cysteine", "Stop Codon", "Typtophan"]
						],
						[
							["Leucine"], ["Proline"], ["Histidine", "Glutamine"], ["Arginine"]
						],
						[
							["Isoleucine", "Methionine"], ["Theronine"], ["Asparagine", "Lysine"], ["Serine", "Arginine"]
						],
						[
							["Valine"], ["Alanine"], ["Aspartic Acid", "Glutamic Acid"], ["Glycine"]
						]],
		resultAminoAcid = "",
		index1 = processRna[0],
		index2 = processRna[1];
		
	if (combinations[index1][index2].length == 1) {
		resultAminoAcid = combinations[index1][index2][0]
	} else if (combinations[index1][index2].length == 2) {
		if ((processRna[2] == "U") || (processRna[2] == "C")) {
			resultAminoAcid = combinations[index1][index2][0]
		} else if ((processRna[2] == "A") || (processRna[2] == "G")) {
			resultAminoAcid = combinations[index1][index2][1]
		} else {
			return "";
		}
	} else if (combinations[index1][index2].length == 3) {
		if ((processRna[2] == "U") || (processRna[2] == "C")) {
			resultAminoAcid = combinations[index1][index2][0]
		} else if (processRna[2] == "A") {
			resultAminoAcid = combinations[index1][index2][1]
		} else if (processRna[2] == "G") {
			resultAminoAcid = combinations[index1][index2][2]
		} else {
			return "";
		}
	} else {
		return "";
	}
	return resultAminoAcid;
}

function addPicture(results) {
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

function error() {
	alert("Error in the RNA sequence :(");
	return false;
}