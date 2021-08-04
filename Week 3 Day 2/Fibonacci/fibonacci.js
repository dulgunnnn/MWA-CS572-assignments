const _fib = (number) => {
  if (number < 0) return 0;
  if (number <= 2) return 1;
  else return _fib(number - 1) + _fib(number - 2);
};

const fibonacciPromise = (number) => {
  return new Promise((resolve, reject) => {
    if (number < 0) reject({ number: number, fib: 0 });
    else if (number <= 2) reject({ number: number, fib: 1 });
    else resolve({ number: number, fib: _fib(number) });
  });
};

const success = (response) => {
  console.log(`Fibonacci of ${response.number} is ${response.fib}`);
};

const failed = (error) => {
  console.log(`Fibonacci of ${error.number} not found => ${error.fib}`);
};

console.log("1: App start");

fibonacciPromise(30).then(success.bind(null)).catch(failed.bind(null));
fibonacciPromise(-10).then(success.bind(null)).catch(failed.bind(null));
fibonacciPromise(2).then(success.bind(null)).catch(failed.bind(null));

console.log("2: App end");
