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
			
		   arrayLine = these.separateLineBySpace(line)
		
		   if(arrayLine.length == 0)
		   {
			   return
		   }
		   
	       outputData = new OutputData()
	        
	       arrayLine.forEach(function(valueLine) {
	    	   
	    	   switch (column) {
	            case 1:
	            	outputData.setClassifier(valueLine)
	                column = column + 1
	                break;

	            case 2:
	                if (valueLine.match(/^[a-zA-Z]/)) 
	                {
	                	outputData.setDescription(these.concatenateWithSpace(outputData.getDescription(),valueLine))
	                }
	                else
	                {
	                	outputData.setOpeningBalance(valueLine)
	                    column = column + 2
	                }
	                break;
	            case 4:
	            	outputData.setDebit(valueLine)
	                column = column + 1
	                break;
	            case 5:
	            	outputData.setCredit(valueLine)
	                column = column + 1
	                break;
	            case 6:
	            	outputData.setFinalBalance(valueLine)
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
	
	separateLineBySpace(line)
	{
		return line.split(' ').filter(Boolean)
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
	
}

/**
 * 
 * This are some test
 */


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








