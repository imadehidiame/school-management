import { upload } from "@/lib/multer-config";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export const config = {
  api: {
      bodyParser: false, // Important: Disable the default body parser
  },
};

export async function POST(req: NextRequest) {
  console.log("Current working directory:", process.cwd()); // Check CWD
  console.log("Uploads path:", path.join(process.cwd(), 'uploads')); // Check path

  return new Promise<NextResponse>((resolve, reject) => {
      const anyReq: any = req;

      upload.single('file')(anyReq, {} as any, (err) => {
          if (err) {
              console.error("Multer Error:", err);
              return resolve(NextResponse.json({ message: err.message }, { status: 400 }));
          }

          console.log("Req.file:", anyReq.file); // The KEY log

          if (!anyReq.file) {
              return resolve(NextResponse.json({ message: 'No file uploaded' }, { status: 400 }));
          }

          return resolve(NextResponse.json({ message: 'File uploaded successfully!', file: anyReq.file }, { status: 200 }));
      });
  });
}