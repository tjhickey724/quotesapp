// This is the code for the newquote template.  
// It adds a new quote to the database when the user presses the save button.
// It has three local variables which store the author, quote, and likes values
// when the user modifies one of these fields in the browser, the local value is stored here
// when they press on the save button, the new quote is created and inserted into the Quotes collection
 
  
  Template.newquote.events({
	  
	  //'click button#saveQuote': function(event){
	  	'submit form#newquote': function(event) {
		  // read the author and quote text from the browser window
		  var newQuoteText = $("#newquotetext").val();	
		  var newAuthor = $("#newauthor").val();
		  var newSubject = $("#newsubject").val();
		  
		  // and erase the fields so the user can add another quote later
		  $("#newauthor").val("");						
		  $("#newquotetext").val("");
		  $("#newsubject").val("");						
		  
		  // create a new quote object and upload it to the server!
		  var quote = 
		  	{quote:newQuoteText, 
		  		author:newAuthor, 
		  		subject:newSubject,
		  		likes:1, 
		  		createdAt: new Date(),
		  		createdBy: Meteor.user().emails[0].address,
		  		user:Meteor.userId()};  // create the JSON object representing the quote
		 if (newQuoteText.trim()!= "")
		  	Quotes.insert(quote); 
		 else {
		 	console.log(Meteor.user().emails[0].address+" is fooling around!");
		 }
	  }
  	
  })
