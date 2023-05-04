import path = require('path');

const file = path.dirname('D:\typescriptFFFF.png');

console.log(file.toString());
console.log('--------------------------------------------------');
var filedata;
const filePath = 'FFFF.png';
async function readFile(filePath: string) {
  const response = await fetch(filePath);
  const blob = await response.blob();
  const fileName = path.basename(filePath);
  return new File([blob], fileName);
}

//New code
async function uploadFileWithMetadata(
  file: File,
  metadata: { name: string; filename: string; contentType: string },
  apiToken: string
): Promise<Response> {
  const formData = new FormData();
  formData.append('files', file, metadata.filename);
  formData.append('metadata', JSON.stringify(metadata));

  const headers = new Headers();
  headers.append('api_token', apiToken);

  const options: RequestInit = {
    method: 'POST',
    headers: headers,
    body: formData,
  };

  const response = await fetch(
    'https://localhost:44380/v2/Drive/Drive?DriveFolderId=fc73fa23-0c36-490b-84b4-565574dd6377&BlobType=2&UserId=f11efc6f-e968-4e95-82eb-85ad61559de8',
    options
  );
  return response;
}
const metadata = {
  name: 'my_image',
  filename: 'FFFF.png',
  contentType: 'image/png',
};
const apiToken =
  'h2yMCGyvkuFk1yVedt6bl9ukSFP88jD6BkEHtJQatY2midcZ7MLJp3um+m9r/lYHYEz++5U6R9JSOh4L4GAuopf4DW7oAzESKhcEShhQ983JKmXg7uWghzNuW+p4wfvVqsMcrr5RkmMHu3CiZDo9PQ==';
readFile(filePath).then((file: File) => {
  uploadFileWithMetadata(file, metadata, apiToken)
    .then((response: Response) => {
      console.log(response.status);
    })
    .catch((error: Error) => {
      console.error(error);
    });
});
// fs.readFile(filePath, (err, data) => {
//   if (err) throw err;

// readFile(filePath).then(async (file: File) => {
//   console.log(file.name); // "file.txt"
//   const formData = new FormData();
//   const fileName = path.basename(filePath);
//   formData.append('files', file, fileName);
//   const extension = path.extname(filePath);
//   const fileType = getFileType(extension);
//   console.log(fileType);
//   const headers = new Headers();
//   headers.append('Content-Type', 'multipart/form-data');
//   headers.append(
//     'api_token',
//     'h2yMCGyvkuFk1yVedt6bl9ukSFP88jD6BkEHtJQatY2midcZ7MLJp3um+m9r/lYHYEz++5U6R9JSOh4L4GAuopf4DW7oAzESKhcEShhQ983JKmXg7uWghzNuW+p4wfvVqsMcrr5RkmMHu3CiZDo9PQ=='
//   );
//   const requestOptions: RequestInit = {
//     method: 'POST',
//     body: formData,
//     headers: headers,
//   };

//   const response = await fetch('url/valid', requestOptions);
//   if (response.ok) {
//     console.log('File uploaded successfully.');
//   } else {
//     console.error(response);
//   }
// });

// });

function getFileType(extension: string): string {
  switch (extension) {
    case '.txt':
      return 'text/plain';
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'application/javascript';
    case '.json':
      return 'application/json';
    case '.xml':
      return 'application/xml';
    case '.pdf':
      return 'application/pdf';
    case '.doc':
    case '.docx':
      return 'application/msword';
    case '.xls':
    case '.xlsx':
      return 'application/vnd.ms-excel';
    case '.ppt':
    case '.pptx':
      return 'application/vnd.ms-powerpoint';
    case '.gif':
      return 'image/gif';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.svg':
      return 'image/svg+xml';
    case '.mp3':
      return 'audio/mpeg';
    case '.mp4':
      return 'video/mp4';
    default:
      return 'application/octet-stream';
  }
}

// const data = new FormData();
// data.append('files', file, file.name);

// if (file.type === 'image/png') {
//   data.set('Content-Type', 'image/png');
// }

// fetch('/upload', {
//   method: 'POST',
//   body: data
// })
// .then(response => {
//   // Handle response
// })
// .catch(error => {
//   // Handle error
// });
