export default class BaseWorker {
  constructor(private readonly mqService) {}

  async queue(name: string, payload: any) {
    return await this.mqService.sendToQueue(name, payload);
  }

  async delay(queue: string, delay: number, payload: any) {
    return await this.mqService.publishDefaultDelayed(queue, delay, payload);
  }

  async notify(payload) {
    return await this.queue('socket', payload);
  }

  async next(payload: any) {
    return await this.queue('job', payload);
  }

  async nextDelayed(delay: number, payload: any) {
    return await this.delay('job', delay, payload);
  }

  async end(payload: any) {
    return await this.notify(payload);
  }
}