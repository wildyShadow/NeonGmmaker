# Listening to basic events

To start listening to a event, using the events class within the game object 
we can attach a function to any event avaliable like this:

```js
game.events.add("event",() => {
    //Hi event!
    //Ofc "event" is not a valid event but rather a example.
});
```

The current events as of v1.13 include:

- [init](https://github.com/wildyShadow/NeonGmmaker/blob/main/docs/tutorials/events.md#init)
- [step](https://github.com/wildyShadow/NeonGmmaker/blob/main/docs/tutorials/events.md#step)
- [ondeath](https://github.com/wildyShadow/NeonGmmaker/blob/main/docs/tutorials/events.md#ondeath)
- [init4each](https://github.com/wildyShadow/NeonGmmaker/blob/main/docs/tutorials/events.md#init4each)
- [step4each](https://github.com/wildyShadow/NeonGmmaker/blob/main/docs/tutorials/events.md#step4each)

Below, you can see each type, and their use.

# Types of events

## init

Will be fired each round start, use this to setup global stuff.
```js
game.events.add("init",() => {
    //Hello!
    game.vars.number = 0;
});
```

## step

Will be fired each frame, use this for timers, visuals etc
```js
game.events.add("step",() => {
    //Hello!
    game.vars.number++;
});
```

## ondeath

Will be fired each time a cube dies, use this to know wheter a player killed another.
```js
game.events.add("ondeath",(victim,killer) => {
    //Uh oh! victim died.
});
```

## init4each

Will be fired each round start for each player, use this to setup player graphics or variables.
```js
game.events.add("init4each",(id) => {
    //Hello!
    game.vars[id] = 0;
});
```

## step4each

Will be fired each frame for each cube
```js
game.events.add("step4each",(id) => {
    //Hello!
    let cube = game.state.cubes[id];
    if (cube) {
        game.vars[id]++;
    }
});
```
