//将文件以二进制读取
export function readFile(file) {
  return new Promise((resolve) => {
    let reader = new FileReader(); //文件读取对象
    reader.readAsBinaryString(file);
    reader.onload = (ev) => {
      resolve(ev.target.result);
    };
  });
}
