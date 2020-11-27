import domModule from './domModule'
import weatherModule from './weatherModule'

const controllerModule = (function() {
    const currentDomModule = new domModule;
    const currentWeatherModule = new weatherModule;

    function init() {
        console.log(1);
    }

    return {
        init
    }
});

export default controllerModule;