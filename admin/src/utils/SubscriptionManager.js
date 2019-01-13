import _uniqueId from "lodash/uniqueId";

const createSubscriptionManager = () => {
  const subscriptions = {};
  return {
    subscribe: (contractEvent, callback) => {
      const subscriptionId = _uniqueId();
      const subscription = contractEvent({}, callback);
      subscriptions[subscriptionId] = subscription;
      return subscriptionId;
    },
    clear: subscriptionId => {
      if (subscriptions[subscriptionId]) {
        subscriptions[subscriptionId].unsubscribe();
        subscriptions[subscriptionId] = null;
      }
    }
  };
};

export default createSubscriptionManager;
