import axiosInstance from '../../utils/axios';

// I'm mocking a type here
interface UserResponse {
  name: string,
  age: number,
  profession: string
}


interface UserPayload {
  name: string
}

export const fnGetUser = async ({name}: UserPayload): Promise<UserResponse> => {
  try {
    const response = await axiosInstance.get<UserResponse>(`/users/${encodeURIComponent(name)}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};