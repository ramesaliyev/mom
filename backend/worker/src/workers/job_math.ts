import BaseWorker from './base';

export default class JobMathWorker extends BaseWorker {
  consumer(content, resolve, reject) {
    this.notify({
      ...content,
      done: true,
    });

    resolve();
  }
}