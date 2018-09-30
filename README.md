# haskell-pointfree README

Extension "haskell-pointfree" for vscode.

## Features

This extremely simple utility calls pointfree and pointful with current selection and shows their output, allowing you to preview, choose and then replace current selection with said output (or not).

This extension is made in the image of Atom's haskell-pointfree package, but does not includes pointfree and pointful executables compiled to JavaScript, you will need to install the binaries.

To use just select some code, right click the selected code and pick "Pointfree" from context menu.

## Requirements

You will need to install both "pointfree" and "pointful" to use this extension. To get them use comands:
cabal install pointfree
cabal install pointful 
Or get the binaries some other way (stack?).

You will also need to place those programs somewhere in your PATH for vscode to call.

## Known Issues

## Release Notes

Enjoy!

### 0.0.1

Initial release of haskell-pointfree.