/**
* A projectile's structure.
*/
declare interface projectile {
    /**
    * A projectile's position (Vector2).
    */
    public p: [0, 0];
    /**
    * A projectile's velocity (Vector2).
    */
    public lv: [0, 0];
    /**
    * A projectile's angle (radians).
    */
    public a: number;
    /**
    * A projectile's angular velocity (radians).
    */
    public av: number;
    /**
    * A projectile's frames til death (number).
    */
    public ftd: number;
    /**
    * A projectile's turn rate (number).
    */
    public tr: number;
    /**
    * A projectile's gravity scale (number).
    */
    public gs: number;
    /**
    * A projectile's explode radius (number).
    */
    public er: number;
    /**
    * Determines when the bullet can bounce (boolean).
    */
    public bb: boolean;
    /**
    * A projectile's round value.
    */
    public round: boolean;
    /**
    * A projectile's restitution (Number).
    */
    public restitution: number;
    /**
    * A projectile's bounce count (number).
    */
    public bc: number;
    /**
    * A projectile's owner id (number).
    */
    public owner: number;
    /**
    * A projectile's bullet radius (number).
    */
    public br: number;
}


/**
* The essencial events for a mode.
*/
declare interface listener {
    /**
    * Attach a event to the mode.
    */
    public add(string: name, method: func);
}
declare interface input {
    /**
    * True when the player is pressing left.
    */
    public left: boolean;
    /**
    * True when the player is pressing right.
    */
    public right: boolean;
    /**
    * True when the player is pressing up.
    */
    public up: boolean;
    /**
    * True when the player is pressing down.
    */
    public down: boolean;
    /**
    * True when the player is pressing action1 aka force push.
    */
    public action1: boolean;
    /**
    * True when the player is pressing action2 aka grab.
    */
    public action2: boolean;
    /**
    * True when the player is pressing action3 aka bat.
    */
    public action3: boolean;
    /**
    * True when the player is pressing action4 aka rocket.
    */
    public action4: boolean;
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
declare interface sound {
    /**
    * Load a sound effect
    */
    public load(soundId: string, url: string);
    /**
    * Play a sound effect
    */
    public play(soundId: string, volume: number);
}
/**
* Information about player data.
*/
declare interface playerData {
    /**
    * The amount of lives a player has.
    */
    public lives: number;
    /**
    * The latest killer of this cube.
    */
    public killedBy: number;
    /**
    * The amounts of kills a player has.
    */
    public kills: number;
    /**
    * The id of the last spawn point of this player.
    */
    public respawnIndex: number;
    /**
    * Amount of frames before the player respawns.
    */
    public respawn: number;
}
/**
* Information about the game's graphics.
*/
declare interface graphics {
    /**
    * Create a drawing.
    * example: const id = game.graphics.create({p:[0,0],a: 0,attach:"world",attachId:-1,scale: [1,1],shapes:[{type:"bx",p:[0,0],size:[10,10],a: 0,color: 0xffffff}]});
    */
    public create(drawing: object);
    /**
    * Load a image with url, assign to id
    */
    public loadTexture(textureId: string, textureUrl: string);
    /**
    * Drawings array, ordered by id.
    */
    public drawings: any[];
}
/**
* A Object representing a cube.
*/
declare interface cube {
    /**
    * The Position (Vector2) of a cube.
    */
    public p: [0, 0];
    /**
    * This option marks if the cube can jump in mid air.
    */
    public dj: boolean;
    /**
    * The angle in radians of a rocket.
    */
    public ra: number;
    /**
    * Rocket frames, if higher than -1 the player is rocketing, caps at 6.
    */
    public rf: number;
    /**
    * Freeze frames, if higher than 0 the player is frozen still.
    */
    public ff: number;
    /**
    * Bat frames, if higher than -1 the player is batting, caps at 8.
    */
    public bf: number;
    /**
    * The angle in radians of a bat.
    */
    public ba: number;
    /**
    * The Linear Velocity (Vector2) of a cube.
    */
    public lv: [0, 0];
    /**
    * The Stamina (Number) of a cube.
    */
    public st: number;
    /**
    * The Health (Number) of a cube, If higher than 100, the cube will take longer to die from impact, plats and void.
    */
    public hp: number;
    /**
    * The IFrames (Number) of a cube, If higher than zero, plats won't kill and the cube will be able to jump into the void.
    */
    public iframes: number;
    /**
    * The amount of steps survived since the last spawn.
    */
    public stepsSurvived: number;
    /**
    * The angle (radians) of a cube.
    */
    public a: number;
    /**
    * The angular velocity (radians) of a cube.
    */
    public av: number;
    /**
    * The Team of a cube [0 = SPEC, 1 = FFA,2 = RED, 3 = BLUE]
    */
    public team: number;
}

/**
 * The world class used for game checks or physics.
 */
declare interface world {
    public raycast(position1: array, position2: array, filter);
}

/**
 * A object representing a flag.
 */
declare interface flag {
    /*
    * The position of a flag.
    */
    public p: [0, 0];
    /*
    * The Capture frames of a flag.
    */
    public capFrames: number;
    /*
    * The capture frames limit of a flag.
    */
    public capLimit: number;
    /*
    * The id of the owner of a flag.
    */
    public takenBy: number;
}

/**
* A Object representing the current game's state.
*/
declare class stateStep {
    /**
    * A array representing all flags in the map.
    */
    public flags: flag[] = [];
    /**
    * A array representing data of all the alive players.
    */
    public playerData: playerData[] = [];
    /**
    * A array representing all the alive players.
    */
    public cubes: cube[] = [];
    /**
    * A array representing all the projectiles.
    */
    public projectiles: projectile[] = [];
    /**
     * current frame of this step.
     */
    public frames: number;
}

/**
* Vector utility
*/
declare interface vector {
    /**
    * Add two vectors.
    */
    public add(a: any, b: any);
    /**
    * Magnitude of a vector.
    */
    public magn(a: any);
    /**
    * Subtract two vectors.
    */
    public sub(a: any, b: any);
    /**
    * Multiply two vectors
    */
    public mult(a: any, b: any);
    /**
    * Divide two vectors.
    */
    public div(a: any, b: any);
    /**
    * Get the angle in radians of a vector.
    */
    public angleOf(a: any);
    /**
    * Get the normalized result of a vector.
    */
    public norm(a: any);
    /**
    * Get the scalar dot product of two vectors.
    */
    public dot(a: any, b: any);
}

/**
* The general game information.
*/
namespace game {
    /**
    * This is a empty object that you can use to hold variables, use this instead of setting a const, let or var outside any events.
    */
    const vars: any;
    /**
    * This is your client ID, use for local visuals.
    */
    const clientId: number;
    /**
    * This is your host ID, use for local visuals.
    */
    const hostId: number;
    /**
    * This is a object for utiltiy with the box2d world.
    */
    const world: world;
    /**
    * This is a array that contains overridable properties of each player's input, set to null to stop override.
    */
    const overrides: input[] = [];
    /**
    * in game sound effects.
    */
    const sound: sound;
    /**
    * Information about the current game's graphics.
    */
    const graphics: graphics;
    /**
    * Vector utiltiy.
    */
    const Vector: vector;
    /**
    * The current game's state.
    */
    const state: stateStep;
    /**
    * The previous game's state.
    */
    const prevState: stateStep;
    /**
    * The game events.
    */
    const events: listener;
    /**
    * The current game's inputs.
    */
    const inputs: input[] = [];
}