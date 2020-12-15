//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
var port = process.env.PORT || 3000; 

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const blogContent1 = `You might be asking yourself the question: Is React Native the best choice to develop a mobile game? The short answer is no, React Native is a great solution to develop mobile apps but it has not been created to develop games, there are other languages or technologies (like Unity) more prepared to develop them, this kind of solutions will provide you with a ton of useful features that will make the process easier, faster and more consistent: 3D graphic engine, physics engine, sound management…etc.
However, in my opinion, there are some cases where you can develop a game using RN achieving a very good result. To demonstrate my theory, I´ve created my first game (MemoShape) using this technology and in this post, I will show you how I did it and when using RN is a good idea.
First of all… When can we consider RN as an option?`
const blogContent2 = `React hooks is finally here!!! And I know there has been a whole lot of excitement around the possibilities that this new set of APIs present. If you’re still skeptical about it, then I urge you to check out this medium article so as to understand the problems that the team was trying to solve when they proposed Hooks.
I initially wasn’t as excited as the rest of the community, so I decided to wait until it was officially released in case there were any API changes. So, over the weekend after it was released I decided to read about it and surprisingly (not) there was a lot of articles and posts about hooks and how to get started with them.
I know some might say “Another hooks article, really?”, and to them, I say “Yes…yes and there’s more where that came from”. For this article, we will be building a very simple app using Hooks. In essence, we are not going to be using any class components in this application. And I will be explaining how a few of the APIs work and how they should be used in any application that we might be building.`
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/blog", function(req, res){
  res.render("blog", {blogContent1: blogContent1, blogContent2: blogContent2 });
})

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

app.listen(port, function() {
  console.log("Server started on port 3000");
});
