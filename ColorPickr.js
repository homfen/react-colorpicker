/**
 * @file ColorPickr
 * @author hongfeng(homfen@gmail.com)
 */

import React, {Component} from 'react'
import ColorPicker from 'rc-color-picker'
import Colr from 'colr'
import {Input} from 'antd'

let colr = new Colr()
let colorMode = {
    HEX: 'RGB',
    RGB: 'RGB',
    RGBA: 'RGB',
    HSB: 'HSB', // HSB === HSV
    HSL: 'HSL'
}

export default class ColorPickr extends Component {
    constructor(props) {
        super(props)
        let color = this.props.color || '#ff0000'
        let alpha = this.props.alpha || 100
        this.state = this.getColor(color, alpha)
        this.state.label = this.props.label
        this.state.mode = this.props.mode || 'RGB'
        this.state.textMode = this.state.mode
        this.state.value = this.colorFormat(color, alpha, this.state.textMode)
        this.state.onChange = this.props.onChange
    }
    getColor(color, alpha) {
        colr = colr.fromHex(color)
        let rgb = colr.toRgbObject()
        let hsv = colr.toHsvObject()
        let hsl = colr.toHslObject()
        return {
            color,
            alpha,
            rgb,
            hsv,
            hsl
        }
    }
    colorFormat(hexColor, alpha, type) {
        let colorObj = this.getColor(hexColor, alpha)
        switch (type) {
            case 'HEX':
                return colorObj.color
            case 'RGB':
                return `rgb(${colorObj.rgb.r}, ${colorObj.rgb.g}, ${colorObj.rgb.b})`
            case 'RGBA':
                let alpha = colorObj.alpha / 100
                return `rgba(${colorObj.rgb.r}, ${colorObj.rgb.g}, ${colorObj.rgb.b}, ${alpha})`
            case 'HSB':
                return `hsb(${colorObj.hsv.h}, ${colorObj.hsv.s}, ${colorObj.hsv.v})`
            case 'HSL':
                return `hsl(${colorObj.hsl.h}, ${colorObj.hsl.s}, ${colorObj.hsl.l})`
            default:
                return colorObj.color
        }
    }
    onColorChange(colors) {
        if (colors.color !== this.state.color || colors.alpha !== this.state.alpha) {
            let color = this.getColor(colors.color, colors.alpha)
            let value
            if (color.alpha === 100) {
                value = this.colorFormat(color.color, 100, this.state.textMode)
            }
            else {
                let alpha = color.alpha / 100
                value = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${alpha})`
            }
            this.setState({
                ...color,
                value
            })
            this.state.onChange && this.state.onChange(color)
        }
    }
    onTextClick(event) {
        if (event.shiftKey && this.state.alpha === 100) {
            let keys = Object.keys(colorMode)
            let len = keys.length
            let textMode = keys[(keys.indexOf(this.state.textMode) + 1) % len]
            let mode = colorMode[textMode]
            let value = this.colorFormat(this.state.color, 100, textMode)
            this.setState({value, textMode, mode})
        }
    }
    onTextChange(event) {
        let originValue = event.target.value;
        let value = originValue.replace(/\s/g, '')
        let regHex = /^#[0-9a-f]{3}|[0-9a-f]{6}$/i
        let regRgb = /^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/i
        let regRgba = /^rgba\((\d{1,3}),(\d{1,3}),(\d{1,3}),(0(\.\d+)?|1(\.0)?)\)$/i
        let regHsv = /^hsv\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/i
        let regHsl = /^hsl\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/i
        if (regHex.test(value)) {
            this.setState({color: value})
        }
        else {
            let matches
            let alpha
            if (matches = value.match(regRgb)) {
                colr = colr.fromRgbArray(matches.slice(1, 4).map(n => +n))
            }
            else if (matches = value.match(regRgba)) {
                colr = colr.fromRgbArray(matches.slice(1, 4).map(n => +n))
                alpha = parseInt(matches[4] * 100, 10)
            }
            else if (matches = value.match(regHsv)) {
                colr = colr.fromHsvArray(matches.slice(1, 4).map(n => +n))
            }
            else if (matches = value.match(regHsl)) {
                colr = colr.fromHslArray(matches.slice(1, 4).map(n => +n))
            }
            if (matches) {
                if (alpha != null) {
                    this.setState({color: colr.toHex(), alpha})
                }
                else {
                    this.setState({color: colr.toHex()})
                }
            }
        }
        this.setState({value: originValue})
    }
    render() {
        let label = this.state.label
            ? this.state.label
            : '';
        return (
            <div className='ColorPickr'>
                <span className='title'>
                    {label}
                </span>
                <div className='content'>
                    <Input
                        type='text'
                        size='small'
                        value={this.state.value}
                        onClick={this.onTextClick.bind(this)}
                        onChange={this.onTextChange.bind(this)}
                        title='Shift + Click to change color format'
                    />
                    <span>
                        <ColorPicker
                            color={this.state.color}
                            alpha={this.state.alpha}
                            onChange={this.onColorChange.bind(this)}
                            mode={this.state.mode}
                        />
                    </span>
                </div>
            </div>
        )
    }
}
