import { Observable, map } from 'rxjs';
import { ObservableSelf, mapSelf } from './index';

describe('rxjs', () => {
  it('example', () =>
    new Promise(done => {
      const result: number[] = []

      const source = new Observable((observer) => {
        let i = 0;
        const timer = setInterval(() => {
          observer.next(++i);
        }, 1000);

        return function unsubscribe() {
          clearInterval(timer);
        };
      });

      const subscription =
        source
          .pipe(
            map((i: any) => ++i),
            map((i) => i * 10)
          )
          .subscribe({
            next: (v) => {
              result.push(v)
            },
            error: (err) => console.error(err),
            complete: () => console.log('complete'),
          });

      setTimeout(() => {
        subscription.unsubscribe();
        expect(result).toEqual([20, 30])
        done(1)
      }, 2500);
    })
  )

  it('self', () =>
    new Promise(done => {
      const result: number[] = []

      const source = new ObservableSelf((observer) => {
        let i = 0;
        const timer = setInterval(() => {
          observer.next(++i);
        }, 1000);

        return function unsubscribe() {
          clearInterval(timer);
        };
      });

      const subscription =
        source
          .pipe(
            mapSelf((i: number) => ++i),
            mapSelf((i: number) => i * 10)
          )
          .subscribe({
            next: (v: number) => {
              result.push(v)
            },
            error: (err: unknown) => console.error(err),
            complete: () => console.log('complete'),
          });

      setTimeout(() => {
        subscription.unsubscribe();
        expect(result).toEqual([20, 30])
        done(1)
      }, 2500);
    })
  )
})

