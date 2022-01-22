export interface User {
  id: number;
  traineeID: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  isAuthenticated?: boolean;
}

export default User;
