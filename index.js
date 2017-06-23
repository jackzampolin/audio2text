// Get a reference to the Cloud Storage component
const storage = require('@google-cloud/storage')();
// Get a reference to the Cloud Vision API component
const speech = require('@google-cloud/speech')();

/**
 * Background Cloud Function to be triggered by Cloud Storage.
 *
 * @param {object} event The Cloud Functions event.
 * @param {function} The callback function.
 */
exports.audio2text = function (event, callback) {
  const file = event.data;
  console.log(`uploaded file ${file.name}, beginning transcription...`)
  
  var config = {
    encoding: 'FLAC',
    languageCode: 'en-US',
    sampleRateHertz: 44100,
    verbose: true
  };
  
  speech.startRecognition(`gs://influx-audio-upload/${file.name}`, config)
    .then(function(data) {
      console.log("apiResponse: ", data[1])
      console.log("Operation started")
      data[0].on("error", (err) => {
        console.log("Operation err")
        console.log(err)
      }).on("complete", (results) => {
        console.log("Operation complete")
        results.forEach((element) =>{
          console.log(element.transcript)
        })
      })
    }).catch(err => {
      console.log("in error")
      console.log(err)
    })
  console.log("end of function")
  callback();
};
