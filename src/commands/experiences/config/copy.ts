import { flags, SfdxCommand } from '@salesforce/command';
import { Messages, SfdxError } from '@salesforce/core';
import { existsSync } from 'fs';
import { copyConfig } from '../../../modules/experiences/config/copy';
import { getAbsolutePath } from '../../../modules/experiences/utils/core';

Messages.importMessagesDirectory(__dirname);
const messages = Messages.loadMessages('sfdx-experiences-plugin', 'experiences-config-copy');

/**
 * Command which copies configuration from one ExperienceBundle to another.
 */
export default class ExperiencesConfigCopy extends SfdxCommand {
  public static description = messages.getMessage('commandDescription');

  public static examples = [
    `$ sfdx experiences:config:copy -c preferredDomain,headMarkup ./source-app/main/default/experiences/Example1 ./target-app/main/default/experiences/Example2
      Copies preferred domain and head markup from Example1 in source-app to Example2 in target-app.
    `
  ];

  public static args = [
    { name: 'source', required: true, description: messages.getMessage('sourceArgDescription') },
    { name: 'target', required: true, description: messages.getMessage('targetArgDescription') }
  ];

  protected static flagsConfig = {
    config: flags.array({
      char: 'c',
      description: messages.getMessage('configFlagDescription'),
      required: true
    })
  };

  protected static requiresUsername = false;
  protected static supportsDevhubUsername = false;
  protected static requiresProject = false;

  public async run(): Promise<{}> {
    const config: string[] = this.flags.config;
    const sourceBundlePath = getAbsolutePath(this.args.source);
    const targetBundlePath = getAbsolutePath(this.args.target);

    if (!config || config.length < 1) {
      this.log(messages.getMessage('infoNoConfigToCopy'));
      return {};
    }

    if (!existsSync(sourceBundlePath)) {
      throw new SfdxError(messages.getMessage('errorMissingSourcePath', [sourceBundlePath]));
    }
    if (!existsSync(targetBundlePath)) {
      throw new SfdxError(messages.getMessage('errorMissingTargetPath', [targetBundlePath]));
    }

    try {
      copyConfig(sourceBundlePath, targetBundlePath, config);

      this.log(messages.getMessage('infoCopyFinished'));
      return {};
    } catch (error) {
      throw new SfdxError(messages.getMessage('errorFailedWithError', [error]));
    }
  }
}
