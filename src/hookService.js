const { default: axios } = require("axios");
let settings = {};
const myService = {
    setSettings : function(inpSetttings){
        settings = inpSetttings;
    },
    callPost : function (inpData) {
        const config = {
            headers: {},
            method: 'post',
            url: settings.url,
            data: inpData,
            
        }
        config.headers.Authorization = 'MSAuth apikey='+settings.apiKey+', secretkey='+settings.secretKey
        return axios(config);
    },
    handlePoastCall : function(inpData1){
        this.callPost(inpData1).then(function (response) {
            // handle success
            console.log(response);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
          });
    }
}
module.exports = myService;