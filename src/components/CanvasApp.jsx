//basic sections
import React , {Component} from 'react'
import { render } from 'react-dom'
//socket section
//import it from npm
import io from 'socket.io-client';
//establish your connection and now you should be able to use it
const socket = io()
let canvas
let colors
let drawing = false   
let current = {
    color: 'black'
};
let context

class CanvasApp extends Component {
    constructor(props) {
        super(props)

        this.drawLine = this.drawLine.bind(this)
        this.onMouseDown = this.onMouseDown.bind(this)
        this.onMouseUp = this.onMouseUp.bind(this)
        this.onMouseMove = this.onMouseMove.bind(this)
        this.onColorUpdate = this.onColorUpdate.bind(this)
        this.throttle = this.throttle.bind(this)
        this.onDrawingEvent = this.onDrawingEvent.bind(this)
        this.onResize = this.onResize.bind(this)
    };

    drawLine (x0, y0, x1, y1, color, emit){
        context.beginPath();
        context.moveTo(x0, y0);
        context.lineTo(x1, y1);
        context.strokeStyle = color;
        context.lineWidth = 2;
        context.stroke();
        context.closePath();
    
        if (!emit) { return; }
        var w = canvas.width;
        var h = canvas.height;
    
        socket.emit('drawing', {
          x0: x0 / w,
          y0: y0 / h,
          x1: x1 / w,
          y1: y1 / h,
          color: color
        });
    }

    onMouseDown(e){
    drawing = true;
    current.x = e.clientX||e.touches[0].clientX;
    current.y = e.clientY||e.touches[0].clientY;
    }

    onMouseUp(e){
        if (!drawing) { return; }
        drawing = false;
        this.drawLine(current.x, current.y, e.clientX||e.touches[0].clientX, e.clientY||e.touches[0].clientY, current.color, true);
      }
    
    onMouseMove(e){
        if (!drawing) { return; }
        this.drawLine(current.x, current.y, e.clientX||e.touches[0].clientX, e.clientY||e.touches[0].clientY, current.color, true);
        current.x = e.clientX||e.touches[0].clientX;
        current.y = e.clientY||e.touches[0].clientY;
    }

    onColorUpdate(e){
        current.color = e.target.className.split(' ')[1];
    }

    // limit the number of events per second
    throttle(callback, delay) {
        var previousCall = new Date().getTime();
        return function() {
            var time = new Date().getTime();

            if ((time - previousCall) >= delay) {
            previousCall = time;
            callback.apply(null, arguments);
            }
        };
    }

    onDrawingEvent(data){
        var w = canvas.width;
        var h = canvas.height;
        this.drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
    }

    // make the canvas fill its parent
    onResize() {
        canvas.width = window.innerWidth/2;
        canvas.height = window.innerHeight/2;
    }

    componentDidMount() {
        canvas = document.querySelector('.whiteboard')
        colors = document.getElementsByClassName('color');
        context = canvas.getContext('2d');

        
        var drawing = false;

        canvas.addEventListener('mousedown', this.onMouseDown, false);
        canvas.addEventListener('mouseup', this.onMouseUp, false);
        canvas.addEventListener('mouseout', this.onMouseUp, false);
        canvas.addEventListener('mousemove', this.throttle(this.onMouseMove, 10), false);

        //Touch support for mobile devices
        canvas.addEventListener('touchstart', this.onMouseDown, false);
        canvas.addEventListener('touchend', this.onMouseUp, false);
        canvas.addEventListener('touchcancel', this.onMouseUp, false);
        canvas.addEventListener('touchmove', this.throttle(this.onMouseMove, 10), false);

        for (var i = 0; i < colors.length; i++){
            colors[i].addEventListener('click', this.onColorUpdate, false);
        }

        socket.on('drawing', this.onDrawingEvent);
        window.addEventListener('resize', this.onResize, false);
        this.onResize();

    }

    render() {        
        return (
          <div>
            <canvas className="whiteboard" ></canvas>

            {/* <div className="colors">
                <div className="color black"></div>
                <div className="color red"></div>
                <div className="color green"></div>
                <div className="color blue"></div>
                <div className="color yellow"></div>
            </div> */}
          </div>  
        )
    }    
}

export default CanvasApp


