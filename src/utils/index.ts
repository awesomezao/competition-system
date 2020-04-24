export { default as checkStatus } from './checkStatus'

// TODO: remember to fix getTime
export function getTime(start:string,end:string) {
  return start
}

export const getType=(target: any) => {
  return Object.prototype.toString.call(target).slice(8,-1)
}

export const isUndefined = (target: any) => {
  return typeof(target)==='undefined'
}

export const getSnapUrl = (target: string) => {
  return `/meeting-v2/${target}`
}

// export const download = (meetingId:string, fileName: string) => {
//   const a = document.createElement("a");
//   const url = `http://www.ljhhhx.com:8080/meeting-v2/file?meetingId=${meetingId}&fileName=${encodeURIComponent(fileName)}`
//   const filename = fileName;
//   a.href = url;
//   a.download = filename;
//   a.click();
//   window.URL.revokeObjectURL(url);
// }
/**
 * 下载文件
 * @param content 文件流
 * @param fileName 文件名称
 */
export const download = (content: any, fileName: string) => {
  const blob = new Blob([content], {
    type: 'application/octet-stream'
  });
  const a = document.createElement("a");
  const url = window.URL.createObjectURL(blob);
  const filename = fileName;
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}