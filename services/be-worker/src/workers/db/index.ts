import BaseWorker from 'workers/base';
import './connection';
import actions from './actions';

export default class DBWorker extends BaseWorker {
  async consume(content, resolve, reject) {
    const { action } = content;
    const handler = actions[action];

    if (typeof handler !== 'function') {
      console.log(`Wrong action in DB worker "${action}".`);
      return reject();
    }

    let response;
    try {
      response = await handler(content);
    } catch (e) {
      console.log(`Error in DBWorker action:${action}.`, e);
      return reject();
    }

    console.log(`Response from DBWorker action ${action}`, response);
    resolve(response);
  }
}