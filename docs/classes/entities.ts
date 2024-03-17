/**
* A Class representing a player's cube.
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
	* The amount of steps a cube has survived since it's last spawn.
	*/
    static stepsSurvived: number
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
	* The angular velocity (Number) of a cube in radians.
	*/
	static av: number = 0
    /**
	* The angle (Number) of a cube in radians.
	*/
	static a: number = 0
    /**
	* The Team of a cube [0 = SPEC, 1 = FFA,2 = RED, 3 = BLUE]
	*/
	static team: number = 0
}

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
