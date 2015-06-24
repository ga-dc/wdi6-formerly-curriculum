# The Problems

## The Table Waiter Problem
- A waiter has N tables, each with 2-4 guests.
- The waiter makes rounds between each of their tables, the bar, and the kitchen.
- The waiter takes drink orders for a new table, then submits them to the bar.
- Drinks are delivered when all table orders are ready.
- The waiter takes food orders for a new table, then submits them to the kitchen.
- Food is delivered when all table orders are ready.
- The waiter checks idle tables for additional requests, then submits them appropriately.
- Additional requested items are delivered when all table orders are ready.

## The Elevator Problem
- One elevator services N floors.
- The elevator may be going up, going down, or standing idle.
- Any floor may submit a request to go up and/or down at any time.
- While standing idle, the elevator takes any request from any floor.
- While going up, the elevator takes any "Up" requests from floors above it.
- While going down, the elevator takes any "Down" requests from floors below it.
- After taking on passengers, the elevator queues new stop requests.
- After completing all requested stops, the elevator checks for outstanding floor requests.

## The Vending Machine Problem
- A vending machine offers a finite number of products.
- A customer may insert cash at any time to add credit.
- A customer may enter a product code at any time to request a purchase.
- A requested product requires N credit to purchase.
- A requested product may be out of stock.
- A purchase is triggered when a valid product code and sufficient credit has been entered.
- A purchase yeilds the requested product, and appropriate change.
- Full change may be requested at any time.

## The One-Lane Traffic Problem
- Two traffic controllers with Stop/Go signs stand at either end of a one-lane road closure.
- Whenever one end sets "Go", the other end sets "Stop".
- Any traffic that arrives while the lane is empty immediately recieves "Go".
- Any opposing traffic that arrives while the lane has cars recieves "Stop".
- "Go" has no time limit when there is no traffic waiting at the other end.
- "Go" has a one-minute maximum time limit when traffic is waiting at the other end.
- When passing priority, both ends "Stop" until all pending cars clear the lane.

## The Emergency Dispatch Problem

- An emergency dispatcher queues and prioratizes incoming calls.
- The dispatcher has a finite number of emergency responders to handle calls.
- When there are idle responders, every new call is immediately assigned to a responder.
- When all responders are busy, a new high-priority call will be immedaitely assigned to a responder handling a low-priority call.
- Aborted low-priority calls are re-queued by the dispatcher.
- When a responder completes a call assignment, they check back for outstanding calls.
