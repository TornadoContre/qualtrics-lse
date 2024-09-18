Qualtrics.SurveyEngine.addOnload(function()
{
	/*Place your JavaScript here to run when the page loads*/
	// Setting variables
	let pairNumber = 1;
	let questionId = this.questionId;
	let $ = jQuery;
	
	let firstChoiceKey = 1;
	
	// Disable Handler
    let firstTrack = $("#" + questionId + " ." + questionId + "-" + firstChoiceKey + "-track");
	firstTrack.css("pointer-events", "none")
    
	// Disable Input Text
    let firstInputText = $("#" + questionId + " ." + questionId + "-" + firstChoiceKey + "-result");
    //firstInputText.prop("disabled",true)
    //firstInputText.css("opacity", "1")

	// Custom start
	let aValue = parseInt(Qualtrics.SurveyEngine.getEmbeddedData(pairNumber + "_pairValue_A")) / 2;
	let bValue = parseInt(Qualtrics.SurveyEngine.getEmbeddedData(pairNumber + "_pairValue_B"))
	console.log(aValue);
	console.log(bValue);
	this.setChoiceValue(firstChoiceKey, aValue);
	this.setChoiceValue(2, bValue);
});

Qualtrics.SurveyEngine.addOnReady(function()
{
	/*Place your JavaScript here to run when the page is fully displayed*/

});

Qualtrics.SurveyEngine.addOnUnload(function()
{
	/*Place your JavaScript here to run when the page is unloaded*/

});