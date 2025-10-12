export const apiDocs = {
  openapi: "3.0.0",
  info: {
    title: "Server",
    version: "1.0.0",
    description: "API documentation"
  },
  servers: [
    {
      url: "http://localhost:5000/api",
      description: "Server"
    }
  ],
  tags: [
    { name: "Auth", description: "Authentication endpoints" },
    { name: "Users", description: "User management endpoints" },
    { name: "Health", description: "Health check endpoints" }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    },
    schemas: {
      User: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          id: { type: "integer", example: 1, description: "User ID" },
          name: { type: "string", example: "John Doe", description: "User full name" },
          email: { type: "string", format: "email", example: "john@example.com", description: "User email address" },
          password: { type: "string", format: "password", example: "hashedpassword", description: "User password (hashed)" },
          created_at: { type: "string", format: "date-time", example: "2025-10-13T12:00:00Z", description: "User creation timestamp" }
        }
      },
      LoginCredentials: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email", example: "john@example.com" },
          password: { type: "string", format: "password", example: "password123" }
        }
      },
      Token: {
        type: "object",
        properties: {
          token: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
          refreshToken: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
        }
      },
      Error: {
        type: "object",
        properties: {
          message: { type: "string", example: "Invalid credentials" },
          error: { type: "string", example: "Unauthorized" }
        }
      }
    }
  },
  security: [ { bearerAuth: [] } ],
  paths: {
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginCredentials" }
            }
          }
        },
        responses: {
          200: {
            description: "Login successful",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Token" },
                example: {
                  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                  refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                }
              }
            }
          },
          401: {
            description: "Invalid credentials",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
                example: {
                  message: "Invalid credentials",
                  error: "Unauthorized"
                }
              }
            }
          }
        }
      }
    },
    "/auth/refreshToken": {
      post: {
        tags: ["Auth"],
        summary: "Refresh JWT token",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  refreshToken: { type: "string", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: "Token refreshed",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Token" }
              }
            }
          },
          401: {
            description: "Invalid refresh token",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" }
              }
            }
          }
        }
      }
    },
    "/auth/logout": {
      post: {
        tags: ["Auth"],
        summary: "Logout user",
        security: [ { bearerAuth: [] } ],
        responses: {
          200: {
            description: "Logout successful",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "Logged out successfully" }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/users/getusers": {
      get: {
        tags: ["Users"],
        summary: "Get all users (admin only)",
        security: [ { bearerAuth: [] } ],
        responses: {
          200: {
            description: "List of users",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/User" }
                },
                example: [
                  {
                    id: 1,
                    name: "John Doe",
                    email: "john@example.com",
                    password: "hashedpassword",
                    created_at: "2025-10-13T12:00:00Z"
                  }
                ]
              }
            }
          },
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" }
              }
            }
          }
        }
      }
    },
    "/users/adduser": {
      post: {
        tags: ["Users"],
        summary: "Add a new user",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/User" },
              example: {
                name: "Jane Smith",
                email: "jane@example.com",
                password: "password123"
              }
            }
          }
        },
        responses: {
          201: {
            description: "User created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/User" },
                example: {
                  id: 2,
                  name: "Jane Smith",
                  email: "jane@example.com",
                  password: "hashedpassword",
                  created_at: "2025-10-13T12:05:00Z"
                }
              }
            }
          },
          400: {
            description: "Invalid input",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" }
              }
            }
          }
        }
      }
    },
    "/users/delete": {
      delete: {
        tags: ["Users"],
        summary: "Delete a user (admin only)",
        security: [ { bearerAuth: [] } ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email"],
                properties: {
                  email: { type: "string", format: "email", example: "john@example.com" }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: "User deleted",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "User deleted successfully" }
                  }
                }
              }
            }
          },
          400: {
            description: "Invalid input",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" }
              }
            }
          },
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" }
              }
            }
          }
        }
      }
    },
    "/health/ping": {
      get: {
        tags: ["Health"],
        summary: "Health check endpoint",
        responses: {
          200: {
            description: "Server is alive",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "pong" }
                  }
                },
                example: { message: "pong" }
              }
            }
          }
        }
      }
    }
  }
};
