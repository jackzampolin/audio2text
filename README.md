NOT WORKING: This program is currently not working. I've [opened an issue](https://github.com/GoogleCloudPlatform/google-cloud-node/issues/2408) on `@google-cloud/speech` the node repo detailing issue and 

# Serverless audio to text

This is a test to turn [this tutorial](https://cloud.google.com/functions/docs/tutorials/ocr) on Optical Character Recognition with server-less into a speech to text converter.

### General application flow

1. Prepare audio file according to notes
1. Define cloud function on staging bucket (name: `gs://influx-staging-bucket`)
1. Upload `.flac` file into gcloud bucket (name: `gs://influx-audio-upload`)
1. Server-less function kicks off, pulls audio file, calls speech API
1. Function stores converted text into another bucket (name `gs://influx-text-out`)

### Notes

1. To find sample rate, number of channels  `mediainfo myfile.flac`
1. To convert between formats use the `fre:ac` program.
1. To remove an extraneous channel use the `audacity` program.

### Next steps

1. Currently program outputs transcription to stdout, need to modify to store text in a file on cloud storage
1. Currently you need to manually set file type and `sampleRateHertz`. Make function identify this from tags or other from uploaded file