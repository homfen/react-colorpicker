# react-colorpicker
react-colorpicker with input box using rc-color-picker and colr.

## Demo
[https://homfen.github.io/react-colorpicker](https://homfen.github.io/react-colorpicker)

## Installation
```bash
npm install react-input-colorpicker --save
```

## Change color format
Click the input with the Shift key.

## Example Usage
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import ColorPicker from 'react-input-colorpicker';

function changeHandler(colors) {
    console.log(colors);
}

ReactDOM.render(
    <ColorPicker
        label='Color: '
        color={'#36c'}
        onChange={changeHandler}
        mode='RGB'
    />,
    document.getElementById('colorPicker')
);
```

## Snapshots
![hex](http://i.imgur.com/8G3Kaer.jpg)

![rgba](http://i.imgur.com/jFh7fNA.jpg)
