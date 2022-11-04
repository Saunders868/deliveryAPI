import { boolean, object, string, TypeOf } from "zod";

// schema for creating a user
export const createUserSchema = object({
  body: object({
    username: string({
      required_error: "Name is required",
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
      validated: boolean(),
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
});

// schema for updating user
export const updateUserSchema = object({
  body: object({
    username: string({
      required_error: "Name is required",
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
      validated: boolean(),
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.passwordConfirmation"
>;

export type UpdateUserInput = Omit<
  TypeOf<typeof updateUserSchema>,
  "body.passwordConfirmation"
>;
