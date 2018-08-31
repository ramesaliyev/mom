export default class BaseWorker {
  constructor(private readonly mqService) {}

  async queue(name: string, payload: any) {
    return await this.mqService.queue(name, payload);
  }

  async notify(payload) {
    return await this.queue('socket', payload);
  }
}