export default function createMiddleware(options) {

    var middleware = function middleware(store) {
        return function (next) {
            return function (action) {
                if (action.global) {
                    var coonEvent = new CustomEvent(options.channelName, { detail: JSON.stringify(action) });
                    window.document.dispatchEvent(coonEvent);

                    if (process.env.NODE_ENV === 'development') {
                        console.log('Passing global event on %s channel', window.raccoon.type);
                    }
                }

                return next(action);
            };
        };
    };

    return middleware;
}