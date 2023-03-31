interface SubscribeOptions {
  next?: (val: any) => void,
  error?: (err: any) => void,
  complete?: Function,
}

class Subscription {
  destoryFnList: Function[] = []

  constructor() { }

  add(destoryFn: any) {
    if (typeof destoryFn === 'function') {
      this.destoryFnList.push(destoryFn)
    }
  }

  unsubscribe() {
    this.destoryFnList.forEach(fn => {
      fn()
    })
  }
}
class Subscriber extends Subscription {
  options: SubscribeOptions

  constructor(options: SubscribeOptions) {
    super()
    this.options = options
  }

  next: Required<SubscribeOptions>['next'] = (val: any) => {
    if (this.options.next) {
      this.options.next(val)
    }
  };
  error: Required<SubscribeOptions>['error'] = (err: any) => {
    if (this.options.error) {
      this.options.error(err)
    }
  };
  complete: Required<SubscribeOptions>['complete'] = () => {
    if (this.options.complete) {
      this.options.complete()
    }
  };
}

function pipeFromArray(fns: Function[]) {
  if (fns.length === 0) {
    return (x: any) => x;
  }
  if (fns.length === 1) {
    return fns[0];
  }
  return (input: Function) => {
    return fns.reduce((prev, fn) => fn(prev), input);
  };
}

export class ObservableSelf {
  fn: (arg: Subscriber) => any;

  constructor(fn: (arg: Subscriber) => any) {
    this.fn = fn;
  }

  subscribe(options: SubscribeOptions) {
    const subscriber = new Subscriber(options)
    subscriber.add(this.fn(subscriber))

    return subscriber
  }

  pipe(...operations: Function[]) {
    return pipeFromArray(operations)(this);
  }
}

export const mapSelf = (project: Function) =>
  (observable: ObservableSelf) => new ObservableSelf((subscriber) =>
    observable.subscribe({
      next(value: any) {
        return subscriber.next(project(value));
      },
      error(err: any) {
        subscriber.error(err);
      },
      complete() {
        subscriber.complete();
      },
    })
  );

