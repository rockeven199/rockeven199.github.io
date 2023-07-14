const fs = require("fs");
const path = require("path");
const { ipcMain } = require("electron");

const getArticleJSON = () => {
  let filePath = "../../../article/article_list.json";
  let getJSON = fs.readFileSync(path.resolve(__dirname, filePath), {
    encoding: "utf-8",
  });

  let newString = {
    a: "1",
    b: "2",
    c: "3",
  };
  let temp = JSON.parse(getJSON);
  temp.push(newString);
  fs.writeFileSync(path.resolve(__dirname, filePath), JSON.stringify(temp));
};

getArticleJSON();

module.exports = {
  getArticleJSON,
};
