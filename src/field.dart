class Field {
  String name, type, info;

  Field(this.name, this.type, this.info);

  Field.fromText(String fieldText) {
    this.name = fieldText.split(',')[0].trim();
    this.type = fieldText.split(',')[1].trim();
    this.info = fieldText.split(',')[2].trim();
  }

  @override
  String toString() {
    String content = '''$name, $type, $info''';

    return content;
  }
}
