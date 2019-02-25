//Database Username and Password

module.exports = {
  db: {
    uri: 'mongodb+srv://printsuser:uf2019swe@prints-cluster-cdipl.mongodb.net/test?retryWrites=true', //place the URI of your mongo database here.
  },
  port: process.env.PORT || 8080
};
