'use strict';

import fs from 'fs';

export default class Puli {
    constructor() {
        this.json = {};
    }

    static load(configFile) {
        let repository = new Puli();

        return repository.reload(configFile);
    }

    reload(configFile) {
        try {
            this.json = JSON.parse(fs.readFileSync(configFile, 'utf8'));
        } catch (e) {
            throw new Error('Puli configuration file was not found (file "'+ configFile +'" does not exist)');
        }

        return this;
    }

    path(puliPath) {
        let filesystemPath = '';

        // Resolve ...

        return filesystemPath;
    }
}
