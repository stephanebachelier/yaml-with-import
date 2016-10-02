import yaml from 'yamljs';
import _ from 'lodash';

class YamlWithImport {

    constructor(rootPath) {
        this.rootPath = rootPath;
    }

    setRootPath(rootPath) {
        this.rootPath = rootPath;
    }

    getRootPath() {
        return this.rootPath;
    }
    /**
     * @param fileName
     * @returns {Object}
     */
    read(fileName) {
        const json = yaml.load(fileName);
        if (!!json && !!(json.imports)) {
            let importedFile = {};
            if (json.imports.length > 1) {
                let tmp = {};
                _.forEach(json.imports, (yamlDoc) => {
                    delete json.imports;
                    if (!!this.rootPath) {
                        tmp = yaml.load(this.rootPath + yamlDoc.resource);
                    } else {
                        tmp = yaml.load(yamlDoc.resource);
                    }
                    if (!!json && json != null) {
                        tmp = _.merge(json, tmp);
                    }
                });
                importedFile = tmp;
            } else {
                if (!!this.rootPath) {
                    importedFile = this.read(this.rootPath + json.imports[0].resource);
                } else {
                    importedFile = this.read(json.imports[0].resource);
                }
                if (!!importedFile) {
                    delete json.imports;
                    importedFile = _.merge(importedFile, json);
                }
            }

            return importedFile;
        }

        return json;
    }
}

export default YamlWithImport;
