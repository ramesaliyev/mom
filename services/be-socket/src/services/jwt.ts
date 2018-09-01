import * as jwt from 'jsonwebtoken';

export const promisifiedJWTVerify = (token): Promise<any> => {
  return new Promise((resolve, reject) =>
    jwt.verify(
      token,
      process.env.JWT_SECRET_KEY,
      (err, decoded) => err ?
        resolve(false) : resolve(decoded)
    )
  );
}