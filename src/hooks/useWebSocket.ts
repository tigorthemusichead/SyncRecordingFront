import { useEffect } from 'react'

interface useWebSocketProps {
    action: string
    callback: (data: MessageEvent['data']) => any
}

const useWebSocket = ({ action, callback }: useWebSocketProps): void => {
    useEffect(() => {
        const websocket = new WebSocket('ws://localhost:1337')

        websocket.onopen = () => {
            console.log('connected')
        }

        websocket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data)
                console.log(data)
                if( action === data.action) {
                    callback(data)
                }
            } catch (err) {
                console.log(event)
            }
        }

        return () => {
            websocket.close()
        }
    }, [])
}

export default useWebSocket
