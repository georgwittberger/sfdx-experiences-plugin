# SFDX Experiences Plugin

> SFDX plugin to manage ExperienceBundle metadata

[![Version](https://img.shields.io/npm/v/sfdx-experiences-plugin.svg)](https://npmjs.org/package/sfdx-experiences-plugin)
[![Known Vulnerabilities](https://snyk.io/test/github/georgwittberger/sfdx-experiences-plugin/badge.svg)](https://snyk.io/test/github/georgwittberger/sfdx-experiences-plugin)
[![Downloads/week](https://img.shields.io/npm/dw/sfdx-experiences-plugin.svg)](https://npmjs.org/package/sfdx-experiences-plugin)
[![License](https://img.shields.io/npm/l/sfdx-experiences-plugin.svg)](https://github.com/georgwittberger/sfdx-experiences-plugin/blob/master/package.json)

<!-- toc -->
* [SFDX Experiences Plugin](#sfdx-experiences-plugin)
<!-- tocstop -->
<!-- install -->
<!-- usage -->
```sh-session
$ npm install -g sfdx-experiences-plugin
$ sfdx COMMAND
running command...
$ sfdx (-v|--version|version)
sfdx-experiences-plugin/1.0.0 win32-x64 node-v12.16.1
$ sfdx --help [COMMAND]
USAGE
  $ sfdx COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`sfdx experiences:pages:copy [-o] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-experiencespagescopy--o---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx experiences:pages:copy [-o] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Copy pages from one ExperienceBundle to another

```
USAGE
  $ sfdx experiences:pages:copy [-o] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

ARGUMENTS
  SOURCE  Source ExperienceBundle to copy pages from
  TARGET  Target ExperienceBundle to copy pages to

OPTIONS
  -o, --overwrite                                                                   Overwrite existing pages in the
                                                                                    target

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLES
  $ sfdx experiences:pages:copy ./source-app/main/default/experiences/Example1 
  ./target-app/main/default/experiences/Example2
         Copies all pages from Example1 in source-app to Example2 in target-app without overwriting existing pages.
    
  $ sfdx experiences:pages:copy -o ./source-app/main/default/experiences/Example1 
  ./target-app/main/default/experiences/Example2
         Copies all pages from Example1 in source-app to Example2 in target-app overwriting existing pages.
```
<!-- commandsstop -->
