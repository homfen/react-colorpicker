import './ColorPickr.less'
import React from 'react'
import ReactDOM from 'react-dom'
import ColorPicker from './ColorPickr'

ReactDOM.render(
    <ColorPicker
        label='Color: '
        color="#FF0"
        mode="#RGB"
        onChange={changeHandler}
    />,
    document.getElementById('colorpicker')
);
