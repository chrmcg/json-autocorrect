# JSON Autocorrect
Try it out: [json.chrmcg.io](https://json.chrmcg.io)

## Why?
- JSON is annoying to write & edit because we're used to writing JS objects, in which:
    - You don't have to put quotes around object keys
    - You can use single-quotes if that's your preference
    - Trailing commas are allowed (and useful when moving lines around)
- So here's a JSON parser that corrects your quotes and commas for you!
    - You can ignore commas completely! (As long as you use newlines)
    - Never quote another key! Wanna write `{foo: "bar", 42: "baz"}`? Go for it!
        - You do still have to quote strings
            - But you can use single-quotes!

## Usage
- As a React component ([see it in action](https://json.chrmcg.io)):
    - `npm install json-autocorrect`
    - or `yarn add json-autocorrect`
```
import JsonEditor from 'json-autocorrect';

// ...

render() {
    return (
        <JsonEditor
            json={this.state.myJsonObject}
            onChange={obj => this.setState({myJsonObject: obj})}
        />
    );
}
```

- As a standalone parser (drop-in replacement for `JSON.parse`):
```
import { parse } from 'json-autocorrect';

const myAlmostCorrectJson = `
{
    "foo": "bar",
    "baz": 5,
}
`;

// Throws an error because of the trailing comma
JSON.parse(myAlmostCorrectJson);

// Returns the object you wanted
parse(myAlmostCorrectJson);
```

## How the React component works
It's a big text box. As you type, the border color indicates the parseability of the JSON within:
- Red border: JSON cannot be parsed
- Blue border: JSON is valid (or close enough to be corrected)
- No border: JSON hasn't changed (is identical to `props.json` value)

When you unfocus the textarea, if the border is blue, the component will:
- forgivingly parse your JSON, adding/removing commas and quotes as needed
- concisely [format](https://github.com/chrmcg/json-autocorrect/blob/master/proj/src/stringify.js) the result
- pass the corrected and formatted JSON to the `onChange` prop

## Contributing
- Append `#debug` to the demo URL, or pass `debug={true}` to the component, to enable some useful console logs
- Add some tests!
- Send a PR!
- Try it out and open an issue!

## License
- [MIT](LICENSE)
