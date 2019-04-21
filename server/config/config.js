//Database Username and Password

module.exports = {
  db: {
  	//ORDERONE:
  	//uri: 'mongodb://orderuser:orderpassword1@ds223756.mlab.com:23756/orders',
  	//REALONE
  	//uri: 'mongodb://printsuser:gogators4!@ds255784.mlab.com:55784/users', //place the URI of your mongo database here.
  	//uri: 'mongodb://printsuser:uf2019swe@prints-cluster-shard-00-00-cdipl.mongodb.net:27017,prints-cluster-shard-00-01-cdipl.mongodb.net:27017,prints-cluster-shard-00-02-cdipl.mongodb.net:27017/printsusers?ssl=true&replicaSet=prints-cluster-shard-0&authSource=admin&retryWrites=true',  
  	//uri: 'mongodb://printsuser:uf2019swe@prints-cluster-shard-00-00-cdipl.mongodb.net:27017,prints-cluster-shard-00-01-cdipl.mongodb.net:27017,prints-cluster-shard-00-02-cdipl.mongodb.net:27017/test?ssl=true&replicaSet=prints-cluster-shard-0&authSource=admin&retryWrites=true',
  	// TESTING:
  	uri: 'mongodb://pprints_uf:gatorsR4quality@ds163377.mlab.com:63377/petreeprints',
  },
  port: process.env.PORT || 8080
};
