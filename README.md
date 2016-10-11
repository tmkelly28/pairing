Naive sorting algorithm that ensures n unique pairs, where n is the length of the array in your db.json

1. In your master.json, write out the names of your students in an array, like so:

```
[
  {
    "name": "Cooper the golden retriever",
    "id": 1,
    "pairs": []
  },
  {
    "name": "Cody the pug",
    "id": 1,
    "pairs": []
  },

]
```

2. Copy all of this into your db.json - this is the "live" file that the script modifies.
3. `npm install` - don't judge, I might want to use more lodash later
4. `node index.js`
5. Enter 'y' to accept pairs - the pair history will be preserved in db.json