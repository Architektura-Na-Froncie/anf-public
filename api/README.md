# REST API ANF

    npm i
    npm start
    npm start help # to display available options

    npm start -- -p <PORT> -d <baseDelay>
    npm start -- -p 3010 -d 1000:3000
    # localhost:3010, delay: 1000-3000 miliseconds

    npm start -- --auth=true
    # auth required

## Example Resources

- `/transfers` -> `Transfer[]`
- `/transfers/count` -> `number`
- `/transfers?_page=1` -> `Transfer[]`
- `/transfers?_limit=10&_page=2` -> `Transfer[]`
- `/transfers?title_like=plastic` -> `Transfer[]`

## CLI options

- `p` / `port` (*number*) - well... the port

- `d` / `delay` (*number*, milliseconds) - determines minimum delay. Some random length delay will take place additionally.

- `f` / `fail` (*number from range 0..1*) - probability of random fails on processing requests. Useful for testing error handling, optimistic updates, etc. Defaults to `0` (no random fails). If `fu` not set, all requests are considered to randomly fail.

- `failUrls` - (*comma-separated string*, list of URL patterns) - if `f` option is on, the requests that match any of the URL pattern in this list might potentially fail. Useful when you want to choose certain resources to be unstable temporarily. Example: `-fu employees,offices` - `employees*` and `offices*` are unstable, rest is stable

- `coll` - (*boolean*) - turn on websocket-based **Collaborative Service** - default: false

- `curr` - (*boolean*) - turn on websocket-based **Currency Service** - default: false

- `auth` - (*boolean*) - determines that JWT authentication is NOT required, default: false (not required)

## auth credentials

in order to login, use `admin`:`admin` ( ͡° ͜ʖ ͡°)

## custom queries supported

- `http://localhost:3000/employees?name_like=Fri` (searching by `firstName` and `lastName` only, instead of `?q=___` for full-text search on all properties)

See `middlewares/employee_name.js` file.

## manual

 * see [`json-server`](https://github.com/typicode/json-server) docs for standard commands
 * this API also supports each collection command `...count` subresource
 * this API limits all page sizes to 50 (unless you specify a smaller page size)
 * example calls:
    * /transfers
    * /transfers/count
    * /transfers?title_like=plastic
    * /transfers/count?title_like=plastic

## logger interface

The logger interface is available at http://localhost:3000/logger.

### sending a new log entry:

```js
fetch('http://localhost:3000/logs', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "level": "WARN",
    "account": "fc2dcb31-7d27-4e89-8869-7686569a567d",
    "content": "Officiis saepe doloremque."
  })
})
```

the system datetime is added automatically.

if an invalid structure is sent, validation error will be thrown, like the following:

```
  body: JSON.stringify({
    // level property is missing
    "account": "fc2dcb31-7d27-4e89-8869-7686569a567d",
    "content": "Officiis saepe doloremque"
  })
```
