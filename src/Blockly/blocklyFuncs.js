
let jsb = javascript.javascriptGenerator.forBlock;
let js = Blockly.JavaScript;
jsb['event_init'] = function (block) {
    let perplayer = block.getFieldValue('perplayer') === 'TRUE';
    let player_id = block.getFieldValue('player_id');
    let insideCode = js.statementToCode(block, 'code');

    let code = `game.events.add('${perplayer ? 'init4each' : 'init'}', function(${perplayer ? 'cube_id' : ''}) {\n`;

    if (insideCode.includes('$')) {
        code += gameVarShort;
    }

    code += `${insideCode}});\n\n`;

    return code;
};

jsb['event_step'] = function (block) {
    let perplayer = block.getFieldValue('perplayer') === 'TRUE';
    let player_id = block.getFieldValue('player_id');
    let insideCode = js.statementToCode(block, 'code');

    let code = `game.events.add('${perplayer ? 'step4each' : 'step'}', function(${perplayer ? 'cube_id' : ''}) {\n`;

    if (insideCode.includes('$')) {
        code += gameVarShort;
    }

    code += `${insideCode}});\n\n`;

    return code;
};

jsb['cube_get'] = function (block) {
    let player_id = js.valueToCode(block, "PLRID", js.ORDER_ADDITION);
    let info = block.getFieldValue('info')

    let code = `game.state.cubes[${player_id}]${info}`

    return [code, js.ORDER_NONE];
};

jsb['cube_exist'] = function (block) {
    let player_id = js.valueToCode(block, "PLRID", js.ORDER_ADDITION);

    let code = `(game.state.cubes[${player_id}]? true : false)`;

    return [code, js.ORDER_NONE];
};

jsb['cube_set'] = function (block) {
    let player_id = js.valueToCode(block, "PLRID", js.ORDER_ADDITION);
    let info = block.getFieldValue('info')
    let value = js.valueToCode(block, "VALUE", js.ORDER_ADDITION);
    let code = `game.state.cubes[${player_id}]${info} = ${value};\n`

    return code;
};

jsb['input_override'] = function (block) {
    let player_id = js.valueToCode(block, "PLRID", js.ORDER_ADDITION);
    let info = block.getFieldValue('info')
    let value = js.valueToCode(block, "VALUE", js.ORDER_ADDITION);
    let code = `game.inputs[${player_id}].${info} = ${value};\n`

    return code;
};

jsb['input_no_override'] = function (block) {
    let player_id = js.valueToCode(block, "PLRID", js.ORDER_ADDITION);
    let info = block.getFieldValue('info')

    let code = `game.inputs[${player_id}].${info} = null;\n`

    return code;
};

jsb['input_get'] = function (block) {
    let player_id = js.valueToCode(block, "PLRID", js.ORDER_ADDITION);
    let info = block.getFieldValue('info')

    let code = `game.inputs[${player_id}].${info}`

    return [code, js.ORDER_NONE];
};

jsb['define_local'] = function (block) {
    let value = js.valueToCode(block, "VALUE", js.ORDER_ADDITION);
    let varname = block.getFieldValue('VAR_NAME')

    let code = `let ${varname} = ${value};\n`

    return code;
};

jsb['set_local'] = function (block) {
    let value = js.valueToCode(block, "VALUE", js.ORDER_ADDITION);
    let varname = block.getFieldValue('VAR_NAME')

    let code = `${varname} = ${value}\n;`

    return code;
};

jsb['get_local'] = function (block) {
    let varname = block.getFieldValue('VAR_NAME')

    let code = `${varname}`

    return [code, js.ORDER_NONE];
};

jsb['define_group'] = function (block) {
    let group = js.valueToCode(block, "GROUP", js.ORDER_ADDITION);

    let code = `game.vars[${group}] = {};\n`

    return code;
};

jsb['get_group'] = function (block) {
    let group = js.valueToCode(block, "GROUP", js.ORDER_ADDITION);
    let varname = block.getFieldValue('VAR')

    let code = `game.vars[${group}].${varname}`

    return [code, js.ORDER_NONE];
};

jsb['set_group'] = function (block) {
    let group = js.valueToCode(block, "GROUP", js.ORDER_ADDITION);
    let varname = block.getFieldValue('VAR')
    let value = js.valueToCode(block, "VALUE", js.ORDER_ADDITION);

    let code = `game.vars[${group}].${varname} = ${value};\n`

    return code;
};

jsb['vector_math'] = function (block) {
    let operation = block.getFieldValue('operation');
    let A = js.valueToCode(block, "A", js.ORDER_NONE);
    let B = js.valueToCode(block, "B", js.ORDER_NONE);

    let code = `game.Vector.${operation}(${A},${B})`;

    return [code, js.ORDER_NONE];
};
jsb['vector_math2'] = function (block) {
    let operation = block.getFieldValue('operation');
    let A = js.valueToCode(block, "A", js.ORDER_NONE);

    let code = `game.Vector.${operation}(${A})`;

    return [code, js.ORDER_NONE];
};
jsb['vector'] = function (block) {
    let x = js.valueToCode(block, "X", js.ORDER_NONE);
    let y = js.valueToCode(block, "Y", js.ORDER_NONE);

    let code = `[${x},${y}]`;

    return [code, js.ORDER_NONE];
};