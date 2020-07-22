const express = require("express");
const app = express();

const request = require("request");

const port = process.env.PORT || 8080;

const url = "https://time.com/";
const result=[];
const result2=[];
function find(x)
{
  var t=x.split(">");
  var ref=t[1].split("=");
  var heading=t[2].split("<");
  const news  = {
    title: heading[0],
    link: "https://time.com/"+ref[1],
  };
  result.push(news);
}
 app.get("/getTimeNews", (req, res) => {
    request(url, function (error, response, html){

  var string1=html.replace(/['"]+/g, '');
  var string2=string1.replace(/(\r\n|\n|\r|\t)/gm,"");
  var final=string2.replace(/\s\s+/g, ' ');
  var temp=final.split("</header>");
  var a=temp[1].match(/<section(.)class(.*?)lead(.*?)>(.*?)<\/section>/g);
  var a1=a[0].match(/div(.)class[=]secondary(.)>(.*?)<\/article>(.)<\/div>/g);
  var a2=a1[0].match(/<h\d(.*?)title>(.*?)<\/h\d>/g);
 // console.log(a2);
  a2.forEach(find);

  var b=temp[1].match(/<section(.)class=homepage-module(.)spotlight(.*?)>(.*?)<\/section>/g);
  var b1=b[0].match(/<ul(.)class(.*?)breaking(.)point>(.*?)<\/ul>/g);
  var b2=b1[0].match(/<li((?!show-credit).)*class((?!show-credit).)*item(.)show(.*?)>(.*?)<\/li>/g);
  var b3=b2[0].match(/<h\d(.*?)title>(.*?)<\/h\d>/g);
 // console.log(b3);
  b3.forEach(find);

  var c=temp[1].match(/<section(.)class=homepage-module(.)topic(.*?)>(.*?)<\/section>/g);
  var c1=c[0].match(/<ul(.)class(.*?)coronavirus(.)in-depth>(.*?)<\/ul>/g);
  var c2=c1[0].match(/<li((?!show-credit).)*class((?!show-credit).)*item(.)show(.*?)>(.*?)<\/li>/g);
  var c3=c2[0].match(/<h\d(.*?)title>(.*?)<\/h\d>/g);
  find(c3[0]);

      res.json({ news: result });
    });
 });
function find2(x)
{
    var t=x.split(">");
    var ref=t[1].split("=");
    var heading=t[2].split("<");
    const news  = {
        title: heading[0],
        link: "https://time.com/"+ref[1],
    };
    result2.push(news);
}
  
app.get("/getallTimeNews", (req, res) => {
    request(url, function (error, response, html) {
        var value=html.match(/<h(.)(.*[\s+\"\']title[\s+\"\'].*)>(.*?)<\/h\1>/g);
        // console.log(value);
        value.forEach(find2);
       res.json({ news: result2 });
    });
 });


app.listen(port, () => {
  console.log(`App started at port ${port}`);
});
