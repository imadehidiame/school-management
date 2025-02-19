import { upload } from "@/lib/multer-config";
import { NextRequest, NextResponse } from "next/server";
import { google } from 'googleapis';
import path from "path";
//import fs from 'fs/promises'; // Use fs.promises for async file operations
import fs from 'fs'; // Import the regular 'fs' module for createReadStream
import fsp from 'fs/promises'

// IMPORTANT: Load credentials ONLY ONCE, outside the handler
const credentialsPath = path.join(process.cwd(), 'public', 'school-management-app-449011-23d391d89d85.json'); // Construct path correctly
interface GoogleCredentials {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
}

// ... rest of your imports and code

let credentials: GoogleCredentials; // Explicitly type credentials

try {
    const file = await fsp.readFile(credentialsPath, 'utf8')
    credentials = JSON.parse(file) as GoogleCredentials; // Type assertion

    // Or, even better, use a type guard to ensure the parsed data matches the interface
    if (!isGoogleCredentials(credentials)) {
        throw new Error("Invalid credentials file format");
    }

} catch (error) {
    // ... error handling
}

// Type guard function
function isGoogleCredentials(obj: any): obj is GoogleCredentials {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        typeof obj.type === 'string' &&
        typeof obj.project_id === 'string' &&
        typeof obj.private_key_id === 'string' &&
        typeof obj.private_key === 'string' &&
        typeof obj.client_email === 'string' &&
        typeof obj.client_id === 'string' &&
        typeof obj.auth_uri === 'string' &&
        typeof obj.token_uri === 'string' &&
        typeof obj.auth_provider_x509_cert_url === 'string' &&
        typeof obj.client_x509_cert_url === 'string'
    );
}

export const config = {
    api: {
        bodyParser: false,
    },
};

interface MockRes {
  status: (code: number) => MockRes;
  send: (body: any) => MockRes;
  json: (body: any) => MockRes;
  end: (cb: any) => void;
  statusCode: number;
  body?: any; // The body property
}

// ... rest of your code

export async function POST(req: NextRequest) {
  try {
      return new Promise<NextResponse>((resolve, reject) => {
          const anyReq: any = req;

          const mockRes: MockRes = { // Use the interface
              status: (code: number) => {
                  mockRes.statusCode = code;
                  return mockRes;
              },
              send: (body: any) => {
                  mockRes.body = body;
                  return mockRes;
              },
              json: (body: any) => {
                  mockRes.body = JSON.stringify(body);
                  return mockRes;
              },
              end: (cb: any) => {
                  cb(null);
              },
              statusCode: 200,
          };

          upload.single('file')(anyReq, mockRes as any, async (err) => { // Pass mockRes
              // ... (rest of your code)

              if (err) {
                        return resolve(NextResponse.json({ message: err.message }, { status: 400 }));
                      }
              
                      if (!anyReq.file) { // Use anyReq.file
                        return resolve(NextResponse.json({ message: 'No file uploaded' }, { status: 400 }));
                      }
              
                      try {
                        const response = await uploadToDrive(anyReq.file); // Use anyReq.file
                        console.log('Response in post method ', response);
                        resolve(NextResponse.json({ message: response }, { status: 200 }));
                      } catch (driveError) {
                        console.error("Error uploading to Drive:", driveError);
                        resolve(NextResponse.json({ message: 'Error uploading to Drive' }, { status: 500 }));
                }


          });
      });
  }catch(err){
    console.log('Errror ',err);
  } // ...
}

async function uploadToDrive(file: any) {
    try {
      const auth = new google.auth.GoogleAuth({
        credentials: credentials,
        scopes: ['https://www.googleapis.com/auth/drive.file'],
    });

    const client = await auth.getClient(); // This gets the correct client

    const drive = google.drive({ version: 'v3', auth: client as any });

        const media = {
            mimeType: file.mimetype,
            body: fs.createReadStream(file.path),
        };

        const fileMetadata = {
            name: file.originalname,
        };

        const response = await drive.files.create({
            requestBody: fileMetadata,
            media: media,
        });

        console.log('File uploaded:', response.data);
        return response.data;

    } catch (error) {
        console.error('The API returned an error:', error);
        throw error;
    }
}