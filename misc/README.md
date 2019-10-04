# Misc

## Generic Cell Rate Limiting Algorithm (GCRA)

- `LIMIT`: number of requests in a period
- `PERIOD`: allowed period of time
- `KEY`: name of the bucket
- `QUANTITY`: number of operations being requested

e.g.

```text
LIMIT      = 22000
PERIOD     = 3600
KEY        = "operationA/user@example.com"
QUANTITY   = 1
ARRIVED_AT = NOW()
```

- `EMISSION_INTERVAL`: periods we "emit" used capacity (= `PERIOD / LIMIT`)
- `DELAY_VARIATION_TOLERANCE`: capacity of the bucket for the window bounds (= `LIMIT * EMISSION_INTERVAL` or `PERIOD`)
- `INCREMENT`: length of time incremented after each request (= `EMISSION_INTERVAL * QUANTITY`)
- `TAT`: "theoretical arrival time"
- `NEW_TAT`: end of a new window (= `TAT + INCREMENT`)
- `ALLOW_AT`: start of a new window (= `NEW_TAT - DELAY_VARIATION_TOLERANCE`)
- `REMAINING`: remaining limit (= `((ARRIVED_AT - ALLOW_AT) / EMISSION_INTERVAL) + 0.5`)

### Find the TAT for the first request

- `TAT = ARRIVED_AT = NOW()`

### A request with a pre-existing TAT

Two cases:

1. `TAT` is older than `ARRIVED_AT`
2. `TAT` is newer than `ARRIVED_AT`
   - Requested operation is allowed
   - Requested operation is limited

Case 1: `NEW_TAT = MAX(ARRIVED_AT, TAT) + INCREMENT`

Case 2:

```text
CASE 1 (allowed)

+--------------------------------------------------------------> Time
   |                     |         |     |
   ALLOW_AT     ARRIVED_AT         TAT   NEW_TAT
                         +--- ∆ ---+- I -+
   +----- DELAY_VARIATION_TOLERANCE -----+

CASE 2 (limited)

+--------------------------------------------------------------> Time
 |            |                    |        |
 ARRIVED_AT   ALLOW_AT             TAT      NEW_TAT
 +---------------- ∆ --------------+--  I --+
              +- DELAY_VARIATION_TOLERANCE -+
```

References:

- [Understanding Generic Cell Rate Limiting](https://blog.ian.stapletoncordas.co/2018/12/understanding-generic-cell-rate-limiting.html)
