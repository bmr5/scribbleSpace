//basic sections
import React , {Component} from 'react'
import { render } from 'react-dom'

//socket section
//import it from npm
import io from 'socket.io-client';
//establish your connection and now you should be able to use it
const socket = io()


class WebApp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            textArr: ['first one']
        }

        this.handleClick = this.handleClick.bind(this)
    };

    handleClick (e) {
        event.preventDefault()
        let text = document.querySelector('.textinput').value
        socket.emit('chat message', text)
    }

    componentDidMount() {
        socket.on('chat message', (msg)=>{
            console.log('hitting the socket')
            this.setState({
                textArr: [...this.state.textArr, msg]
            })
        })
    }

    render() {
        let chatbox = []
        this.state.textArr.forEach(msg => {
            let elem = <div><p>{msg}</p></div>
            chatbox.push(elem)
        })
        
        return (
            <div className='messagingbox'>
                
                <div className='chatbox'>
                    {chatbox}
                </div>

                <form action="" className='chatinput'>
                    <input className='textinput'/>
                    <button class='textbutton' onClick={this.handleClick}>Send</button>
                </form>
            </div>
        )
    }    
}

export default WebApp


