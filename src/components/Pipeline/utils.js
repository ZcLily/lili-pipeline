export function groovyToJS(str) {
  const groovyReg = /([\w-]*) ?: '?([\w-:/_.]*)'?/g;
  const result = {};
  let arr;
  while ((arr = groovyReg.exec(str)) !== null) {
    if (arr[1]) {
      result[arr[1]] = arr[2];
    }
  }

  return result;
}
