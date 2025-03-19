export interface UserCreationRequest {
  role_id:string;
  is_active:boolean;
  hashed_key:string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  product_ids: string[]; 
  }
  export interface UserStatusRequest {
    is_active:boolean;
    hashed_key:string;
  }
  export interface UserUpdateRequest {
     hashed_key:string;
     first_name: string;
     last_name: string;
     email: string;
     password: string;
     product_ids: string[]; 
   }
  
  export interface UserCreationResponse {
    success: boolean;
    message: string;
  }