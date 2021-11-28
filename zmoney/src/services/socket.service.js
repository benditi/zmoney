import io from 'socket.io-client'


const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030'
export const socketService = createSocketService()

window.socketService = socketService

socketService.setup()

function createSocketService() {
    var socket = null;
    const socketService = {
        setup() {
            socket = io(baseUrl)
        },
        on(eventName, cb) {
            console.log('event name', eventName);
            socket.on(eventName, cb)
        },
        off(eventName, cb = null) {
            if (!socket) return;
            if (!cb) socket.removeAllListeners(eventName)
            else socket.off(eventName, cb)
        },
        emit(eventName, data) {
            socket.emit(eventName, data)
        },
        terminate() {
            socket = null;
        },
        showContection() {
            return socket.connection
        }
    }
    return socketService
}

