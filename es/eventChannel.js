var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import { eventChannel, END } from 'redux-saga';

export default function createEventChannel(options) {
    var defaultOptions = { channelName: '@@RACCOON/GLOBAL', domain: '@@RACCOON/DOMAIN' };
    options = _extends({}, defaultOptions, options);

    return eventChannel(function (emitter) {
        window.addEventListener(options.channelName, function (e) {
            if (e.detail) {
                var payload = JSON.parse(e.detail);

                // If the user provided domain, we should filter out the events that stemmed from our system.
                if (payload.domain !== options.domain) {
                    emitter(payload);
                }
            }
        });

        var unsubsribe = function unsubsribe() {
            window.removeEventListener(options.channelName);
        };

        return unsubsribe;
    });
}