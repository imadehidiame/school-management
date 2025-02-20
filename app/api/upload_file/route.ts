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

  
}