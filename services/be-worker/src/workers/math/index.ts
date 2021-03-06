import BaseWorker from 'workers/base';
import { ServicesConfig } from 'config/services';
import * as req from 'request-promise-native';

export default class MathWorker extends BaseWorker {
  async consume(content, resolve, reject) {
    const { host, port } = ServicesConfig.math;

    if (!content.results) {
      content.results = [];
      content.state = [...content.details];
    }

    const { results, state } = content;
    const { method, numbers } = state.shift();

    let result;
    try {
      console.log('Request to mathservice!');
      result = await req(`http://${host}:${port}/${method}/${numbers}`);
      results.push(JSON.parse(result));
      console.log('Response received from mathservice!');
    } catch (e) {
      return reject();
    }

    if (state.length) {
      this.next(content);
      // this.nextDelayed(3, content);
    } else {
      delete content.state;

      content.details.forEach((detail, index) => {
        detail.result = content.results[index];
      });

      content.done = true;

      await this.queue('job', {
        type: 'db',
        action: 'job.upsert',
        payload: content,
      });

      this.end(content);
    }

    resolve(result);
  }
}