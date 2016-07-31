import '../css/main.less'
import React from 'react';
import ReactDOM from 'react-dom';
import ColorPicker from 'react-input-colorpicker/ColorPickr';

function changeHandler(colors) {
    console.log(colors);
}

ReactDOM.render(
    <ColorPicker
        label='Color: '
        color={'#3366cc'}
        onChange={changeHandler}
        mode='RGB'
    />,
    document.getElementById('colorPicker')
);
