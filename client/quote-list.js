Template.quotelist.helpers({
  quotes: function () {
	  return Quotes.find({}); // we are finding all of the quotes on the server to show on the client
  }
});



Template.quotelist.events({
	
  'click button.like': function (event) {
	Quotes.update(this._id,{$inc:{likes: 1}}); // update the current quote by adding 1 to its likes field
  },
  
  'click button.delete': function(event){
	  Quotes.remove(this._id);
  }
});
