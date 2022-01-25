import { LoremIpsum } from "lorem-ipsum";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

let tags = [];

let json_users = [];
let final_json = [];

for (let x = 0; x < 10; x++) {
  let user_stories = Math.floor(Math.random() * 10);

  for (let y = 0; y < user_stories; y++) {
    let numberoftags = Math.floor(Math.random() * 10);
    let output = {
      id: uuidv4(),
      title: lorem.generateWords(2),
      text: lorem.generateSentences(Math.floor(Math.random() * 6)),
      tags: lorem.generateWords(numberoftags).split(" "),
    };
    final_json.push(output);
  }
}
let finaldb = [];
finaldb.push({ confessions: [...final_json] });

const content = JSON.stringify(finaldb, null, 4);

fs.writeFile("db.json", content, "utf8", function (err) {
  if (err) {
    return console.log(err);
  }

  console.log("The file was saved!");
});
