/* Dependencies */
var orders = require('../controllers/orders.server.controller.js'), 
    express = require('express'), 
    router = express.Router();

/* 
  These method calls are responsible for routing requests to the correct request handler.
  Take note that it is possible for different controller functions to handle requests to the same route.
 */
router.route('/')
  .get(orders.list)
  .put(orders.update)
  .post(orders.create);


router.route('/:orderId')
  .get(orders.read);
  //.put(users.update)
  //.delete(orders.delete);

router.param('orderId', orders.orderByID);

module.exports = router;