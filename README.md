# Permissive JSON editor

## Functionality
- Missing commas are added at newlines
- Extra commas are removed for you
- Missing quotes are added to object keys
- Single quotes are replaced with double quotes

## Implementation
- React component (`JsonBox.js`)
- Relies on `permissiveJsonParse` function (`parse.js`)
    - This is a drop-in replacement for `JSON.parse`

## Usage
It's just one big text box.
- Red border: JSON is invalid
- Blue border: JSON is valid (or close enough); click outside box to reformat

## Contributing
- Append `#debug` to the URL to enable some useful console logs
- Add some tests!
- Send a PR!
- Try it out and open an issue!

## License
- [MIT](LICENSE)
