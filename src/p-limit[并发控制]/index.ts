type Fn = Function
type Args = unknown[]

export function pLimit(_count: number) {
  if (!((Number.isInteger(_count) || _count === Infinity) && _count > 0)) {
    throw new TypeError('Expected `count` to be a number from 1 and up');
  }

  const MAX_COUNT = _count
  let activeCount = 0

  const queue: Fn[] = []

  function generator(fn: Fn, ...args: Args) {
    return new Promise((resolve) => {
      enqueue(fn, resolve, ...args);
    })
  }

  function enqueue(fn: Fn, resolve: any, ...args: Args) {
    queue.push(() => run(fn, resolve, ...args));

    (async () => {
      await Promise.resolve();

      if (activeCount < MAX_COUNT && queue.length > 0) {
        queue.shift()?.();
      }
    })();
  }

  async function run(fn: Fn, resolve: any, ...args: Args) {
    activeCount++

    const result = (() => fn(...args))()

    resolve(result)

    try {
      await result
    } catch (error) {
    }

    next()
  }

  function next() {
    activeCount--

    if (queue.length > 0) {
      queue.shift()?.()
    }
  }

  Object.defineProperties(generator, {
    activeCount: {
      get: () => activeCount
    },
    pendingCount: {
      get: () => queue.length
    },
    clearQueue: {
      value: () => {
        queue.length = 0;
      }
    }
  });

  return generator
}
