export type ApiSuccess<T> = {
  success: true;
  data: T;
};

export type ApiFailure = {
  success: false;
  error: {
    message: string;
    details?: unknown;
  };
};

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;

export class ApiRequestError extends Error {
  readonly status: number;
  readonly details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
    this.details = details;
  }
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...init,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  const payload = (await response.json()) as ApiResponse<T>;

  if (!payload.success) {
    throw new ApiRequestError(payload.error.message, response.status, payload.error.details);
  }

  return payload.data;
}

export type DatabaseStatus = {
  configured: boolean;
  state: string;
  name: string | null;
  host: string | null;
  error: string | null;
};

export type HealthStatus = {
  status: string;
  uptime: number;
  timestamp: string;
  environment: string;
  database: DatabaseStatus;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};
