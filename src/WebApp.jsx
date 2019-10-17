//basic sections
import React , {Component} from 'react'
import { render } from 'react-dom'
import Cookies from 'js-cookie'
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
        let obj = {
            username: Cookies.get('username'),
            id: socket.id,
            msg: text
        }
        socket.emit('chat message', obj)
    }

    componentDidMount() {
        socket.on('chat message', (data)=>{
            console.log(data)
            let message = `${data.username} says ${data.msg}`
            this.setState({
                textArr: [...this.state.textArr, message]
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
                    <button className='textbutton' onClick={this.handleClick}>Send</button>
                </form>
            </div>
        )
    }    
}

export default WebApp


