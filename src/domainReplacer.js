const path = require('path');
const fs = require('fs');
const {
    Readable
} = require('stream');
const {
    zip
} = require('cross-unzip');

let targetFileNames = ['content.js', 'background.js'];
let targetPattern = 'desk.zoho.com';

let templatePath = path.join(__dirname, '..', 'template');
let distPath = path.join(__dirname, '..', 'dist');
let downloadsPath = path.join(__dirname, '..', 'downloads');

let replacer;

let makeDir = dirPath => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }
};

makeDir(downloadsPath);
makeDir(distPath);
let extensionPath = path.join(distPath, 'ZohoDesk-ASAP-Extension');
makeDir(extensionPath);

let writeFile = (src, outputPath, isPath) => {
    return new Promise(function(resolve, reject) {
        var inStr;
        isPath = isPath || false;
        if (isPath) {
            inStr = fs.createReadStream(src);
        } else {
            inStr = new Readable();
            inStr._read = () => {};
            inStr.push(src);
            inStr.push(null);
        }
        var outStr = fs.createWriteStream(outputPath);
        outStr.on('finish', function() {
            resolve();
        });
        inStr.pipe(outStr);
    });
};

let getFilePath = paths => {
    return path.resolve.apply(undefined, paths);
};

let iterateDir = (srcPath, desPath, callback, ignoreDir) => {
    makeDir(desPath);

    function iterate(srcPath, desPath) {
        if (fs.existsSync(srcPath)) {
            fs.readdirSync(srcPath).forEach(fileOrDir => {
                let fromPath = getFilePath([srcPath, fileOrDir]);
                let toPath = getFilePath([desPath, fileOrDir]);
                if (fs.statSync(fromPath).isDirectory()) {
                    makeDir(toPath);
                    iterate(fromPath, toPath);
                } else {
                    callback(fromPath, toPath);
                }
            });
        }
    }
    iterate(srcPath, desPath);
};

let replaceDomain = srcPath => {
    let src = fs.readFileSync(srcPath).toString();
    if (!replacer) {
        throw new Error('Replacer pattern undefined');
    }
    try {
        src = src.replace(new RegExp(targetPattern), replacer);
    } catch (err) {
        throw err;
    }
    return src;
};

let promises = [];

let fileHandler = (srcPath, desPath) => {
    let {
        name,
        ext
    } = path.parse(srcPath);
    if (targetFileNames.indexOf(name + ext) !== -1) {
        let src = replaceDomain(srcPath);
        promises.push(writeFile(src, desPath));
    } else {
        promises.push(writeFile(srcPath, desPath, true));
    }
};

module.exports = replacingDomain => {
    return new Promise((resolve, reject) => {
        if(!replacingDomain){
            replacer = "desk.zoho.com"
        }
        else{
            replacer = replacingDomain;
        }
        console.log(replacer);

        iterateDir(templatePath, extensionPath, fileHandler);

        Promise.all(promises).then(() => {
            zip(extensionPath, path.join(downloadsPath, 'extension.zip'), err => {
                if (err) {
                    reject();
                }
                resolve();
                console.log('Completed!');
            });
        });
    });
};