const express = require(express);
const React = require("react");

// using renderToString func to render React Components into HTML on the Client
const renderToString = require("react-dom/server").renderToString;

const Home = require("./client/components/Home").default;

const app = express();

app.get("/", (req, res) => {
  // note - passing a react component here just as in ReactDom.render()
  const content = renderToString(<Home />);

  res.status(200).send(content);
});

app.listen(3005, () => {
  console.log("listening @ port 3005!");
});
