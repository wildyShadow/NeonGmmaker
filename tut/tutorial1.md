# Events

Events are the most important element for a gmm or ngmm gamemode, in ngmm
a function is binded to a event by simply using the add method from game.events:

```js
game.events.add('init',() => {
  // Code
})
```

There is 5 events each used for something different, these include:

1. ondeath
 ondeath will be executed each time a cube dies. returning true will prevent the death.
 ```js
 game.events.add('ondeath',(id,killer) => {
  // Code each time a player dies, introducing killer
  return false; // player can die (lol)
})
 ```

 2. step
	step will execute each step calculated, can be used for client sided effects with game.clientId property
	```js
	game.events.add('step',() => {
		// Code that will be executed each step.
		// This runs through all projectiles of a game and makes them age infinitely
		for (let id in game.state.projectiles){
			let projectile = game.state.projectiles[id];
			if (projectile) {
				projectile.ftd = 999;
			}
		}
	})
	```
3. step4each
variation of step, except executed for each player each step, including their id, you can use it to make players fly for example

	```js
	game.events.add('step4each',(id) => {
		// Code that will be executed each step.
		let cube = game.state.cubes[id];
		if (cube) {
			cube.lv[1]--; // player go fly
		}
	})
	```

4. init
Init will be executed once a round starts, use it to define initial variables or graphics.

5. init4each
a variation of init, except executed for each player including their ids, use it to define player variables like custom scores, ammo or graphics

Events are important to make a gamemode work, step events will execute each 1/30 of a second
