import '../../../../src/endpoint.dart';
import '../../../../src/io.dart';
import '../../../../src/model.dart';
import 'utilities.dart';

class CrudRoute {
  IO _io = IO();
  Utilities _utilities = Utilities();
  Model _model;
  String _content = '';

  CrudRoute(this._model);

  void run() {
    this.importContent();
    this.typeContent();
    this.routesContent();
    this.writeRoute();
  }

  void importContent() {
    String content = 'import { ';

    this._model.endpoints.forEach(
        (e) => content += this._utilities.getEndpointFunction(e) + ', ');

    content += '} from "../controllers/' +
        this._model.pluralName +
        '.controller";\n' +
        'import { verifyToken, acceptedBody, filterByAccept, filterByPrevent, checkValues } from "../utilities";\n\n';
    this._content += content;
  }

  void typeContent() {
    String content = 'let ' +
        this._model.singlarName +
        'Type: ' +
        this._model.singlarName[0].toUpperCase() +
        this._model.singlarName.substring(1) +
        'Model = {\n';
    this._model.fields.forEach((f) {
      content += f.name + ': ';
      if (f.type.length == 0 || f.type.contains('CHAR'))
        content += "'',\n";
      else if (f.type.contains('INT'))
        content += '0,\n';
      else
        content += "'" + f.type + "',\n";
    });
    content += '}\n\n';

    this._content += content;
  }

  void routesContent() {
    String content = 'export default ';
    List<String> routes = [];

    this._model.endpoints.forEach((e) {
      if (e.method == 'GET')
        routes.add(this._getMethod(e));
      else if (e.method == 'POST')
        routes.add(this._postMethod(e));
      else if (e.method == 'PUT')
        routes.add(this._putMethod(e));
      else if (e.method == 'DELETE') routes.add(this._deleteMethod(e));
    });

    this._content += content + routes.toString();
  }

  String _getMethod(Endpoint e) {
    if (this._utilities.getEndpointFunction(e).contains('All'))
      return '''
  {
    path: "''' +
          e.path +
          '''",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let query = {...req.query, ...req.params}
        let queryAccept = ['limit', 'page', 'sort', 'order'];
        let accept: string[] = ''' +
          this._utilities.getEndpointParams(e) +
          ''';
        query = filterByAccept([...queryAccept, ...accept], query);
        checkValues(query, ''' +
          this._model.singlarName +
          '''Type);

        let returnedFields: string[] = ''' +
          this._utilities.getEndpointParams(e) +
          ''';
        let data = await ''' +
          this._utilities.getEndpointFunction(e) +
          '''(query, returnedFields);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
''';
    return '''
  {
    path: "''' +
        e.path +
        '''",
    method: "get",
    handler: [
      async (req: any, res: any) => {
        let returnedFields: string[] = ''' +
        this._utilities.getEndpointParams(e) +
        ''';
        let data = await ''' +
        this._utilities.getEndpointFunction(e) +
        '''({ ''' +
        this._model.singlarName +
        '''ID: req.params.''' +
        this._model.singlarName +
        '''ID }, returnedFields);
        res.status(200).send(JSON.stringify(data));
      }
    ]
  }
''';
  }

  String _postMethod(Endpoint e) {
    return '''
  {
    path: "''' +
        e.path +
        '''",
    method: "post",
    handler: [
      async (req: any, res: any) => {
        let body = {...req.body, ...req.params};
        let acceptList: string[] = ''' +
        this._utilities.getEndpointParams(e) +
        '''

        body = filterByAccept(acceptList, body);
        // let preventList: string[] = []
        // body = filterByPrevent(acceptList, body);
        checkValues(body, ''' +
        this._model.singlarName +
        '''Type)

        await ''' +
        this._utilities.getEndpointFunction(e) +
        '''(body);
        res.status(200).send();
      }
    ]
  }
''';
  }

  String _putMethod(Endpoint e) {
    return '''
  {
    path: "''' +
        e.path +
        '''",
    method: "put",
    handler: [
      async (req: any, res: any) => {
        let body = {...req.body, ...req.params};
        let acceptList: string[] = ''' +
        this._utilities.getEndpointParams(e) +
        '''

        body = filterByAccept(acceptList, body);
        // let preventList: string[] = []
        // body = filterByPrevent(acceptList, body);
        checkValues(body, ''' +
        this._model.singlarName +
        '''Type)
        
        await ''' +
        this._utilities.getEndpointFunction(e) +
        '''({ ''' +
        this._model.singlarName +
        '''ID: req.params.''' +
        this._model.singlarName +
        '''ID }, body);
        res.status(200).send();
      }
    ]
  }
''';
  }

  String _deleteMethod(Endpoint e) {
    return '''
  {
    path: "''' +
        e.path +
        '''",
    method: "delete",
    handler: [
      async (req: any, res: any) => {
        await ''' +
        this._utilities.getEndpointFunction(e) +
        '''({ ''' +
        this._model.singlarName +
        '''ID: req.params.''' +
        this._model.singlarName +
        '''ID });
        res.status(200).send();
      }
    ]
  }
''';
  }

  void writeRoute() {
    String routesPath = this._io.projectsPath +
        '/' +
        this._io.getConfigContent()['projectName'] +
        '/src/routes/';

    this._io.createFile(routesPath + this._model.pluralName + '.route.ts',
        override: true);
    this._io.writeToFile(
        routesPath + this._model.pluralName + '.route.ts', this._content);

    String index = this._io.readFromFile(routesPath + 'index.ts');
    index = 'import ' +
        this._model.pluralName +
        ' from "./' +
        this._model.pluralName +
        '.route";\n' +
        index;
    String exports = index.substring(index.indexOf('['), index.indexOf(']'));
    exports += ' ...' + this._model.pluralName + ',';
    index = index.replaceRange(index.indexOf('['), index.indexOf(']'), exports);
    this._io.writeToFile(routesPath + 'index.ts', index);
  }
}
