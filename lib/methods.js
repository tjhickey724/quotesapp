// here is where we can define operations that the client can ask the server to perform on the collection
// in this case we have one operation which is to count the number of quotes
// this is invoked in the client using the Meteor.call method
// These methods are called asynchronously and so don't return a useful value!

Meteor.methods({
	reset: function(x){
		Quotes.remove({likes:{$gt:x}});
	}
	
})
