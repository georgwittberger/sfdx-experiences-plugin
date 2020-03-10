import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError } from '@salesforce/core';
import { AnyJson } from '@salesforce/ts-types';
import { existsSync } from 'fs';
import getAppPageIdMap from '../../../modules/experiences/config/get-app-page-id-map';
import copyRouteFile from '../../../modules/experiences/pages/copy/copy-route-file';
import copyViewFile from '../../../modules/experiences/pages/copy/copy-view-file';
import getRoutesToCopy from '../../../modules/experiences/pages/copy/get-routes-to-copy';
import getRouteFilePath from '../../../modules/experiences/pages/get-route-file-path';
import getViewFilePath from '../../../modules/experiences/pages/get-view-file-path';
import getAbsolutePath from '../../../modules/experiences/utils/get-absolute-path';

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('sfdx-experiences-plugin', 'experiences-pages-copy');

export default class Org extends SfdxCommand {
  public static description = messages.getMessage('commandDescription');

  public static examples = [
    `$ sfdx experiences:pages:copy ./source-app/main/default/experiences/Example1 ./target-app/main/default/experiences/Example2
      Copies all pages from Example1 in source-app to Example2 in target-app without overwriting existing pages.
    `,
    `$ sfdx experiences:pages:copy -o ./source-app/main/default/experiences/Example1 ./target-app/main/default/experiences/Example2
      Copies all pages from Example1 in source-app to Example2 in target-app overwriting existing pages.
    `
  ];

  public static args = [
    { name: 'source', required: true, description: messages.getMessage('sourceArgDescription') },
    { name: 'target', required: true, description: messages.getMessage('targetArgDescription') }
  ];

  protected static flagsConfig = {
    overwrite: flags.boolean({
      char: 'o',
      description: messages.getMessage('overwriteFlagDescription')
    })
  };

  protected static requiresUsername = false;
  protected static supportsDevhubUsername = false;
  protected static requiresProject = false;

  public async run(): Promise<AnyJson> {
    const overwrite: boolean = this.flags.overwrite || false;
    const sourceBundlePath = getAbsolutePath(this.args.source);
    const targetBundlePath = getAbsolutePath(this.args.target);

    if (!existsSync(sourceBundlePath)) {
      throw new SfdxError(messages.getMessage('errorMissingSourcePath', [sourceBundlePath]));
    }
    if (!existsSync(targetBundlePath)) {
      throw new SfdxError(messages.getMessage('errorMissingTargetPath', [targetBundlePath]));
    }

    try {
      const appPageIdMap = getAppPageIdMap(sourceBundlePath, targetBundlePath);
      const routeFileNamesToCopy = getRoutesToCopy(sourceBundlePath, targetBundlePath, overwrite);

      if (routeFileNamesToCopy.length < 1) {
        this.log(messages.getMessage('infoNoRoutesToCopy'));
      }

      for (const fileName of routeFileNamesToCopy) {
        const sourceViewFile = getViewFilePath(sourceBundlePath, fileName);
        const targetViewFile = getViewFilePath(targetBundlePath, fileName);

        this.log(messages.getMessage('infoCopyingView', [fileName, sourceViewFile, targetViewFile]));

        copyViewFile(sourceViewFile, targetViewFile, appPageIdMap);

        const sourceRouteFile = getRouteFilePath(sourceBundlePath, fileName);
        const targetRouteFile = getRouteFilePath(targetBundlePath, fileName);

        this.log(messages.getMessage('infoCopyingRoute', [fileName, sourceRouteFile, targetRouteFile]));

        copyRouteFile(sourceRouteFile, targetRouteFile, appPageIdMap);
      }
      return {};
    } catch (error) {
      throw new SfdxError(messages.getMessage('errorFailedWithError', [error]));
    }
  }
}
