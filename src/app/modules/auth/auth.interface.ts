export interface User {
    id: string;
    name: string;
    email: string;
    password: string; // Hashed password
    phone?: string; // Optional field
    address?: string; 
    role?: string
    profilePic?: string; 
    status?: string;
  }
  
  export interface LoginPayload {
    email: string;
    password: string;
  }
  
  export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
  }


export interface UpdateProfilePayload {
  name?: string,
  phone?: string;
  address?: string;
  description?: string;
  profilePic?: string; 
  status?: string;
}

  