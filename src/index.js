import React from 'react';
import ReactDOM from 'react-dom';

import DOMpurify from 'dompurify'
import { marked } from 'marked';
import parse from 'html-react-parser';

import './style.css'

const defaultText = "# Welcome to my React Markdown Previewer!\n\n## This is a sub-heading...\n### And here's some other cool stuff:\n\nHeres some code, `<div></div>`, between 2 backticks.\n\n```\n// this is multi-line code:\n\nfunction anotherExample(firstLine, lastLine) {\n  if (firstLine == '```' && lastLine == '```') {\n    return multiLineCode;\n  }\n}\n```\n\nYou can also make text **bold**... whoa!\nOr _italic_.\nOr... wait for it... **_both!_**\nAnd feel free to go crazy ~~crossing stuff out~~.\n\nThere's also [links](https://www.freecodecamp.org), and\n> Block Quotes!\n\nAnd if you want to get really crazy, even tables:\n\nWild Header | Crazy Header | Another Header?\n------------ | ------------- | -------------\nYour content can | be here, and it | can be here....\nAnd here. | Okay. | I think we get it.\n\n- And of course there are lists.\n  - Some are bulleted.\n     - With different indentation levels.\n        - That look like this.\n\n\n1. And there are numbered lists too.\n1. Use just 1s if you want!\n1. And last but not least, let's not forget embedded images:\n\n![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)\n"


marked.setOptions({
  gfm: true,
  breaks: true
})

const Editor = (props) => (
    <div className="editor-wrapper">
        <div class='label'>Editor</div>
        <textarea
          id='editor' 
          value={props.text} 
          onChange={props.change}
        />
    </div>
  )

const Preview = (props) => (
  <div className="preview-wrapper">
    <div class='label'>Preview</div>
    <div id='preview'>
      {parse(props.text)}
    </div>
  </div>
)

class App extends React.Component{
  state = {
    text: defaultText,
    markedText: '',
  }
  
  handleTextChange = (e) =>{
    const {value} = e.target;
    this.setState({
      text: value,
    })
  }
  
  handleParseText = () =>{
    const sanitizedText = DOMpurify.sanitize(marked.parse(this.state.text))
    
    this.setState({
      markedText: sanitizedText,
    })
  }
  
  componentDidMount(){
    this.handleParseText();
  }
  
  componentDidUpdate(prevProps,prevState){
    if(prevState.text === this.state.text) return
    this.handleParseText();
  }
  
  render(){
    return (
    <div>
      <Editor 
        change={this.handleTextChange} 
        text={this.state.text}
      />
      <Preview text={this.state.markedText}/>
    </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))