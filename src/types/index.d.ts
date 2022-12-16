import session from "express-session";
import { id } from "../base/base.repository";

declare global {
  namespace Express{
    interface Session {
      allowedUsers: id[]
    }
  }
}