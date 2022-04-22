# Unified Deno Lock
This is a simple and powerful module with zero dependencies, which you can use as a mutex to control race conditions. At its core, this library uses promises to create locks, and everyone then has to wait until the promise is resolved to be able to go forward.

## Usage
You can look at the `./test/lock_test.ts` for usage samples, But basically this is how the locks are used.

```ts
import { Lock } from 'https://deno.land/x/unified_deno_lock/mod.ts';


const myResourceLock = new Lock();


function initializeResource() {

  myResourceLock.lock();

  // do initializations

  myResourceLock.unlock();

}


async function useResource() {

  await myResourceLock.knock(); // waits at this line until lock is unlocked

  // work with the initialized resource

}
```

*Note:* This is not a complete mutex solution that handles every problem in that domain. Although, with this basic lock, you should be able to handle those scenarios.

## Tests
Run tests with `deno test` or with `deno test --watch` to watch for file changes.

## Licence
[MIT](https://opensource.org/licenses/MIT)