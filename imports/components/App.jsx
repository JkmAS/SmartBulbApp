import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import ReactJson from 'react-json-view';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

export default class App extends Component {

    constructor() {
        super();
        this.state = {
            isLoading: true,
            ip: '',
            onOff: false,
            bulbName: '',
            hue: 0, // <0,255>
            saturation: 0, // <0,100>
            color_temp: 2500, // <2500,9000>
            brightness: 0, // <0,100>

            info: {},
            cloud: {},
            details: {},
        };
    }

    componentDidMount() {
        this.scan();
    }

    scan = () => {
        Meteor.call('scan', (err, res) => {
            this.setState({isLoading: false});
            if(err) {
                alert("Error, check the console logs");
                console.log(err);
            } else {
                this.setState({
                    ip: res.ip,
                    bulbName: res.name,
                });
                this.info();
                this.cloud();
                this.details();
            }
        });
    };

    info = () => {
        Meteor.call('info', this.state.ip, (err, res) => {
            if(err) {
                alert("Error, check the console logs");
                console.error(err);
            } else {
                this.setState({
                    info: res,
                    onOff: (res.light_state.on_off === 1),
                    hue: res.light_state.hue,
                    saturation: res.light_state.saturation,
                    color_temp: (res.light_state.color_temp === 0 ? 2500 : res.light_state.color_temp),
                    brightness: res.light_state.brightness,
                });
            }
        });
    };

    cloud = () => {
        Meteor.call('cloud', this.state.ip, (err, res) => {
            if(err) {
                alert("Error, check the console logs");
                console.error(err);
            } else {
                this.setState({ cloud: res });
            }
        });
    };

    details = () => {
        Meteor.call('details', this.state.ip, (err, res) => {
            if(err) {
                alert("Error, check the console logs");
                console.error(err);
            } else {
                this.setState({ details: res });
            }
        });
    };

    setPower = () => {
        Meteor.call('power', this.state.ip, !this.state.onOff, (err, res) => {
            if(err) {
                alert("Error, check the console logs");
                console.error(err);
            } else {
                this.setState({onOff: !this.state.onOff});
            }
        });
    };

    set = (colorTemp = false) => {
        let obj = {
            hue: this.state.hue,
            saturation: this.state.saturation,
            brightness: this.state.brightness,
            color_temp: (colorTemp ? this.state.color_temp : 0),
        };
        Meteor.call('set', this.state.ip, 5, obj, (err, res) => {
            if(err) {
                alert("Error, check the console logs");
                console.error(err);
            }
        });
    };

    setHue = (value) => {
        this.setState({hue: value});
        this.set(false);
    };

    setSaturation = (value) => {
        this.setState({saturation: value});
        this.set(false);
    };

    setBrightness = (value) => {
        this.setState({brightness: value});
        this.set(false);
    };

    setColorTemp = (value) => {
        this.setState({color_temp: value});
        this.set(true);
    };

    render() {
        return (
            <div>
                <strong className="headline">IP: {(this.state.isLoading ? 'Fetching IP...' : this.state.ip)}</strong>
                <strong className="headline">Name: {(this.state.isLoading ? 'Fetching bulb...' : this.state.bulbName)}</strong>
                <strong className="headline">Bulb:</strong>
                <svg  onClick={this.setPower} className={"bulb" + (this.state.onOff ? "" : " bulb--off")} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 202.875 381.2525" height="381.2525" width="202.875">
                    <g transform="matrix(1.25,0,0,-1.25,-1418.7,450.47375)" fill="rgb(239, 241, 245)">
                        <g transform="scale(0.1,0.1)">
                            <path d="m 11795.4,1298.81 731.4,0 0,252.5 -422.722,0 -308.678,0 z" />
                            <path d="m 12960,2871.07 -1597.8,0 c -8.4,-52.15 -12.6,-104.95 -12.6,-157.14 0,-377.34 125.3,-610.08 225.9,-797.07 40.3,-74.84 75.1,-139.48 97.7,-204.38 7.5,-21.64 15,-44.57 22.2,-68.17 11.6,-37.68 45.7,-63 85,-63 l 761.4,0 c 39.3,0 73.4,25.32 85,63 7.1,23.31 14.6,46.25 22.2,68.16 22.6,64.91 57.4,129.55 97.7,204.38 100.6,187 225.9,419.73 225.9,797.08 0,52.24 -4.2,105.04 -12.6,157.14 z"/>
                            <path d="m 12472,1049.03 -621.8,0 c -18,0 -32.7,-14.7 -32.7,-32.77 l 0,-30.99 c 0,-18.079 14.7,-32.77 32.7,-32.77 l 621.8,0 c 18,0 32.7,14.691 32.7,32.77 l 0,30.99 c 0,18.07 -14.7,32.77 -32.7,32.77 z" />
                            <path d="m 11795.4,1133.55 c 0,-30.06 24.5,-54.52 54.5,-54.52 l 622.4,0 c 30,0 54.5,24.46 54.5,54.52 l 0,135.26 -731.4,0 z" />
                            <path fill={(this.state.onOff ? `hsl(${this.state.hue},${this.state.saturation}%,${this.state.brightness - 5}%)` : '#4e4949')} d="m 12722.8,3354.6 c -151.9,158.37 -356.6,249.19 -561.7,249.19 -205.1,0 -409.8,-90.82 -561.8,-249.19 -119.1,-124.17 -198.5,-281.03 -231.8,-453.53 l 1587.2,0 c -33.3,172.5 -112.7,329.36 -231.9,453.53 z" />
                            <path d="m 12013.6,583.309 c 11.9,-18.496 32.3,-29.539 54.3,-29.539 l 186.4,0 c 22,0 42.4,11.043 54.3,29.539 l 55.8,86.121 -406.6,0 z" />
                            <path d="m 12472,795.961 -621.8,0 c -18,0 -32.7,-14.691 -32.7,-32.77 l 0,-30.992 c 0,-18.07 14.7,-32.769 32.7,-32.769 l 621.8,0 c 18,0 32.7,14.699 32.7,32.769 l 0,30.992 c 0,18.079 -14.7,32.77 -32.7,32.77 z" />
                            <path d="m 12472,922.5 -621.8,0 c -18,0 -32.7,-14.699 -32.7,-32.781 l 0,-30.977 c 0,-18.082 14.7,-32.781 32.7,-32.781 l 621.8,0 c 18,0 32.7,14.699 32.7,32.781 l 0,30.977 c 0,18.082 -14.7,32.781 -32.7,32.781" />
                        </g>
                    </g>
                </svg>

                <strong className="headline">Hue:</strong>
                <InputRange
                    minValue={0}
                    maxValue={255}
                    value={this.state.hue}
                    onChange={value => this.setHue(value)}
                />
                <strong className="headline">Saturation:</strong>
                <InputRange
                    minValue={0}
                    maxValue={100}
                    value={this.state.saturation}
                    onChange={value => this.setSaturation(value)}
                />
                <strong className="headline">Brightness:</strong>
                <InputRange
                    minValue={0}
                    maxValue={100}
                    value={this.state.brightness}
                    onChange={value => this.setBrightness(value)}
                />
                <strong className="headline">Color temperature:</strong>
                <InputRange
                    minValue={2500}
                    maxValue={9000}
                    value={this.state.color_temp}
                    onChange={value => this.setColorTemp(value)}
                />

                <strong className="headline">Info:</strong>
                <ReactJson
                    src={this.state.info}
                    collapsed={true}
                    theme="ocean"
                    enableClipboard={false}
                />
                <strong className="headline">Cloud:</strong>
                <ReactJson
                    src={this.state.cloud}
                    collapsed={true}
                    theme="ocean"
                    enableClipboard={false}
                />
                <strong className="headline">Bulb details:</strong>
                <ReactJson
                    src={this.state.details}
                    collapsed={true}
                    theme="ocean"
                    enableClipboard={false}
                />
            </div>
        );
    }
}