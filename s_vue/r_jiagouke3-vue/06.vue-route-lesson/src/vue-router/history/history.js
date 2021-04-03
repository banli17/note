import History from './base'
export default class BrowserHistory extends History {
    constructor(router){
        super(router);
    }
    getCurrentLocation(){
        return window.location.pathname
    }
}
