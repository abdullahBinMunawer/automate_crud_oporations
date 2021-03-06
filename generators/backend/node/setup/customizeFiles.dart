import 'setup.dart';

class CustomizeFiles {
  NodeSetup _setup;

  CustomizeFiles(this._setup);

  void customizePackageFile() {
    String content =
        this._setup.io.readFromFile(this._setup.root + '/package.json');
    content = content.replaceRange(
        content.indexOf('"name": "') + 9,
        content.indexOf('"', content.indexOf('"name": "') + 9),
        this._setup.projectName);
    this._setup.io.writeToFile(this._setup.root + '/package.json', content);
  }

  void customizeEnvFile() {
    String content = '';

    Map<String, String> configVars = this._setup.io.getConfigContent();
    Map<String, String> envVars = {};

    this._setup.requiredEnvVaribales.forEach((v) {
      envVars[v] = configVars[v];
    });
    if (envVars['dbName'] == null)
      envVars['dbName'] = configVars['projectName'] + 'DB';

    envVars.forEach((k, v) {
      content += k + '=' + v + '\n';
    });

    this._setup.io.writeToFile(this._setup.root + '/.env', content);
  }

  void customizeSqlTablesFile() {
    String content =
        'export const tables = `\n\n ${this._setup.sqlTables} \n\n`;';

    this
        ._setup
        .io
        .writeToFile(this._setup.root + '/src/config/sqlTables.ts', content);
  }

  void customizeSwaggerFile() {
    String content = '\n\n{}';

    this
        ._setup
        .io
        .writeToFile(this._setup.root + '/src/config/swagger.json', content);
  }

  void customizeRoutesIndexFile() {
    String content = '\n\nexport default [ ];';

    this
        ._setup
        .io
        .writeToFile(this._setup.root + '/src/routes/index.ts', content);
  }
}
