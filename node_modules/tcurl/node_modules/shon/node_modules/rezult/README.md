A JavaScript value or error object.

```js
var Result = require("rezult");

function safeJsonParse(string) {
    try {
        return new Result(null, JSON.parse(string));
    } catch (err) {
        return new Result(err);
    }
};

safeJsonParse("{}").toCallback(cb); // cb(null, {})
safeJsonParse("wat").toValue(); // throw SyntaxError
```

MIT License
