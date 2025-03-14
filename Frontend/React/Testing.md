## Testing philosophy

A good indicator for needing tests is when you feel like the business processes and rules are too vague and you need some direction.

## Brian Holt testing philosophy

He does not write a lot of tests. One of the cases when he writes test is when going to fix a bug, that would've caught a bug. Because it helps you fix it and also expands the suite and that prevents regression.

Also mentions that he finds important that test fail quickly, loudly and for them to be testing something important 

He likes integration tests, UX, like how a user can login and buy something. But something that is not too big, because then you would need to fight a lot of tests, false positives and positive negatives

If he does not like a test, he deletes it

## Testing

In React there are different parts of code that can be tested. 

1. Component. Does component render what we want, changes states how we want on certain events?
2. API tests. We can mock data and make our fetch APIs return our passed values
3. Snapshot testing. Is hack to increase test coverage and it is a low effort, low confidence (does not provide a guarantee component works correctly) way of testing. Best case for snapshot test is for dumb components, like labels, headings that for example just take in text and display it. It tracks history of a component. So if it is different from previous test, then it fails. Also for may be used to APIs test.
4. Browser tests. Basically simulates browser environment to run tests.
