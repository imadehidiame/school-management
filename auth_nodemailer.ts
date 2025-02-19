let Nodemailer: any = null; // Initialize to null
if (typeof window === 'undefined') { // Check if it's server-side
  Nodemailer = require('next-auth/providers/nodemailer'); // Import only on server
}
//import Nodemailer from 'next-auth/providers/nodemailer';
import { sendVerificationRequest } from './app/actions/send-verification-email';
export const config = [
    Nodemailer({
                name: 'Email Address',
                server: {
                    host: "echang.com.ng",
                    port: 465,
                    auth: {
                        user: "no_reply@echang.com.ng",
                        pass: "no_replyageat89#",
                    },
                },
                from: "no_reply@echang.com.ng",
    
                sendVerificationRequest,
                normalizeIdentifier(identifier: string): string {
                    let [local, domain] = identifier.toLowerCase().trim().split("@")
                    domain = domain.split(",")[0]
                    return `${local}@${domain}`
                },
    })
]; 