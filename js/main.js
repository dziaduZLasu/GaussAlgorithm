(function(global) {

    global.EquationSolver = {
	refferenceRow: null,
	/**
	 * 
	 * @param {type} input
	 * @returns {undefined}
	 */
	parseInput: function(input) {

	    input = input.trim();
	    var rows = input.split("\n");
	    for (x in rows) {
		rows[x] = rows[x].trim();
		rows[x] = rows[x].split(" ");
	    }
	    return rows;
	},
	extractBaseMatrix: function(matrix) {
	    var ret = new Array();
	    for (var y in matrix) {
		   ret[y]=matrix[y].slice(0,matrix[y].length-1);
	    }
	    return ret;
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
		ret[x] = row1[x] + row2[x];
	    }
	    return ret;
	},
	/**
	 * 
	 * @returns {undefined}
	 */
	reduceGauss: function(data) {
	    // for each row not including the last one in data set
	    for (var i = 0; i <= data.length - 2; i++) {
		// set the refference row
		for (var row = i + 1; row < data.length; row++) {
		    var k = data[i][i];
		    var t = data[row][i];
		    if (t == 0 || k == 0){
			if (k==0){
			}
			continue;
			//continue;
		    }
			
		    var s = t * k > 0 ? -1 : 1;
		    data[row] = this.multiplyRow(data[row], s * k);
		    data[i] = this.multiplyRow(data[i], t);
		    data[row] = this.addRow(data[row], data[i]);
		}
	    }
	    return data;


	},
		
		
	getVariable:function(index,matrix){
	    for (var row in matrix){
		console.log(matrix[row][index]);
		if (matrix[row][index]==0)
		    continue;
		var res=matrix[row][matrix.length-1];
		var ref = res;
		for (var col in matrix[row]){
		    if (col==index)
			continue;
		    ref-=matrix[row][col];
		}
		//if (ref==res)
	    }
	},
		
	getTriangular:function(matrix){
	    var test=false;
	    var iterations=0;
	    while(!test){
		iterations++;
		this.reduceGauss(matrix);
		var dim = this.getDim(matrix);
		var k=0;
		for (x in matrix[dim-1]){
		    if (matrix[dim-1][x]!=0){
			k++;
		    }
		}
		if (k<=2){
		    test=true;
		}
		
	    }
	    
	    return matrix;
	    
	},	
	solve: function(matrix) {
	    var extendedMatrix = matrix;
	    var baseMatrix = this.extractBaseMatrix(matrix);
	    if (this.getDim(extendedMatrix)>this.getDim(baseMatrix))
		return NaN;
	    if (this.getDim(extendedMatrix)<this.getDim(baseMatrix))
		return 0;
	    this.getVariable(0,matrix);
	    

	},
	getDim: function getDim(matrix) {
	    var dim = 0;
	    for (y in matrix)
		for (x in matrix[y]) {
		    
		    if (matrix[y][x] != 0) {
			dim++;
			break;
		    }
		}
	    return dim;
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
	}
    }




})(this);
$(function() {
    /*$("#process").click(function(e) {

	e.preventDefault();

	var ret = EquationSolver.getTriangular(EquationSolver.parseInput($("#inputMatrix").val()));
	
	$("#inputMatrix").val(EquationSolver.stringify(ret));
	console.log(EquationSolver.solve(ret));
    });*/
});