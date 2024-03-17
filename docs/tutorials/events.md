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

And that's it :)
Other tutorials:

[Displaying graphics](# Getting started with graphics

Adding visuals & graphics like images and shapes, 
Replacing weapons or maybe slapping some fancy cheese on top of your screen

Using the graphics class within the game object, we have a function called "create"

```js
game.graphics.create();
```

This function returns the ID of a drawing stored inside game.graphics.drawings,
To register a drawing correctly you must pass a object representing the drawing
- - -
Example:

```js
let id = game.graphics.create({
        p: [0,0],
        attach: "world",
        scale: [1,1],
        fixedAngle: true,
        a: 0,
        shapes: [
              {
                // Type of shape (bx,tx,ci,im)
                type: "bx",
                // Color of the shape
                color: 0xffffff,
                // Angle of the shape
                a: 0
                // Offset of the shape
                p: [0,0],
                // Size of the shape
                size: [2,2],
              }
        ]
});
```

You can attach the drawing to cubes using the example below:
- - -
Example:

```js
let id = game.graphics.create({
        p: [0,0],
        attach: "cube",
        //The id of the cube to attach the drawing to
        attachId: cubeId,
        scale: [1,1],
        fixedAngle: true,
        a: 0,
        shapes: [
              {
                // Type of shape (bx,tx,ci,im)
                type: "bx",
                // Color of the shape
                color: 0xffffff,
                // Angle of the shape
                a: 0
                // Offset of the shape
                p: [0,0],
                // Size of the shape
                size: [2,2],
              }
        ]
});
```

To modify the drawing mid game, you can retrieve the drawing's object from game.graphics.drawings each frame and then
modify however you like,
- - -
Example:

```js
let drawing = game.graphics.drawings[id];

drawing.p = [15,15];
drawing.shapes[0].a = 45*math.PI/180;
```

This will set the drawing's position to 15,15 and rotate it 45 degrees

# Setting up a image

Drawing a image is simple, First we must load the image, To do that we must get a url
This example utilizes a sword i found in the internet:
https://upload.wikimedia.org/wikipedia/commons/d/df/Sword_Pixel_art_-_Radin.png

Now, to load the image we use the loadTexture method from the graphics class
- - -
Example:

```js
// sword is the image's ID.
game.graphics.loadTexture("sword","https://upload.wikimedia.org/wikipedia/commons/d/df/Sword_Pixel_art_-_Radin.png");
```

Now that we loaded the image, it's time to draw in the game!
To do that, you set up a image shape (type: im) and set it's id property to the id of your image
- - -
Example:

```js
let id = game.graphics.create({
        p: [0,0],
        attach: "world",
        scale: [1,1],
        fixedAngle: true,
        a: 0,
        shapes: [
              {
                // Type of shape (bx,tx,ci,im)
                type: "im",
                // Color of the shape
                color: 0xffffff,
                // Angle of the shape
                a: 0
                // Offset of the shape
                p: [0,0],
                // Size of the shape
                size: [2,2],
                // Id of the image
                id: "sword"
              }
        ]
});
```

While the image is not loaded, a white texture will be displayed.
You can switch image ids in game.

With the region property you can use spritesheets,
An example of it's use below:

```js
let id = game.graphics.create({
        p: [0,0],
        attach: "world",
        scale: [1,1],
        fixedAngle: true,
        a: 0,
        shapes: [
              {
                // Type of shape (bx,tx,ci,im)
                type: "bx",
                // Color of the shape
                color: 0xffffff,
                // Angle of the shape
                a: 0
                // Offset of the shape
                p: [0,0],
                // Size of the shape
                size: [2,2],
                // Id of the spritesheet
                id: "spritesheet",
                // The region, (the area which will be shown)
                region: {
                // The position of the region that should be cut off
                pos: [0,0],
                // The size of the region that should be cut off
                size: [16,16]
                }
              }
        ]
});
```

And that's it :)
Other tutorials below:

[Listening to events](https://github.com/wildyShadow/NeonGmmaker/blob/main/docs/tutorials/graphics.md)
