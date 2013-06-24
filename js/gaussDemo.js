(function(global) {

	global.gaussDemo = {
		matrix: [],
		init: function() {
			this.step = {
				start: true,
				pos: [0, 0],
				multiplier: 1,
				equationPointer: 0,
				preload: false
			}
			this.matrix = this.parseInput($('#inputMatrix').val());
			this.order();
		},
		step: {
			start: true,
			pos: [0, 0],
			multiplier: 1,
			equationPointer: 0,
			preload: false

		},
		runStep: function() {
			if (this.step.start == true && this.step.preload == true) {
				this.matrix = this.parseInput($('#inputMatrix').val());
				this.order();
				this.step.start = false;

			}


			if (this.step.equationPointer < this.matrix.length - 1) {
				if (this.matrix[this.step.equationPointer, this.step.pos[1]] == 0) {
					this.step.equationPointer++;
					$("#explain").html("Trafiliśmy 0 po przekątnej, przechodzimy do kolejnego kroku nie robiąc nic");
					return true;
				}
				this.step.equationPointer++;
				var multiplierRef = this.matrix[this.step.pos[0]][this.step.pos[1]];
				var multiplierSeek = this.matrix[this.step.equationPointer][this.step.pos[1]];
				if ((multiplierSeek >= 0 && multiplierRef >= 0) || (multiplierSeek <= 0 && multiplierRef <= 0)) {

					multiplierRef = -multiplierRef;
				} else if ((multiplierSeek <= 0 && multiplierRef >= 0) || (multiplierSeek >= 0 && multiplierRef <= 0)) {
					multiplierSeek = Math.abs(multiplierSeek);
					multiplierRef = Math.abs(multiplierRef);
				}

				if (multiplierRef == 0 || multiplierSeek == 0) {
					this.equationPointer++;
					$("#explain").html("Trafiliśmy 0 więc przechodzimy do kolejnego kroku nie robiąc nic");
					return true;
				}
				this.multiplyRow(this.matrix[this.step.pos[0]], multiplierSeek);
				this.multiplyRow(this.matrix[this.step.equationPointer], multiplierRef);

				this.matrix[this.step.equationPointer] = this.addRow(this.matrix[this.step.equationPointer], this.matrix[this.step.pos[0]]);
				$("#explain").html("Mnożymy wiersz #" + this.step.pos[0] + " przez " + multiplierSeek + " i wiersz #" + this.step.equationPointer + " przez " + multiplierRef
						+ "<br>Następnie dodajemy wiersze, wynik zapisujemy jako wiersz " + this.step.equationPointer +
						"");
				return true;
			} else if (this.step.pos[0] < this.matrix.length - 1) {

				this.step.pos[this.step.pos[0]++, this.step.pos[1]++];
				this.step.equationPointer = this.step.pos[0];

			} else {
				this.step.pos = [0, 0];
				this.step.equationPointer = 0;
				this.step.start = true;
				this.step.preload = true;
				//this.sortMatrix();
				$("#explain").html("Otrzymujemy macierz zredukowaną, teraz ustawiamy wiersze tak żeby w każdym następnym było więcej zer niż w poprzednim");

				this.solveEquation();
			}
		},
		multiplyRow: function(row, multiplier) {
			for (x in row) {
				row[x] *= multiplier;
			}
			return row;
		},
		addRow: function(row1, row2) {
			var ret = new Array();
			for (x in row1) {
				ret[x] = parseInt(row1[x]) + parseInt(row2[x]);
			}
			return ret;
		},
		stringify: function(matrix) {
			var ret = "";
			for (y in matrix) {
				for (x in matrix[y]) {
					ret += matrix[y][x] + " ";

				}
				ret = ret.trim();
				ret += "\n";
			}

			return ret.trim();
		},
		parseInput: function(input) {

			input = input.trim();
			var rows = input.split("\n");
			for (x in rows) {
				rows[x] = rows[x].trim();
				rows[x] = rows[x].split(" ");
			}


			return rows;
		},
		order: function() {
			for (y = 0; y < this.matrix.length - 1; y++) {

				if (this.matrix[y][y] == 0) {


					this.matrix.push(this.matrix[y]);
					this.matrix.splice(y, 1);

				}
			}

		},
		parseOut: function() {
			var retStr = "<table style=\"border:1px solid:black;\">";

			for (var y = 0; y < this.matrix.length; y++) {

				var style = "";
				if (this.step.equationPointer == y) {

					style += "background:red;";
				}
				if (this.step.pos[0] == y) {
					style += "color:SteelBlue;";
				}
				retStr += "<tr style=\"" + style + "\">";
				for (var x in this.matrix[y]) {
					if (this.step.pos[0] == y && this.step.pos[1] == x) {
						retStr += "<td><b> " + this.matrix[y][x] + " </b></td>";
					} else {
						retStr += "<td> " + this.matrix[y][x] + "</td> ";
					}
				}

				retStr += "</tr>";
			}
			return retStr;
		},
		sortMatrix: function() {
			var sorted = [];
			this.matrix.sort(function(a, b) {

				var i = 0;
				var k = 0;
				var x = 0;

				for (x in a) {
					if (a[x] === 0) {
						k++;
					}
				}
				for (x in b) {
					if (b[x] === 0) {
						i++;
					}
				}

				return i - k;


			});

			this.reduceZero();
		},
		reduceZero: function() {
			for (y in this.matrix) {
				var c = 0;
				for (x in this.matrix[y]) {
					if (this.matrix[y][x] == 0) {
						c++;
					}
				}
				if (c == this.matrix[y].length) {
					delete this.matrix[y];
				}
			}

		},
		solveEquation: function() {
			this.sortMatrix();
			var solvable = false;
			// check if solution exists
			var zeroCount = 0;
			for (var row in this.matrix) {
				zeroCount = 0;
				var noSolutions = false;
				for (x in this.matrix[row]) {
					if (this.matrix[row][x] == 0) {
						zeroCount++;
					}
				}
				//zeroCount = this.matrix[row].length - zeroCount;	
				if (zeroCount == this.matrix[row].length){
					solvable=false;
					break;
					
				}
					console.log(this.matrix[row].length-zeroCount);
				switch (this.matrix[row].length-zeroCount) {
					case 0:
						solvable = false;

						break;
					case 1:
						solvable = false;
						noSolutions = true;
					
						break;
					case 2:
						solvable = true;
						break;
					default:
						solvable = false;
				}

				if (solvable == true || this.matrix[row].length-zeroCount == 1) {
					break;
				}
			}
			
			if (this.matrix[row].length-zeroCount == 1 && noSolutions==true) {
				return alert("Macierz Osobliwa - układu nie da się rozwiązać - brak rozwiązań");

			}
			if (solvable == false) {
				$("#explain").append("<br>Układu równań nie da się rozwiązać.<br>");
				return;
			}

			// preBuild solution vector
			var solutionVector = [];
			for (x in this.matrix) {
				solutionVector.push(undefined);
			}

			for (row in this.matrix) {
				var rightSide = this.matrix[row][this.matrix[row].length - 1];
				//var i=this.matrix[row].length-2;
				for (var x = this.matrix[row].length - 1 - row; x < this.matrix[row].length - 1; x++) {
					rightSide -= solutionVector[x] * this.matrix[row][x];
					

				}
				$("#explain").append("<p>Rozwiązujemy " + row + " równanie względem " + (this.matrix[row].length - 2 - row) + " niewiadomej</p>");
				
				solutionVector[this.matrix[row].length - 2 - row] = rightSide / this.matrix[row][this.matrix[row].length - 2 - row];
				$("#explain").append("<p>" + (this.matrix[row].length - 2 - row) + " niewiadoma wynosi: " + solutionVector[this.matrix[row].length - 2 - row] + "</p>");
			}

			
		}


	}

})(this);
$(function() {
	gaussDemo.step.preload = false;
	gaussDemo.step.start = false;
	gaussDemo.matrix = gaussDemo.parseInput($('#inputMatrix').val());
	gaussDemo.order();
	$("#explain").html("Pobieramy macierz z okienka do obliczeń i ustawiamy wiersze tak żeby po przekątnej nie było zer");
	$("#outDiv").html(gaussDemo.parseOut());
	$("#reload").click(function(e) {
		e.preventDefault();
		gaussDemo.init();
		gaussDemo.step.preload = true;
		$("#outDiv").html(gaussDemo.parseOut());
		gaussDemo.runStep();
	});
	$("#process").click(function(e) {
		e.preventDefault();
		gaussDemo.runStep();
		$("#outDiv").html(gaussDemo.parseOut());
	});

});