const { default: axios } = require("axios");



const myService = {
    callPost : function (inpData) {
        const config = {
            headers: {},
            method: 'post',
            url: 'https://api-stage.marksandspencer.com/phoenix-eventcollector/v1/event/mparticle',
            data: inpData,
            
        }
        config.headers.Authorization = 'MSAuth apikey=eo22SGvdPOGZfDID9X91dA0QA2EcbZ3z, secretkey=zun20VU9zxKaS5BR' 
        return axios(config);
    },
    handlePoastCall : function(inpData1){
        this.callPost(inpData1).then(function (response) {
            // handle success
            //console.log(response);
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