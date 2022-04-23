import { assert } from "https://deno.land/std@0.136.0/testing/asserts.ts";

import { Lock } from '../mod.ts';


Deno.test('basic', async () => {

  const lock = new Lock();
  const startTime = Date.now();


  lock.lock();
  setTimeout(() => lock.unlock(), 1000);


  await lock.knock();


  assert(Date.now() - startTime > 1000);
  assert(Date.now() - startTime < 1100);

});

Deno.test('multiple koncks', async () => {

  const lock = new Lock();
  const startTime = Date.now();

  lock.lock();
  setTimeout(() => lock.unlock(), 1000);


  await Promise.all([
    lock.knock(),
    lock.knock(),
    lock.knock(),
    lock.knock()
  ]);


  assert(Date.now() - startTime > 1000);
  assert(Date.now() - startTime < 1100);

});

Deno.test('multiple locks', async () => {

  const lock = new Lock();
  const startTime1 = Date.now();

  lock.lock();
  setTimeout(() => lock.unlock(), 1000);

  await lock.knock();

  assert(Date.now() - startTime1 > 1000);
  assert(Date.now() - startTime1 < 1100);


  const startTime2 = Date.now();

  lock.lock();
  setTimeout(() => lock.unlock(), 2000);

  await lock.knock();

  assert(Date.now() - startTime2 > 2000);
  assert(Date.now() - startTime2 < 2100);

});

Deno.test('not locked knock', async () => {

  const lock = new Lock();
  const startTime = Date.now();

  await lock.knock();

  assert(Date.now() - startTime < 100);

});

Deno.test('knock after unlock', async () => {

  const lock = new Lock();
  const startTime = Date.now();

  lock.lock();
  setTimeout(() => lock.unlock(), 1000);

  await lock.knock();

  assert(Date.now() - startTime > 1000);
  assert(Date.now() - startTime < 1100);


  const startTime2 = Date.now();

  await lock.knock();

  assert(Date.now() - startTime2 < 100);

});

Deno.test('multiple locks', async () => {

  const lock1 = new Lock();
  const lock2 = new Lock();
  const startTime = Date.now();

  lock1.lock();
  lock2.lock();

  setTimeout(() => lock1.unlock(), 1000);
  setTimeout(() => lock2.unlock(), 2500);

  await Promise.all([
    lock1.knock(),
    lock2.knock()
  ]);

  assert(Date.now() - startTime > 2500);
  assert(Date.now() - startTime < 2600);

});

Deno.test('locking twice', async () => {

  const lock = new Lock();
  const startTime = Date.now();


  lock.lock();
  lock.lock();
  setTimeout(() => lock.unlock(), 1000);


  await lock.knock();


  assert(Date.now() - startTime > 1000);
  assert(Date.now() - startTime < 1100);

});
