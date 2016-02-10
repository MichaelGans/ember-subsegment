export default function () {

  var fixtureData = [
    {
      id: 1,
      type: "posts",
      attributes: {
        title: "I love Ouda's class",
        body: "(As quoted by the RateMyProfessor.com website) Ouda is one of the best, " +
        "if not the best, profs in the faculty. Really cares about the students and seems " +
        "to do all he can to improve the program -The Software program would be years behind " +
        "without his influence. His courses have big projects, which can be tough, but it helps " +
        "emphasize the 'learn by doing' approach that is so relevant to SE."
      }
    },
    {
      id: 2,
      type: "posts",
      attributes: {
        title: "Ember is awesome",
        body: "Ember.js is designed to help developers build ambitiously large web applications that are " +
        "competitive with native apps. Doing so requires both new tools and a new vocabulary of concepts. " +
        "We've spent a lot of time borrowing ideas pioneered by native application frameworks like Cocoa and " +
        "Smalltalk." +
        " However, it's important to remember what makes the web special. Many people think that something is " +
        "a web application because it uses technologies like HTML, CSS and JavaScript. In reality, these are " +
        "just implementation details."
      }
    },
    {
      id: 3,
      type: "posts",
      attributes: {
        title: "What is Ember data?!",
        body: "Ember.js's sister library, Ember Data, contains tools to make common operations simple, and make " +
        "it easy to use different backends data formats with your app."
      }
    }
  ];
   var _id = 3;

  this.get('/posts', function () {
    return {data: fixtureData } ;
  });

  this.get('/posts/:post_id', function (db, request) {
    var ID = request.params.post_id;
    var result = fixtureData.filter(function (post) {
      return post.id == ID;
    });

    return {data: result};
  });

  this.post('/posts', function (db, request) {
    _id++;
    var attrs = JSON.parse(request.requestBody).data.attributes;
    var newPost = {
      id: _id,
      type: "posts",
      attributes: attrs
    };
    fixtureData.push(newPost);
    return {data: newPost};
  });

  this.patch('/posts/:post_id', function (db, request) {
    var ID = request.params.post_id-1;
    fixtureData[ID].attributes = JSON.parse(request.requestBody).data.attributes;

    return {data: fixtureData[ID]};
  });

  this.delete('/posts/:post_id', function (db, request) {
    var ID = request.params.post_id;
    var deleted = {};
    for(var i=0;i<fixtureData.length;i++){
      if (fixtureData[i].id == ID){
        deleted = fixtureData[i];
        break;
      }
    }

    var result = fixtureData.filter(function (post) {
      return post.id != ID;
    });

    fixtureData = result;
    return {data: deleted } ;
  });



}

