import { eventChannel, END } from 'redux-saga'

export default function createEventChannel(options){
    const defaultOptions = { channelName: '@@RACCOON/GLOBAL', domain: '@@RACCOON/DOMAIN' }
    options = { ...defaultOptions, ...options}

    return eventChannel(emitter => {
        window.addEventListener(options.channelName, function(e){
            if(e.detail){
                const payload = JSON.parse(e.detail)

                // If the user provided domain, we should filter out the events that stemmed from our system.
                if(payload.domain !== options.domain){
                    emitter(payload)
                }
            }
        })

        const unsubsribe = () =>{
            window.removeEventListener(options.channelName)
        }

        return unsubsribe
    })
}
