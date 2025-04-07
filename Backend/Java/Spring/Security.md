To understand where security configuration gets setup we need to understand how the requests are received.

Our application, tomcat server is a servlet container. A servlet basically represents our controllers. Each incoming request gets routed to an appropriate servlet by front controller. But before getting to the front controller request get sifted through filters. 

Spring security adds filters which enabled security features for our controllers.

During User password flow login you receive a sessionId, that is used to identify user. 