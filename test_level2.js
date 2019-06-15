/**
 * @file Programming exercise test nucont
 * @Author José Clavo Tafur
 *
 * The goal with this exercise is to transform data in an Array of objects
 *
 * This is TEST LEVEL 1 
 */


/**
 * This class contains all the elements which are from Data Input
 */
class OutputData {
	
    constructor() {	
		
		this.description = null
        this.classifier  = null
        this.openingBalance = 0
        this.debit          = 0
        this.credit         = 0
        this.finalBalance   = 0
        this.parent         = null
        
	}
	
    //SET
	setDescription(description) {
		this.description = description 
	}
	
	setClassifier(classifier) {
		this.classifier = classifier;
	}
	
	setOpeningBalance(openingBalance) {
		this.openingBalance = parseInt(openingBalance);
	}
	
	setDebit(debit) {
		this.debit = parseInt(debit);
	}
	
	setCredit(credit) {
		this.credit = parseInt(credit);
	}
	
	setFinalBalance(finalBalance) {
		this.finalBalance = parseInt(finalBalance);
	}
	
	setParent(parent) {
		this.parent = parent
	}
	
	//GET
	getDescription() {
		return this.description
	}
	
	getParent()
	{
		return this.parent
	}
}

/**
 * This class Transform the data in an Array of objects
 */

class TransformData {
	
	constructor() {
		this.arrayOutputData = []		
	}
	
	execute(inputData) {
		if(inputData != null)
		{
			if(inputData.length > 0)
			{
				var lines = inputData.split('\n')
				
				this.transform(lines)			
			}
		}

		return this.arrayOutputData
	}
	
	transform(lines){
		var column
		var arrayLine = []
		var these = this
		var outputData = {}

		lines.forEach(function(line) {
		    
		   column = 1
			
		   arrayLine = these.separateAndCleanLine(line)
		
		   if(arrayLine.length == 0)
		   {
			   return
		   }
		   
	       outputData = new OutputData()
	        
	       arrayLine.forEach(function(valueLine) {
	    	   
	    	   switch (column) {
	            case 1:
	            	outputData.setClassifier(these.removeDots(valueLine))
	                column = column + 1
	                break;

	            case 2:
	                if (valueLine.match(/^[a-zA-Z]/) || valueLine.match(/^[0-9]+\-/)) //validate start at number and then -
	                {
	                	outputData.setDescription(these.concatenateWithSpace(outputData.getDescription(),valueLine))
	                }
	                else
	                {
	                	outputData.setOpeningBalance(these.convertMonetaryData(valueLine)) //Column 3 value is set
	                    column = column + 2
	                }
	                break;
	            case 4:
	            	outputData.setDebit(these.convertMonetaryData(valueLine))
	                column = column + 1
	                break;
	            case 5:
	            	outputData.setCredit(these.convertMonetaryData(valueLine))
	                column = column + 1
	                break;
	            case 6:
	            	outputData.setFinalBalance(these.convertMonetaryData(valueLine))
	                column = column + 1
	                break;
	            case 7:
	            	outputData.setParent(these.concatenateWithSpace(outputData.getParent(),valueLine))
	                break;
	            }
	    	   
	       });
	        
			these.arrayOutputData.push(outputData)
			outputData = {}
		});
		
	}
	
	separateAndCleanLine(line)
	{
		line = line.replace(/\t/g, " ")
		return line.split(" ").filter(Boolean)
	}	
	
	concatenateWithSpace(value, newValue)
	{
		if(value == null)
		{
			value = newValue
		}
		else
		{
			value = value + ' ' + newValue;
		}
		return value
	}
	
	removeDots(value)
	{
		return value.replace(/\./g, "");//replace all occurrences dots
	}
	
	convertMonetaryData(value)
	{
		value = value.replace(/\./g, ""); //replace all occurrences dots
		value = value.replace(/\,/g, ""); //replace all occurrences comma
		return value.replace(/[a-zA-Z]/g, ""); 
	}
	
}

/**
 * 
 * This are some test
 */

function getValueFromTextArea()
{
    var lines = document.getElementById("input_area").value
    
    var transform = new TransformData()
    console.log(transform.execute(lines))
    
}


console.log('Test # 1 - Formal test')
var lines = null


lines = '100000  ATIVO             1000  300   500   1200\n' +
		'110000  ATIVO CIRCULANTE  500   100   200   600\n' +
		'111000  DISPONIVEL        200   100   50    150\n' +
	    '200000  PASSIVO           800   250   450   1000'
	
	
var test_1 = new TransformData()
console.log(test_1.execute(lines))


console.log('Test # 2, Input = null')
lines = null
var test_2 = new TransformData()
console.log(test_2.execute(lines))

console.log('Test # 3, Input = empty')
lines = ''
var test_3 = new TransformData()
console.log(test_3.execute(lines))

console.log('Test # 4, a line is empty')

lines = '100000  ATIVO             1000  300   500   1200\n' +
		'110000  ATIVO CIRCULANTE  500   100   200   600\n' +
		'\n' +
		'111000  DISPONIVEL        200   100   50    150\n' +
	    '200000  PASSIVO           800   250   450   1000'
	
		
var test_4 = new TransformData()
console.log(test_4.execute(lines))

console.log('Test # 5, empty spaces at the lines begining')

lines = '100000  ATIVO             1000  300   500   1200\n' +
		'  110000  ATIVO CIRCULANTE  500   100   200   600\n' +
		'\n' +
		'  111000  DISPONIVEL        200   100   50    150\n' +
	    '200000  PASSIVO           800   250   450   1000'
	

var test_5 = new TransformData()
console.log(test_5.execute(lines))
 

console.log('Test # 6 - Formal test -LEVEL 2')
var lines = null


lines = '1				  ATIVO							1.120.807,67D		527.081,41	\n' +
		'1.1				     Ativo Circulante							130.288,57D		\n'  +
		'1.1.2.02				           Bradesco Conta: 9999999-9						\n'+
		'1.1.2.02				           Bradesco Conta: 9999999-9		1.120.807,67D		527.081,41\n' +
		'2				  PASSIVO							1.080.167,44C		0	 \n' +
		'2.3				     PATRIMONIO SOCIAL							1.080.167,44C		\n' + 
		'3.1.2				        Despesas Administrativas e de Estrutur	'
	
	
var test_6 = new TransformData()
console.log(test_6.execute(lines))


console.log('Test # 7 - Numbers contain comma or dots  ')
var lines = null


lines = '1				  ATIVO							1.120.807,67D		527.081,41	\n' +
		'1.1				     Ativo Circulante							130.288,57D		\n'  +
		'1.1.2.02				           Bradesco Conta: 9999999-9						\n'+
		'1.1.2.02				           Bradesco Conta: 9999999-9		1.120.807,67D		527.081,41\n' +
		'1.1.2.02				           Bradesco Conta: 9999999-9		1.120.807-67D		527.081,41 \n' +
		'1.1.2.02				           Bradesco Conta: 9999999-9		807,67D		527.081,41 '
	
	
var test_7 = new TransformData()
console.log(test_7.execute(lines))







