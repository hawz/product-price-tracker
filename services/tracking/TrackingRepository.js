import Repository from '../Repository'

const resource = {
  prices: '/prices',
  emailAlert: '/email-alert',
  subscribe: '/subscribe',
  unsubscribe: '/unsubscribe',
}

export default {
  getPrices(itemstoreID) {
    return Repository.get(`${resource.prices}?id=${itemstoreID}`)
  },
  subscribeAlert(payload) {
    return Repository.post(
      `${resource.emailAlert}${resource.subscribe}`,
      payload
    )
  },
  unsubscribeAlert(payload) {
    return Repository.post(
      `${resource.emailAlert}${resource.unsubscribe}`,
      payload
    )
  },
}
