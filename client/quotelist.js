Session.set("showNum",5);

Template.quotelist.helpers({
  quotes: function () {
	  return Quotes.find({},
                       {limit:Session.get("showNum"),
                        sort:{createdAt:-1}}
                      ); // we are finding all of the quotes on the server to show on the client
  },
  showNum: function(){
    return Session.get("showNum");
  },
  numQuotes: function(){
	  return Quotes.find().count();
  }
});



Template.quoteLine.helpers({

	alreadyLiked: function(){
		// see if the user is in the list of likers for this quote!
		if (Meteor.user()==undefined)
			return(false);
		
		var myEmail = Meteor.user().emails[0].address;
		var z = _.contains(this.likers,myEmail);
		console.log("alreadyLiked = "+z);
		return z;},
		
	likers: function(){
			return JSON.stringify(this.likers);
		}
		
})

Template.quotelist.events({
	
  'click button.like': function (event) {
	// first check to see if the current user has already liked this quote
	var myEmail = Meteor.user().emails[0].address;
	var alreadyLikes = _.contains(this.likers,myEmail);
	

	// if they haven't liked it yet, then add them to the like list and increment the like count.
	if (!alreadyLikes){
		var likers = this.likers;
		likers.push(myEmail);
		Quotes.update(this._id,{$inc:{likes: 1},$set:{likers:likers}}); 
		Likes.insert({user:Meteor.userId(),quote:this._id});
	} else {
		alert("You already liked this post!!!");
	}
	
  },
  
  'click button.delete': function(event){
	  Quotes.remove(this._id);
  },
  'click button#showMore': function(event){
    Session.set("showNum",2 + Session.get("showNum"))
  },
    'click button#showLess': function(event){
    Session.set("showNum",-2 + Session.get("showNum"))
  }
});

Template.quoteLine.helpers({

  isOwner: function(){
    return (this.user == Meteor.userId()) || (Meteor.userId()=="79ECyD4M2ek4Ffwtj");
    
  }
})
