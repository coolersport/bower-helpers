#! /usr/bin/env node
var fs = require('fs');
var bower = require('bower');

var obj = JSON.parse(fs.readFileSync('bower.json', 'utf8'));
var paths = [];
var options = {
    save: true,
    saveExact: true,
    forceLatest: true,
    production: true
};
var config = {
    cwd: process.cwd(),
};

var install = function(idx) {
    console.log((idx + 1) + '. ' + paths[idx] + '...');
    // calling install one by one as it may choke bower with whole thing at once
    bower.commands.install([paths[idx]], options, config).on('end', function() {
        if (idx < paths.length - 1) {
            install(idx + 1);
            return;
        }

        // final touches
        obj = JSON.parse(fs.readFileSync('bower.json', 'utf8'));

        // fix exact version in resolutions section
        for (var dep in obj.resolutions) {
            var ver = obj.dependencies[dep];
            if (ver.indexOf('#') > -1) ver = ver.substring(ver.indexOf('#') + 1);
            obj.resolutions[dep] = ver;
        }

        fs.writeFile('bower.json', JSON.stringify(obj, null, '  '), 'utf8');
        console.log('Update done');
    });
};

for (var dep in obj.dependencies) {
    var path = obj.dependencies[dep];
    if (!path.endsWith('#master')) paths.push(path.substring(0, path.indexOf('#')));
}

if (paths.length > 0) {
    console.log('Install/upgrade to the latest versions of ' + paths.length + ' dependencies.');
    install(0);
} else console.log('Nothing to install/upgrade');
