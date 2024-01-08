import type {User} from 'next-auth'
import 'next-auth/jwt'

declare module "next-auth/jwt" {
  interface JWT {
   id: string;
   rollId: string
   loggedInUser: string
   userRole: string
   accessToken: string
   userId: string
  }
}


declare module "next-auth" {
  interface Session{
user: User & {
rollId: string
 loggedInUser: string
   userRole: string
   accessToken: string
   userId: string
}
   
  }
}

interface Session extends DefaultSession {
    user: User;
    rollId: string
  }

