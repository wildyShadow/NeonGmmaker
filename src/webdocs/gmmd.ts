/**
* A projectile's structure.
*/
declare class projectile {
/**
* A projectile's position (Vector2).
*/
static p: number[2] = [0,0]
/**
* A projectile's velocity (Vector2).
*/
static lv: number[2] = [0,0]
/**
* A projectile's angle (radians).
*/
static a: number = 0
/**
* A projectile's angular velocity (radians).
*/
static av: number = 0
/**
* A projectile's frames til death (number).
*/
static ftd: number = 70
/**
* A projectile's turn rate (number).
*/
static tr: number = 0.025
/**
* A projectile's gravity scale (number).
*/
static gs: number = 0
/**
* A projectile's explode radius (number).
*/
static er: number = 1
/**
* Determines when the bullet can bounce (boolean).
*/
static bb: boolean = false;
/**
* A projectile's round value.
*/
static round: boolean = true;
/**
* A projectile's restitution (Number).
*/
static restitution: number = 1;
/**
* A projectile's bounce count (number).
*/
static bc: number = 0;
/**
* A projectile's owner id (number).
*/
static owner: number = 0;
/**
* A projectile's bullet radius (number).
*/
static br: number = 0.11,
}
 
 
/**
* The essencial events for a mode.
*/
declare class listener {
/**
* Attach a event to the mode.
*/
static add(string: name,method: func):function(name,func) {}
}
declare class input {
/**
* True when the player is pressing left.
*/
static left: boolean = false;
/**
* True when the player is pressing right.
*/
static right: boolean = false;
/**
* True when the player is pressing up.
*/
static up: boolean = false;
/**
* True when the player is pressing down.
*/
static down: boolean = false;
/**
* True when the player is pressing action1 aka force push.
*/
static action1: boolean = false;
/**
* True when the player is pressing action2 aka grab.
*/
static action2: boolean = false;
/**
* True when the player is pressing action3 aka bat.
*/
static action3: boolean = false;
/**
* True when the player is pressing action4 aka rocket.
*/
static action4: boolean = false;
}
 
/**
* Array with inputs of the players, may disappear when killed until respawned, indexed by ids.
*/
declare const inputs = [
input
]
/**
* in game sound effects.
*/
declare class sound {
/**
* Load a sound effect
*/
static load(id: soundId,url : soundUrl) {return void}
/**
* Play a sound effect
*/
static play(id: soundId,volume: soundVolume) {return void}
}
/**
* Information about the game's graphics.
*/
declare class playerData {
	/**
	* The amount of lives a player has.
	*/
	static lives: number
	/**
	* The latest killer of this cube.
	*/
	static killedBy: number
	/**
	* The amounts of kills a player has.
	*/
	static kills: number
	/**
	* The id of the last spawn point of this player.
	*/
	static respawnIndex: number
	/**
	* Amount of frames before the player respawns.
	*/
	static respawn: number
}
declare class graphics {
/**
* Create a drawing.
* example: const id = game.graphics.create({p:[0,0],a: 0,attach:"world",attachId:-1,scale: [1,1],shapes:[{type:"bx",p:[0,0],size:[10,10],a: 0,color: 0xffffff}]});
*/
static create(object: info):function(info) {return number: id}
/**
* Load a image with url, assign to id
*/
static loadTexture(id: imageId,url : imageUrl) {return void}
/**
* Drawings array, ordered by id.
*/
static drawings: obj[] = obj[obj]
}
/**
* A Object representing a cube.
*/
declare class cube {
	/**
	* The Position (Vector2) of a cube.
	*/
    static p: number[2] = [0,0]
    /**
	* This option marks if the cube can jump in mid air.
	*/
    static dj: boolean
    /**
	* The angle in radians of a rocket.
	*/
    static ra: number
    /**
	* Rocket frames, if higher than -1 the player is rocketing, caps at 6.
	*/
    static rf: number
    /**
	* Freeze frames, if higher than 0 the player is frozen still.
	*/
    static ff: number
    /**
	* Bat frames, if higher than -1 the player is batting, caps at 8.
	*/
    static bf: number
    /**
	* The angle in radians of a bat.
	*/
    static ba: number
	/**
	* The Linear Velocity (Vector2) of a cube.
	*/
	static lv: number[2] = [0,0]
	/**
	* The Stamina (Number) of a cube.
	*/
	static st: number = 100
    /**
	* The Health (Number) of a cube, If higher than 100, the cube will take longer to die from impact, plats and void.
	*/
	static hp: number = 100
    /**
	* The IFrames (Number) of a cube, If higher than zero, plats won't kill and the cube will be able to jump into the void.
	*/
	static iframes: number = 0
	/**
	* The amount of steps survived since the last spawn.
	*/
	static stepsSurvived: number = 0
    /**
	* The angle (radians) of a cube.
	*/
	static a: number = 0
	/**
	* The angular velocity (radians) of a cube.
	*/
	static av: number = 0
    /**
	* The Team of a cube [0 = SPEC, 1 = FFA,2 = RED, 3 = BLUE]
	*/
	static team: number = 0
}

/**
 * A object representing a flag.
 */
declare const flag = {
	/*
	* The position of a flag.
	*/
	static p: number[2] = [flag.x, flag.y]
	/*
	* The Capture frames of a flag.
	*/
	static capFrames: number
	/*
	* The capture frames limit of a flag.
	*/
	static capLimit: number
	/*
	* The id of the owner of a flag.
	*/
	static takenBy: number
}

/**
* A Object representing the current game's state.
*/
declare const stateStep = {
/**
* A array representing all flags in the map.
*/
static flags: flag[] = [flag]
/**
* A array representing data of all the alive players.
*/
static playerData: playerData[] = [playerData]
/**
* A array representing all the alive players.
*/
static cubes: cube[] = [cube]
/**
* A array representing all the projectiles.
*/
static projectiles: projectile[] = [projectile]
}
 
/**
* Vector utility
*/
declare class vector {
/**
* Add two vectors.
*/
static add(any,any): number[]
/**
* Subtract two vectors.
*/
static sub(any,any): number[]
/**
* Multiply two vectors.
*/
static mult(any,any): number[]
/**
* Divide two vectors.
*/
static div(any,any): number[]
/**
* Get the angle in radians of a vector.
*/
static angleOf(any): number
/**
* Get the normalized result of a vector.
*/
static norm(any): number[]
/**
* Get the scalar dot product of two vectors.
*/
static dot(any,any): number
}
 
/**
* The general game information.
*/
declare const game = {
/**
* This is a empty object that you can use to hold variables, use this instead of setting a const, let or var outside any events.
*/
static vars: any
/**
* This is your client ID, use for local visuals.
*/
static clientId: number
/**
* This is your host ID, use for local visuals.
*/
static hostId: number
/**
* This is a object for utiltiy with the box2d world.
*/
static world: obj = {
raycast: function(position1,position2,filter?){return any{bodyData: obj,type: string,id: number,point: [number,number],normal: [number,number]};}
}
/**
* This is a array that contains overridable properties of each player's input, set to null to stop override.
*/
static overrides: inputs
/**
* in game sound effects.
*/
static sound: sound
/**
* Information about the current game's graphics.
*/
static graphics: graphics
/**
* Vector utiltiy.
*/
static Vector: vector
/**
* The current game's state.
*/
static state: stateStep
/**
* The previous game's state.
*/
static prevState: stateStep
/**
* The game events.
*/
static events: listener
/**
* The current game's inputs.
*/
static inputs: inputs
}