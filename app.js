const express = require("express");
const app = express();

const request = require("request");

const port = process.env.PORT || 8080;

const url = "https://time.com/";


function find(items)
{
  let result=[];
  for(item of items)
  { 
    let t=item.split(">");
    let ref=t[1].split("=");
    let heading=t[2].split("<");
    const news  = {
      title: heading[0],
      link: "https://time.com/"+ref[1],
    };
    result.push(news);
  }
  return result;
}

function splitting(html)
{
    let string1=html.replace(/["]+/g, '');
    let string2=string1.replace(/(\r\n|\n|\r|\t)/gm,"");
    let final=string2.replace(/\s\s+/g, ' ');
    let split_by_header=final.split("</header>");
    return split_by_header;
}

 
app.get("/getTimeNews", (req, res) => {
    request(url, function (error, response, html){

    let split_header=splitting(html);
    let split_by_lead=split_header[1].match(/<section[^<>]*lead?[^<>]*>(.*?)<\/section>/g);
    let split_by_secondary=split_by_lead[0].match(/div[^<>]*secondary(.)>(.*?)<\/article>(.)<\/div>/g);
    let split_by_title1=split_by_secondary[0].match(/<h(.)[^<>]*title?[^<>]*>(.*?)<\/h\1>/g);
    let arr1=find(split_by_title1);

    let split_by_spotlight=split_header[1].match(/<section[^<>]*spotlight[^<>]*>(.*?)<\/section>/g);
    let split_by_breaking_point=split_by_spotlight[0].match(/<ul[^<>]*breaking(.)point?[^<>]*>(.*?)<\/ul>/g);
    let split_by_li=split_by_breaking_point[0].match(/<li((?!show-credit).)*item(.)show?[^<>]*>(.*?)<\/li>/g);
    let split_by_title2=split_by_li[0].match(/<h(.)[^<>]*title?[^<>]*>(.*?)<\/h\1>/g);
    let arr2=find(split_by_title2);

    let split_by_topic=split_header[1].match(/<section[^<>]*topic[^<>]*>(.*?)<\/section>/g);
    let split_by_coronavirus=split_by_topic[0].match(/<ul[^<>]*coronavirus(.)in-depth?[^<>]*>(.*?)<\/ul>/g);
    let split_by_item=split_by_coronavirus[0].match(/<li((?!show-credit).)*?item(.)show?[^<>]*>(.*?)<\/li>/g);
    let split_by_title3=split_by_item[0].match(/<h(.)[^<>]*title?[^<>]*>(.*?)<\/h\1>/g);
    let arr3=find(split_by_title3);
        let arr=arr1.concat(arr2,arr3);
        res.json({ news: arr });
      });
  });

app.get("/getLatestStories", (req, res) => {
    request(url, function (error, response, html){

    let split=splitting(html);
    let split_by_latest=split[1].match(/<section[^<>]*latest?[^<>]*>(.*?)<\/section>/g);
    let split_by_ol=split_by_latest[0].match(/<ol[^<>]*swipe-h?[^<>]*>(.*?)<\/ol>/g);
    let split_by_stories=split_by_ol[0].match(/<h(.)[^<>]*title?[^<>]*>(.*?)<\/h\1>/g);
    let array=find(split_by_stories);
        res.json({ news: array });
  });
});
  
app.get("/getallTimeNews", (req, res) => {
    request(url, function (error, response, html) {
      
        let split_allnews=html.match(/<h(.)(.*[\s+\"\']title[\s+\"\'].*)>(.*?)<\/h\1>/g);
        let allnews=find(split_allnews);
       res.json({ news: allnews });
    });
});


app.listen(port, () => {
  console.log(`App started at port ${port}`);
});
