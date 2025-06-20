import axios from "axios";

const API_URL = "http://localhost:3333";
const API_KEY = "Bearer elBA7JayiJHXmbuhxPlMHJbm";

interface LoginResponse {
  token: {
    type: string;
    name: string;
    token: string;
    abilities: string[];
    lastUsedAt: string | null;
    expiresAt: string;
  };
  id: number;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export const registerUser = async (
  fullName: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(
      `${API_URL}/user/register`,
      {
        fullName,
        email,
        password,
      },
      { headers: { "x-api-key": API_KEY } }
    );

    return response.data;
  } catch (error: unknown) {
    console.log(error);
    throw new Error("Erro ao registrar usuário.");
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(
    `${API_URL}/user/login`,
    {
      email,
      password,
    },
    { headers: { "x-api-key": API_KEY } }
  );
  return response.data;
};

export const getUserData = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}`, 'x-api-key': API_KEY },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao buscar dados do usuário.");
  }
};

export const logOut = async (token: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/user/logout`, {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "x-api-key": API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao fazer logout do usuário.");
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/email/forgot-password`,
      { email },
      { headers: { "x-api-key": API_KEY } }
    );
    return response.status;
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao encontrar rota");
  }
};

export const resetPassword = async (token: string, password: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/email/reset-password`,
      { token, password },
      { headers: { "x-api-key": API_KEY } }
    );
    return response.status;
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao encontrar rota");
  }
};

export const getSummaryTransactionsMonth = async (
  token: string,
  month?: string
) => {
  const period = month ? `period?period=${month}` : "period";
  try {
    const response = await axios.get(
      `${API_URL}/transactions/grouped/by/${period}`,
      {
        headers: { Authorization: `Bearer ${token}`, 'x-api-key': API_KEY },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);

    throw new Error("Erro ao buscar dados do usuário.");
  }
};

export const getSummaryTransactionsMonthResume = async (
  token: string,
  month?: string
) => {
  const getYear = new Date().getFullYear()
  const year = month ? `year?year=${month}` : `year?year=${getYear}`;
  try {
    const response = await axios.get(
      `${API_URL}/transactions/grouped/by/year/resume/${year}`,
      {
        headers: { Authorization: `Bearer ${token}`, 'x-api-key': API_KEY },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);

    throw new Error("Erro ao buscar dados do usuário.");
  }
};

export const getCategories = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/category`, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'x-api-key': API_KEY 
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao buscar categorias.");
  }
};

export const getModalities = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/modality`, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'x-api-key': API_KEY 
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao buscar modalidades.");
  }
};

export const getGoals = async (token: string) => {
  try {
    const response = await axios.get(`${API_URL}/goals`, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'x-api-key': API_KEY 
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao buscar metas.");
  }
};

export const createTransaction = async (token: string, data: {
  transaction: string;
  installments: number;
  date: string;
  amount: number;
  categoryId: number;
  modalityId: number;
  goalId: number | null;
  isExpense: number;
}) => {
  try {
    const response = await axios.post(
      `${API_URL}/transactions/store`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'x-api-key': API_KEY
        }
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao criar transação.");
  }
};
