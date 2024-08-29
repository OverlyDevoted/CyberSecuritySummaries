# Continuos integration and Continuos delivery

It's a process which automates building and testing and application and deploys it to a production environment.

The goal is to automate the process of feature delivery

## CI/CD pipeline

These are the things that happen in a CI/CD pipeline:

1. Commit a change to codebase
2. Trigger build
3. Build
4. Notify of build outcome
5. Run tests
6. Notify of test outcome
7. Deliver build to staging
8. Deploy to production

## Environment convention

There is some environments before our code reaches the production. Each environment has it's own purpose

1. Dev - This is where the features get added
2. QA - Quality assurance stage. Work is continued with QA engineers, to make sure proper tests are being used to insure that the application is being tested properly
3. UAT - Final step before production, so it mimics the production environment as close as possible to make sure the features work as expected
4. Production - This is the code that the outside world interacts with.

## Reasons for CI/CD

CI/CD helps to automate many processes that save a lot of time, money, makes the pipeline more streamlined, consistent, reduces risks and allows for faster feature integration/iteration
