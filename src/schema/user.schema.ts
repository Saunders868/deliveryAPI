import { boolean, object, string, TypeOf } from "zod";

// schema for creating a user
export const createUserSchema = object({
  body: object({
    username: string({
      required_error: "Username is required",
    }),
    password: string({
      required_error: "Password is required",
    }).min(6, "Password too short - should be 6 chars minimum"),
    passwordConfirmation: string({
      required_error: "Password Confirmation is required",
    }),
    email: object({
      address: string({
        required_error: "Email is required",
      }).email("Not a valid email"),
      validated: boolean().default(true),
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
});

// schema for fetching user
export const getUserSchema = object({
  params: object({
    id: string({
      required_error: "Id of user is required",
    }),
  }),
});

// schema for updating user
export const updateUserSchema = object({
  body: object({
    username: string({
      required_error: "username is required",
    }),
  }),
  params: object({
    id: string({
      required_error: "user id is required",
    }),
  }),
});

// schema for deleting user
export const deleteUserSchema = object({
  params: object({
    id: string({
      required_error: "Id of user is required",
    }),
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.passwordConfirmation"
>;

export type UpdateUserInput = TypeOf<typeof updateUserSchema>;
export type GetUserInput = TypeOf<typeof getUserSchema>;
export type DeleteUserInput = TypeOf<typeof deleteUserSchema>;
