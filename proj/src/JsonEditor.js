import React, { Component } from 'react';
import { stringify } from './stringify';
import { parse } from './parse';

class JsonEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: stringify(props.json),
            error: false,
            edited: false,
        };

        this.onClick = this.onClick.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            text: stringify(nextProps.json),
            error: false,
        });
    }

    onChange(text) {
        this.setState({text});
        try {
            parse(text);
            this.setState({error: false, edited: true});
        } catch (e) {
            this.setState({error: true, edited: true});
        }
    }

    onClick() {
        if (this.props.debug) {
            this.showStateAtCaret();
        }
    }

    onKeyPress() {
        if (this.props.debug) {
            this.showStateAtCaret();
        }
    }

    showStateAtCaret() {
        const caret = this.textarea.selectionEnd;
        const [parserCaret, state] = parse(this.state.text, caret);

        this.setState({
            caret,
            parserCaret,
            parserStateAtCaret: state,
        });
    }

    onBlur() {
        try {
            let obj = parse(this.state.text);
            this.setState({error: false, edited: false});

            if (Object.keys(obj).length === 0) {
                obj = {};
            }

            this.props.onChange(obj);
        } catch (e) {
            this.setState({error: true, edited: true});
        }
    }

    render() {
        return (
            <div style={{
                flex: 1,
                position: 'relative',
            }}>
                {this.props.debug ? (
                    <div style={{
                        flex: 0,
                        height: '15px',
                        display: 'block',
                        margin: '3px',
                        fontFamily: 'monospace',
                    }}>
                        {this.state.parserStateAtCaret} [physical {this.state.caret} virtual {this.state.parserCaret}]
                    </div>
                ) : null}

                <textarea
                    value={this.state.text}
                    onChange={evt => this.onChange(evt.target.value)}
                    onKeyUp={this.onKeyPress}
                    onClick={this.onClick}
                    placeholder='JSON goes here'
                    style={{
                        fontFamily: 'monospace',
                        padding: '5px',
                        fontSize: '14px',
                        width: this.props.width + 'px',
                        border: this.state.error ?
                        '4px dashed red' :
                        (this.state.edited ? '4px dashed blue' : '2px solid black'),
                        flex: 1,
                    }}
                    onBlur={this.onBlur}
                    ref={el => {this.textarea = el;}}
                />
            </div>
        );
    }
}

export default JsonEditor;
