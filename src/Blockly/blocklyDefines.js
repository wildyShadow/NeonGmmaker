function createEventBlock(id, varIds, init) {
    Blockly.Blocks[id] = {
        init: init,
        withLexicalVarsAndPrefix: function (_, proc) {
            for (let i = 0; i < varIds.length; i++) {
                const varField = this.getFieldValue(varIds[i]);
                if (varField) proc(varField, this.lexicalVarPrefix);
            }
        },
        getVars: function () {
            const finalList = [];

            for (let i = 0; i < varIds.length; i++) {
                const varField = this.getFieldValue(varIds[i]);
                if (varField) finalList.push(varField);
            }
            return finalList;
        },
        blocksInScope: function () {
            const doBlock = this.getInputTargetBlock('code');
            if (doBlock) {
                return [doBlock];
            } else {
                return [];
            }
        },
        declaredNames: function () {
            const finalList = [];

            for (let i = 0; i < varIds.length; i++) {
                const varField = this.getFieldValue(varIds[i]);
                if (varField) finalList.push(varField);
            }
            return finalList;
        },
        renameVar: function (oldName, newName) {
            for (let i = 0; i < varIds.length; i++) {
                const varField = this.getFieldValue(varIds[i]);
                if (Blockly.Names.equals(oldName, varField)) {
                    this.setFieldValue(newName, varIds[i]);
                }
            }
        },
        renameBound: function (boundSubstitution, freeSubstitution) {
        },
        renameFree: function (freeSubstitution) {
        },
        freeVariables: function () { // return the free variables of this block
            const result = LexicalVariable.freeVariables(
                this.getInputTargetBlock('code'));
            // Remove bound index variable from body free vars
            for (let i = 0; i < varIds.length; i++) {
                const varField = this.getFieldValue(varIds[i]);
                if (varField) result.deleteName(varField);
            }
            if (this.nextConnection) {
                const nextBlock = this.nextConnection.targetBlock();
                result.unite(LexicalVariable.freeVariables(nextBlock));
            }
            return result;
        },
    };
};

createEventBlock('event_init', ['player_id'], function () {
    this.appendDummyInput()
        .appendField('on round start');
    this.appendDummyInput()
        .appendField('run per player? (get local (cube_id))')
        .appendField(new Blockly.FieldCheckbox('TRUE'), 'perplayer');
    this.appendStatementInput('code');
    this.setColour(160);
    this.lexicalVarPrefix = 'event_init';

    if (this.validatorInit) {
        this.validatorInit();
    }
});

createEventBlock('event_step', ['player_id'], function () {
    this.appendDummyInput()
        .appendField('on each step');
    this.appendDummyInput()
        .appendField('run per player? (get local (cube_id))')
        .appendField(new Blockly.FieldCheckbox('TRUE'), 'perplayer');
    this.appendStatementInput('code');
    this.setColour(160);
    this.lexicalVarPrefix = 'event_step';

    if (this.validatorInit) {
        this.validatorInit();
    }
});

let cubeOPT = [
    ['position', '.p'],
    ['position X', '.p[0]'],
    ['position Y', '.p[0]'],
    ['velocity', '.lv'],
    ['velocity X', '.lv[0]'],
    ['velocity Y', '.lv[1]'],
    ['angle', '.a'],
    ['angular velocity', '.av'],
    ['double jump', '.dj'],
    ['health', '.hp'],
    ['iframes', '.iframes'],
    ['team', '.team'],
];

createEventBlock('cube_get', ['player_id'], function () {
    this.appendDummyInput()
        .appendField('Get')
        .appendField(new Blockly.FieldDropdown(cubeOPT), 'info');
    this.appendValueInput('PLRID')
        .appendField(' of cube');
    this.setColour(160);
    this.lexicalVarPrefix = 'cube_get';
    this.setOutput(true);

    if (this.validatorInit) {
        this.validatorInit();
    }
});

createEventBlock('cube_exist', ['player_id'], function () {
    this.appendValueInput('PLRID')
        .appendField('Does this cube exist');
    this.setColour(160);
    this.lexicalVarPrefix = 'cube_exist';
    this.setOutput(true);

    if (this.validatorInit) {
        this.validatorInit();
    }
});

createEventBlock('cube_set', ['player_id'], function () {
    this.appendDummyInput()
        .appendField('Set')
        .appendField(new Blockly.FieldDropdown(cubeOPT), 'info');
    this.appendValueInput('PLRID')
        .appendField(' of cube');
    this.appendValueInput('VALUE')
        .appendField('To');
    this.setColour(160);
    this.lexicalVarPrefix = 'cube_set';
    this.setNextStatement(true);
    this.setPreviousStatement(true);
    if (this.validatorInit) {
        this.validatorInit();
    }
});

let keys = [
    ['Up key', 'up'],
    ['Down key', 'down'],
    ['Left key', 'left'],
    ['Right key', 'right'],
    ['Action1 key', 'action1'],
    ['Action2 key', 'action2'],
    ['Action3 key', 'action3'],
    ['Action4 key', 'action4'],
]

createEventBlock('input_get', ['player_id'], function () {
    this.appendValueInput('PLRID')
        .appendField(' is cube ');
    this.appendDummyInput()
        .appendField('\'s')
        .appendField(new Blockly.FieldDropdown(keys), 'info')
        .appendField('down?')
    this.setColour(160);
    this.lexicalVarPrefix = 'input_get';
    this.setOutput(true);

    if (this.validatorInit) {
        this.validatorInit();
    }
});

createEventBlock('input_override', ['player_id'], function () {
    this.appendValueInput('PLRID')
        .appendField('Set cube ');
    this.appendDummyInput()
        .appendField('\'s')
        .appendField(new Blockly.FieldDropdown(keys), 'info');
    this.appendValueInput('VALUE')
        .setCheck("Boolean")
        .appendField('To');
    this.setColour(160);
    this.lexicalVarPrefix = 'input_override';
    this.setNextStatement(true);
    this.setPreviousStatement(true);
    if (this.validatorInit) {
        this.validatorInit();
    }
});

createEventBlock('input_no_override', ['player_id'], function () {
    this.appendValueInput('PLRID')
        .appendField('Stop overriding cube ');
    this.appendDummyInput()
        .appendField('\'s')
        .appendField(new Blockly.FieldDropdown(keys), 'info');
    this.setColour(160);
    this.lexicalVarPrefix = 'input_no_override';
    this.setNextStatement(true);
    this.setPreviousStatement(true);
    if (this.validatorInit) {
        this.validatorInit();
    }
});

createEventBlock('define_local', ['player_id'], function () {
    this.appendDummyInput()
        .appendField("Define local variable")
        .appendField(new Blockly.FieldTextInput('variable'), 'VAR_NAME');
    this.appendValueInput('VALUE')
        .appendField("As");
    this.setColour(160);
    this.lexicalVarPrefix = 'define_get';
    this.setNextStatement(true);
    this.setPreviousStatement(true);
    if (this.validatorInit) {
        this.validatorInit();
    }
});

createEventBlock('set_local', ['player_id'], function () {
    this.appendValueInput('VALUE')
        .appendField("Set local variable")
        .appendField(new Blockly.FieldTextInput('variable'), 'VAR_NAME')
        .appendField("To");
    this.setColour(160);
    this.lexicalVarPrefix = 'define_get';
    this.setNextStatement(true);
    this.setPreviousStatement(true);
    if (this.validatorInit) {
        this.validatorInit();
    }
});

createEventBlock('get_local', ['player_id'], function () {
    this.appendDummyInput()
        .appendField("Get local variable")
        .appendField(new Blockly.FieldTextInput('variable'), 'VAR_NAME');
    this.setColour(160);
    this.lexicalVarPrefix = 'get_local';
    this.setOutput(true);
    if (this.validatorInit) {
        this.validatorInit();
    }
});

createEventBlock('define_group', ['player_id'], function () {
    this.appendValueInput('GROUP')
        .appendField("Start group")
    this.setColour(160);
    this.lexicalVarPrefix = 'define_group';
    this.setNextStatement(true);
    this.setPreviousStatement(true);
    if (this.validatorInit) {
        this.validatorInit();
    }
});

createEventBlock('set_group', ['player_id'], function () {
    this.appendValueInput('GROUP')
        .appendField("Set group")
    this.appendValueInput('VALUE')
        .appendField("'s")
        .appendField(new Blockly.FieldTextInput('variable'), 'VAR')
        .appendField("To");
    this.setColour(160);
    this.lexicalVarPrefix = 'get_local';
    this.setNextStatement(true);
    this.setPreviousStatement(true);
    if (this.validatorInit) {
        this.validatorInit();
    }
});

createEventBlock('get_group', ['player_id'], function () {
    this.appendValueInput('GROUP')
        .appendField("Get group")
    this.appendDummyInput()
        .appendField("'s")
        .appendField(new Blockly.FieldTextInput('variable'), 'VAR');
    this.setColour(160);
    this.lexicalVarPrefix = 'get_local';
    this.setOutput(true);

    if (this.validatorInit) {
        this.validatorInit();
    }
});

let vector_math = [
    ['Add', 'add'],
    ['Subtract', 'sub'],
    ['Multiply', 'mult'],
    ['Divide', 'div'],
    ['Dot product of', 'dot']
]
let vector_math2 = [
    ['Magnitude', 'magn'],
    ['Angle of', 'angleOf'],
    ['Normalize', 'norm']
]


createEventBlock('vector', [], function () {
    this.appendValueInput('X')
        .appendField('Vector X')
    this.appendValueInput('Y')
        .appendField('Y')
    this.setColour(270);
    this.lexicalVarPrefix = 'vector';
    this.setOutput(true);
    if (this.validatorInit) {
        this.validatorInit();
    }
});
createEventBlock('vector_math', [], function () {
    this.appendValueInput('A')
        .appendField(new Blockly.FieldDropdown(vector_math), 'operation')
    this.appendValueInput('B')
        .appendField("and");
    this.setColour(270);
    this.lexicalVarPrefix = 'vector';
    this.setOutput(true);
    if (this.validatorInit) {
        this.validatorInit();
    }
});
createEventBlock('vector_math2', [], function () {
    this.appendValueInput('A')
        .appendField(new Blockly.FieldDropdown(vector_math2), 'operation')
    this.setColour(270);
    this.lexicalVarPrefix = 'vector';
    this.setOutput(true);
    if (this.validatorInit) {
        this.validatorInit();
    }
});