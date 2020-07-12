const express = require("express");
const app = express();

const request = require("request");
const cheerio = require("cheerio");

const port = process.env.PORT || 8080;

const url = "https://time.com/";
app.get("/getTimeNews", (req, res) => {
  request(url, function (error, response, html) {
    var $ = cheerio.load(html);
    const result = [];
    $(".lead .secondary .slide .title").each(function (i, elem) {
      const $elem = $(elem);
      const $link = $elem.find("a");
      const $title = $elem.find("a");
      const news = {
        title: $title.text(),
        link: "https://time.com/"+$link.attr("href"),
      };
      result.push(news);
    });
    $(" .breaking li").each(function (i, elem) {
      const $elem = $(elem);
      var classes = $elem.attr("class");
      if (!classes.includes("show-credit")) {
        const $link = $elem.find(".item .slide .content .title a");
        const $title = $elem.find(".item .slide .content .title a");
        const news = {
          title: $title.text(),
          link: "https://time.com/"+$link.attr("href"),
        };
        result.push(news);
      }
    });
    var count=0;
    $(" .coronavirus li").each(function (i, elem) {
        const $elem = $(elem);
        var classes = $elem.attr("class");
        if (!classes.includes("show-credit")&&count==0) {
          const $link = $elem.find(".item .slide .content .title a");
          const $title = $elem.find(".item .slide .content .title a");
          const news = {
            title: $title.text(),
            link: "https://time.com/"+$link.attr("href"),
          };
          result.push(news);
          count=1;
        }
      });
      
    res.json({ news: result });
  });
});


app.get("/getallTimeNews", (req, res) => {
    request(url, function (error, response, html) {
      var $ = cheerio.load(html);
      const result = [];
      $(".lead .secondary .slide .title").each(function (i, elem) {
        const $elem = $(elem);
        const $link = $elem.find("a");
        const $title = $elem.find("a");
        const news = {
          title: $title.text(),
          link: "https://time.com/"+$link.attr("href"),
        };
        result.push(news);
      });
      $(" .breaking li").each(function (i, elem) {
        const $elem = $(elem);
        var classes = $elem.attr("class");
        if (!classes.includes("show-credit")) {
          const $link = $elem.find(".item .slide .content .title a");
          const $title = $elem.find(".item .slide .content .title a");
          const news = {
            title: $title.text(),
            link: "https://time.com/"+$link.attr("href"),
          };
          result.push(news);
        }
      });
      $(" .coronavirus li").each(function (i, elem) {
          const $elem = $(elem);
          var classes = $elem.attr("class");
          if (!classes.includes("show-credit")) {
            const $link = $elem.find(".item .slide .content .title a");
            const $title = $elem.find(".item .slide .content .title a");
            const news = {
              title: $title.text(),
              link: "https://time.com/"+$link.attr("href"),
            };
            result.push(news);
          }
        });
        $(" .election li").each(function (i, elem) {
          const $elem = $(elem);
          var classes = $elem.attr("class");
          if (!classes.includes("show-credit")) {
            const $link = $elem.find(".item .slide .content .title a");
            const $title = $elem.find(".item .slide .content .title a");
            const news = {
              title: $title.text(),
              link: "https://time.com/"+$link.attr("href"),
            };
            result.push(news);
          }
        });
        $(" .finance li").each(function (i, elem) {
          const $elem = $(elem);
          var classes = $elem.attr("class");
          if (!classes.includes("show-credit")) {
            const $link = $elem.find(".item .slide .content .title a");
            const $title = $elem.find(".item .slide .content .title a");
            const news = {
              title: $title.text(),
              link: "https://time.com/"+$link.attr("href"),
            };
            result.push(news);
          }
        });
        $(" .health li").each(function (i, elem) {
          const $elem = $(elem);
          var classes = $elem.attr("class");
          if (!classes.includes("show-credit")) {
            const $link = $elem.find(".item .slide .content .title a");
            const $title = $elem.find(".item .slide .content .title a");
            const news = {
              title: $title.text(),
              link: "https://time.com/"+$link.attr("href"),
            };
            result.push(news);
          }
        });
      res.json({ news: result });
    });
  });



app.listen(port, () => {
  console.log(`App started at port ${port}`);
});
