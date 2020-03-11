# SFDX Experiences Plugin

> SFDX plugin to manage ExperienceBundle metadata

[![Version](https://img.shields.io/npm/v/sfdx-experiences-plugin)](https://www.npmjs.com/package/sfdx-experiences-plugin)
[![GitHub Issues](https://img.shields.io/github/issues/georgwittberger/sfdx-experiences-plugin)](https://github.com/georgwittberger/sfdx-experiences-plugin/issues)
[![Downloads/week](https://img.shields.io/npm/dw/sfdx-experiences-plugin)](https://www.npmjs.com/package/sfdx-experiences-plugin)
[![License](https://img.shields.io/github/license/georgwittberger/sfdx-experiences-plugin)](https://github.com/georgwittberger/sfdx-experiences-plugin/blob/master/LICENSE.txt)

This [Salesforce CLI](https://developer.salesforce.com/tools/sfdxcli) plugin provides additional commands to work with the [ExperienceBundle](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_experiencebundle.htm) metadata type.

The primary goal is to facilitate the exchange of configuration and content between bundles. This is handy in the following situations.

- You want to transfer some content from one community to another community while preserving any existing content which is already there.
- You want to update just some partial configuration or content in a community.

----

<!-- toc -->
* [SFDX Experiences Plugin](#sfdx-experiences-plugin)
* [Installation](#installation)
* [Usage](#usage)
* [Commands](#commands)
* [License](#license)
<!-- tocstop -->

# Installation

1. Download and install [Salesforce CLI](https://developer.salesforce.com/tools/sfdxcli).
2. Install the plugin:

   ```bash
   sfdx plugins:install sfdx-experiences-plugin
   ```

# Usage

## Copying Configuration Between ExperienceBundles

The plugin command `experiences:config:copy` enables you to copy certain configuration values from one ExperienceBundle to another.

The command requires the path of the source bundle as a first argument and the path of the target bundle as a second argument. See the [Commands](#commands) section for the detailed syntax.

The mandatory flag `--config` (or simply `-c`) must be given followed by a comma-separated list of parameter names to copy from the source bundle to the target bundle. The following names are supported.

| Parameter Name                  | Affected File                                            | Description                                                                                                |
| ------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `isAvailableToGuests`           | `config/<sitename>.json`                                 | Indicates whether public users have access to the site (true) or not (false).                              |
| `isFilteredComponentsView`      | `config/<sitename>.json`                                 | Indicates whether the list of components is filtered based on the current page type (true) or not (false). |
| `isProgressiveRenderingEnabled` | `config/<sitename>.json`                                 | Indicates whether the display order of page components is prioritized (true) or not (false).               |
| `preferredDomain`               | `config/<sitename>.json`                                 | Represents the domain to use for indexing a community’s pages.                                             |
| `trustedSitesForScript`         | `config/<sitename>.json`                                 | Defines the whitelisted third-party hosts to allow script access for.                                      |
| `cmsSettings`                   | `config/mainAppPage.json` and `config/loginAppPage.json` | Settings for the CMS Connect header and footer.                                                            |
| `headMarkup`                    | `config/mainAppPage.json`                                | Allows the addition of custom markup to the community's main page `<head>` tag.                            |
| `isRelaxedCSPLevel`             | `config/mainAppPage.json` and `config/loginAppPage.json` | Controls the ability to run scripts and script access to third-party hosts.                                |

_Example: Copying the preferred domain and the head markup from the bundle `Example1` to the bundle `Example2`_

```bash
sfdx experiences:config:copy -c preferredDomain,headMarkup ./source-app/main/default/experiences/Example1 ./target-app/main/default/experiences/Example2
```

## Copying Pages Between ExperienceBundles

The plugin command `experiences:pages:copy` enables you to copy pages (routes and their views) from one ExperienceBundle to another.

The command requires the path of the source bundle as a first argument and the path of the target bundle as a second argument. See the [Commands](#commands) section for the detailed syntax. Without any further flags it copies all pages from the source bundle which do not already exist in the target bundle.

The optional flag `--files` (or simply `-f`) can be given followed by a comma-separated list of file names to specify which pages should be copied. The file names are exactly matched against the files in the `routes` directory of the source bundle.

The optional flag `--overwrite` (or simply `-o`) enables overwriting of pages which already exist in the target bundle.

_Example: Copying the home page and a custom page from the bundle `Example1` to the bundle `Example2` overwriting the existing pages_

```bash
sfdx experiences:pages:copy -o -f home.json,custom.json ./source-app/main/default/experiences/Example1 ./target-app/main/default/experiences/Example2
```

# Commands

<!-- commands -->
* [`sfdx experiences:config:copy -c <array> [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-experiencesconfigcopy--c-array---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx experiences:pages:copy [-o] [-f <array>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-experiencespagescopy--o--f-array---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx experiences:config:copy -c <array> [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Copy configuration from one ExperienceBundle to another

```
USAGE
  $ sfdx experiences:config:copy -c <array> [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

ARGUMENTS
  SOURCE  Source ExperienceBundle to copy configuration from
  TARGET  Target ExperienceBundle to copy configuration to

OPTIONS
  -c, --config=config                                                               (required) Copy given configuration
                                                                                    values (delimited by comma)

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  $ sfdx experiences:config:copy -c preferredDomain,headMarkup ./source-app/main/default/experiences/Example1 
  ./target-app/main/default/experiences/Example2
         Copies preferred domain and head markup from Example1 in source-app to Example2 in target-app.
```

## `sfdx experiences:pages:copy [-o] [-f <array>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Copy pages from one ExperienceBundle to another

```
USAGE
  $ sfdx experiences:pages:copy [-o] [-f <array>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

ARGUMENTS
  SOURCE  Source ExperienceBundle to copy pages from
  TARGET  Target ExperienceBundle to copy pages to

OPTIONS
  -f, --files=files                                                                 Copy only given page files
                                                                                    (delimited by comma)

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
    
  $ sfdx experiences:pages:copy -o -f home.json ./source-app/main/default/experiences/Example1 
  ./target-app/main/default/experiences/Example2
         Copies the home page from Example1 in source-app to Example2 in target-app overwriting the existing one.
```
<!-- commandsstop -->

# License

[MIT](https://opensource.org/licenses/MIT)
