const express = require("express");
const app = express();

const request = require("request");

const port = process.env.PORT || 8080;

const url = "https://time.com/";
let result=[];
let result2=[];
function find(x)
{
  let t=x.split(">");
  let ref=t[1].split("=");
  let heading=t[2].split("<");
  const news  = {
    title: heading[0],
    link: "https://time.com/"+ref[1],
  };
  result.push(news);
  return;
}
 app.get("/getTimeNews", (req, res) => {
    request(url, function (error, response, html){
        result=[];
  let string1=html.replace(/["]+/g, '');
  let string2=string1.replace(/(\r\n|\n|\r|\t)/gm,"");
  let final=string2.replace(/\s\s+/g, ' ');
  let split_by_header=final.split("</header>");
  let split_by_lead=split_by_header[1].match(/<section(.)class(.*?)lead(.*?)>(.*?)<\/section>/g);
  let split_by_secondary=split_by_lead[0].match(/div(.)class[=]secondary(.)>(.*?)<\/article>(.)<\/div>/g);
  let split_by_title1=split_by_secondary[0].match(/<h\d(.*?)title>(.*?)<\/h\d>/g);
 split_by_title1.forEach(find);

  let split_by_spotlight=split_by_header[1].match(/<section(.)class=homepage-module(.)spotlight(.*?)>(.*?)<\/section>/g);
  let split_by_breaking_point=split_by_spotlight[0].match(/<ul(.)class(.*?)breaking(.)point>(.*?)<\/ul>/g);
  let split_by_li=split_by_breaking_point[0].match(/<li((?!show-credit).)*class((?!show-credit).)*item(.)show(.*?)>(.*?)<\/li>/g);
  let split_by_title2=split_by_li[0].match(/<h\d(.*?)title>(.*?)<\/h\d>/g);
 split_by_title2.forEach(find);

  let split_by_topic=split_by_header[1].match(/<section(.)class=homepage-module(.)topic(.*?)>(.*?)<\/section>/g);
  let split_by_coronavirus=split_by_topic[0].match(/<ul(.)class(.*?)coronavirus(.)in-depth>(.*?)<\/ul>/g);
  let split_by_item=split_by_coronavirus[0].match(/<li((?!show-credit).)*class((?!show-credit).)*item(.)show(.*?)>(.*?)<\/li>/g);
  let split_by_title3=split_by_item[0].match(/<h\d(.*?)title>(.*?)<\/h\d>/g);
  find(split_by_title3[0]);

      res.json({ news: result });
    });
 });
function find2(x)
{
    let t=x.split(">");
    let ref=t[1].split("=");
    let heading=t[2].split("<");
    const news  = {
        title: heading[0],
        link: "https://time.com/"+ref[1],
    };
    result2.push(news);
    return;
}
  
app.get("/getallTimeNews", (req, res) => {
    request(url, function (error, response, html) {
        result2=[];
        let split_allnews=html.match(/<h(.)(.*[\s+\"\']title[\s+\"\'].*)>(.*?)<\/h\1>/g);
        // console.log(value);
        split_allnews.forEach(find2);
       res.json({ news: result2 });
    });
 });


app.listen(port, () => {
  console.log(`App started at port ${port}`);
});
