# Thoughts about the Technical Test
I found the technical test quite interesting as I'd not used websockets before.

I didn't find the instructions completely clear and I'd obviously have reached out to a Product Owner to clarify the requirements. In particular I wasn't completely sure how 'asks' and 'bids' related to the instructions and these seemed to be the data I was getting from the requests. I decided to merge the arrays of asks and bids entries together before further processing - my apologies if this is incorrect.

I also wasn't sure about the phrase:  `Total: t​he summed amount of the size at the current level and every level below it`

I have made the Total a summed value based on the Price levels ordered ascending ('and every level below it') but then ordered descending for display purposes.

I've formatted the code using __Prettier Now__ which is my go-to format; I'd be delighted to use any other formatter as required. I also used __Bootstrap__ and the __reactstrap__ library for some simple Bootstrap objects for the rendering; this is a UI toolkit I use quite a lot for prototyping in particular, and increasingly for finished products too. I initialised this project using __create-react-app__.

# Technical Test Questions

## What would you add to your solution if you had more time?
1. I would implement the websocket data tier using Redux and Epics. Although I've not used it, I am aware that there is websocket capability in redux-observable and this problem is an obvious use case for that.
2. I would extract uris and messages to a configuration object that would allow easy switching between dev, staging and production environments, and potentially for those variables to be provided from the environment rather than internally to make application deployment rather more devops friendly.
3. I would add retry and reinitialisation functionality around the websocket client.
4. Tests - I did not have time to write any tests although the framework for this is present. (`yarn test`)

## What would you have done differently if you knew this page was going to get thousands of views per second vs per week?
Without a full comprehension of the way in which this application is used, it is difficult to know. I'm tempted to say that it would be useful to have some throttling on the data but appreciate that this may be really inappropriate considering the nature of the information. As with any 'app' that has to be downloaded, reducing the bundle size as best possible would be advantageous.

## What was the most useful feature that was added to the latest version of your chosen language?
Although I've written this App in React, the features of Javascript that I find most useful day-to-day are the changes made to basic functionality in more recent releases - rest and spread operators are one such example:

```
let { aProperty: prop = 'pickle', ...rest } = myComplexObject;

return {
    ...rest,
    prop
}
```

And object decomposition is very pleasing too:

```
for (let [ price, size ] of [ ...bids, ...asks ]) {

}
```

## How would you track down a performance issue in production? Have you ever had to do this?
I've only been involved with this on a Java stack for an eCommerce company - detailed profiling tools and heavy load-testing software on a staging environment seemed to be the way to go about this.

## Can you describe common security concerns to consider for a frontend developer?
1. Injection attacks
2. Authentication vulnerabilities
3. Cross-site scripting
4. Inappropriate use of public components
5. Data leakage
6. Platform misconfiguration

## How would you improve the API that you just used?
It seems good. I've recently been working a lot with OGC standard APIs and at their core is an intention that they be F.A.I.R. - 'Findable, Accessible, Interoperable and Reusable'. Having APIs that are self-describing, which is a particular feature therein, seems very useful for 3rd-party use and internal development too.