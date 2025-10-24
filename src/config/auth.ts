import { env } from "src/env";

export default {
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: '1d',
  },
};
