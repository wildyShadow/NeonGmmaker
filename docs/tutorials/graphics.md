# Getting started with graphics

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

[Listening to events](https://github.com/wildyShadow/NeonGmmaker/blob/main/docs/tutorials/events.md)
