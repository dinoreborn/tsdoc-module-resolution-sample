# TypeDoc plugin to remove non-commented "symbols" from documentation

The idea of plugin implementation is taken from here:
https://github.com/jonchardy/typedoc-plugin-no-inherit

## To build
> npm install
> npm run build

It will create a functional npm image in the npm-image folder which
can be referenced in other projects' package.json dependencies using
a local relative path.

## To test
In the 'test' subfolder, *after* this project is built:
> npm install
> npm run build

The test takes sources from the test/input folder and generates 
documentation in the test/output folder.

## To apply to a typedoc project
In the typedoc project package.json add the following dependency:
    "dependencies": {
        "typedoc-plugin-remove-non-doc": "<path-to>/npm-image"
    },

Typedoc will find and apply the installed plugin automatically, 
unless typedoc --plugin option specifies otherwise.