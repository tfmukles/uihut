import { z } from "zod";

export const emailSchema = z.object({
  email: z
    .email({ error: "Email is invalid" })
    .min(1, { error: "Email is required" }),
});

export const passwordSchema = z.object({
  password: z
    .string()
    .min(8, {
      error:
        "Min. 8 characters, 1 lowercase, 1 uppercase and 1 number. ONLY the following special characters are allowed: !@#$%^",
    })
    .max(32, {
      error:
        "Min. 8 characters, 1 lowercase, 1 uppercase and 1 number. ONLY the following special characters are allowed: !@#$%^",
    })
    .trim() // Remove leading and trailing whitespace
    .refine((value) => /[A-Z]/.test(value), {
      error:
        "Min. 8 characters, 1 lowercase, 1 uppercase and 1 number. ONLY the following special characters are allowed: !@#$%^",
    })
    .refine((value) => /[a-z]/.test(value), {
      error:
        "Min. 8 characters, 1 lowercase, 1 uppercase and 1 number. ONLY the following special characters are allowed: !@#$%^",
    })
    .refine((value) => /\d/.test(value), {
      error:
        "Min. 8 characters, 1 lowercase, 1 uppercase and 1 number. ONLY the following special characters are allowed: !@#$%^",
    })
    .refine(
      (value) => {
        // Add requirement for at least one special character
        const hasSpecialChar = /[!@#$%^]/.test(value);
        // Check if password only contains allowed characters
        const onlyAllowedChars = /^[A-Za-z0-9!@#$%^]*$/.test(value);
        return hasSpecialChar && onlyAllowedChars;
      },
      {
        error:
          "Min. 8 characters, 1 lowercase, 1 uppercase and 1 number. ONLY the following special characters are allowed: !@#$%^",
      },
    ),
});

export const loginSchema = z.object({
  email: z
    .email({ error: "Email is invalid" })
    .min(1, { error: "Email is required" }),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters long" })
    .max(32, { error: "Password must be less than 32 characters long" })
    .trim() // Remove leading and trailing whitespace
    .refine((value) => /[a-z]/i.test(value), {
      error: "Password must contain at least one letter",
    })
    .refine((value) => /\d/.test(value), {
      error: "Password must contain at least one digit",
    })
    .refine((value) => /[!@#$%^&*()_+\-=\[\]{};':",./<>?|\\`~]/.test(value), {
      error: "Password must contain at least one special character",
    }),
});

export const registerSchema = z.object({
  first_name: z
    .string()
    .min(1, { error: "First name is required" }) // Check for non-empty first
    .min(3, { error: "First name must contain at least 3 characters" }),
  last_name: z.string().min(1, { error: "Last name is required" }),
  email: z
    .email({ error: "Email is invalid" })
    .min(1, { error: "Email is required" }),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters long" })
    .max(32, { error: "Password must be less than 32 characters long" })
    .trim() // Remove leading and trailing whitespace
    .refine((value) => /[a-z]/i.test(value), {
      error: "Password must contain at least one letter",
    })
    .refine((value) => /\d/.test(value), {
      error: "Password must contain at least one digit",
    })
    .refine((value) => /[!@#$%^&*()_+\-=\[\]{};':",./<>?|\\`~]/.test(value), {
      error: "Password must contain at least one special character",
    }),
});

const MAX_FILE_SIZE = 200 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const updateUserSchema = z.object({
  first_name: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "First name is required" : "Not a string",
    })
    .min(1, { error: "First name is required" }),
  last_name: z.string().optional(),
  email: z
    .email({ error: "This is not a valid email." })
    .min(1, { error: "This field has to be filled." }),
  country: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Country is required" : "Not a string",
    })
    .min(1, { error: "Country is required" }),
  state: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "State is required" : "Not a string",
    })
    .min(1, { error: "State is required" }),
  image: z.string().optional(),
});

export const saveProfilePictureSchema = z.object({
  image: z.custom<FileList>(
    (fileList) => {
      if (typeof FileList !== "undefined" && fileList instanceof FileList) {
        return (
          fileList.length > 0 &&
          fileList.item(0)?.size! <= MAX_FILE_SIZE &&
          ACCEPTED_IMAGE_TYPES.includes(fileList.item(0)?.type!)
        );
      }
      return false;
    },
    {
      error:
        "Supported image types: JPEG, JPG, PNG, WebP. Maximum file size allowed is 200 KB.",
    },
  ),
});

export const contactUsSchema = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Name is required" : "Not a string",
    })
    .min(1, { error: "Name is required" }) // Check for non-empty first
    .min(3, { error: "Name must contain at least 3 characters" }),
  email: z
    .email({ error: "This is not a valid email." })
    .min(1, { error: "This field has to be filled." }),
  subject: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Subject is required" : "Not a string",
    })
    .min(1, { error: "Subject is required" }) // Check for non-empty first
    .min(3, { error: "Subject must contain at least 3 characters" }),
  message: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Message is required" : "Not a string",
    })
    .min(1, { error: "Message is required" }) // Check for non-empty first
    .min(3, { error: "Message must contain at least 10 characters" }),
});

export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(8, { error: "Password must be at least 8 characters long" })
    .max(32, { error: "Password must be less than 32 characters long" })
    .trim() // Remove leading and trailing whitespace
    .refine((value) => /[a-z]/i.test(value), {
      error: "Password must contain at least one letter",
    })
    .refine((value) => /\d/.test(value), {
      error: "Password must contain at least one digit",
    })
    .refine((value) => /[!@#$%^&*()_+\-=\[\]{};':",./<>?|\\`~]/.test(value), {
      error: "Password must contain at least one special character",
    }),
  newPassword: z
    .string()
    .min(8, { error: "Password must be at least 8 characters long" })
    .max(32, { error: "Password must be less than 32 characters long" })
    .trim() // Remove leading and trailing whitespace
    .refine((value) => /[a-z]/i.test(value), {
      error: "Password must contain at least one letter",
    })
    .refine((value) => /\d/.test(value), {
      error: "Password must contain at least one digit",
    })
    .refine((value) => /[!@#$%^&*()_+\-=\[\]{};':",./<>?|\\`~]/.test(value), {
      error: "Password must contain at least one special character",
    }),
});

export const conformPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { error: "Password must be at least 8 characters long" })
      .max(32, { error: "Password must be less than 32 characters long" })
      .trim() // Remove leading and trailing whitespace
      .refine((value) => /[a-z]/i.test(value), {
        error: "Password must contain at least one letter",
      })
      .refine((value) => /\d/.test(value), {
        error: "Password must contain at least one digit",
      })
      .refine((value) => /[!@#$%^&*()_+\-=\[\]{};':",./<>?|\\`~]/.test(value), {
        error: "Password must contain at least one special character",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z
    .email({ error: "This is not a valid email." })
    .min(1, { error: "This field has to be filled." }),
});

export const otpSchema = z.object({
  otp: z.string().refine((value) => String(value).length === 4, {
    error: "OTP must be exactly 4 digits.",
  }),
});

export const accessTokenSchema = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Name is required" : "Not a string",
    })
    .min(1, { error: "Name is required" }) // Check for non-empty first
    .min(3, { error: "Name must contain at least 3 characters" })
    .regex(/^[a-zA-Z0-9]*$/, {
      error: "Name must not contain spaces or special characters",
    }), // don't use space or special character

  // date and time is a required field
  expires_in: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Expires in is required" : "Not a string",
    })
    .min(1, { error: "Expires in is required" }),
});

export const teamMemberSchema = z.object({
  member_email: z
    .email({ error: "This is not a valid email." })
    .min(1, { error: "This field has to be filled." }),
});

export const createOnboardingSchema = (isPremium: boolean) => {
  return z.object({
    profession: z.string().min(1, { error: "Profession is required" }),
    company_size: z.string().min(1, { error: "Company size is required" }),
    projects: z
      .array(
        z.object({
          project: z.string().min(1, { error: "Project is required" }),
        }),
      )
      .min(1, { error: "Projects is required" }),
    preferences: z
      .array(
        z.object({
          preference: z.string().min(1, { error: "Preference is required" }),
        }),
      )
      .min(1, { error: "Preferences is required" }),
    usage: z
      .string({
        error: (issue) =>
          issue.input === undefined ? "Usage is required" : "Not a string",
      })
      .min(1, { error: "Usage is required" }),
    channel: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "Social media is required"
            : "Not a string",
      })
      .min(1, { error: "Social media is required" }),

    // Conditionally required purchase_reason based on isPremium
    purchase_reason: isPremium
      ? z.string().min(1, { error: "Purchase reason is required" })
      : z.string().optional(),
  });
};

export const requestForNewDesignSchema = z
  .object({
    category: z
      .string({
        error: (issue) =>
          issue.input === undefined ? "category is required" : "Not a string",
      })
      .min(1, { error: "category is required" }),
    subCategory: z.string().min(1, { error: "subCategory is required" }),
    inspiration: z.string().optional(),
    description: z.string().min(1, { error: "description is required" }),
    asService: z.enum(["Yes", "No"]).optional(),
    budget: z.string().optional(),
  })
  .refine(
    (data) =>
      data.asService === "No" || (data.asService === "Yes" && !!data.budget),
    {
      error: "budget is required when asService is 'Yes'",
      path: ["budget"],
    },
  );

export const supportSchema = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "First Name is required" : "Not a string",
    })
    .min(1, { error: "First Name is required" }),
  email: z
    .email({ error: "Email is invalid" })
    .min(1, { error: "Email is required" }),
  department: z.string().min(1, { error: "Department is required" }),
  message: z.string().min(1, { error: "Message is required" }),
});

export const authorOnboardingSchema = z.object({
  portfolio: z
    .string()
    .min(1, { error: "Portfolio is required" })
    .refine(
      (value) => {
        try {
          new URL(value);
          return true;
        } catch {
          return false;
        }
      },
      {
        error: "Portfolio is invalid URL",
      },
    ),
  best_work: z
    .string()
    .min(1, { error: "Best Work is required" })
    .refine(
      (value) => {
        try {
          new URL(value);
          return true;
        } catch {
          return false;
        }
      },
      {
        error: "Best Work is invalid URL",
      },
    ),

  anonymous: z.boolean(),
});

export const quizUserSchema = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Name is required" : "Not a string",
    })
    .min(1, { error: "Name is required" }) // Check for non-empty first
    .min(3, { error: "Name must contain at least 3 characters" }),
  email: z
    .email({ error: "This is not a valid email." })
    .min(1, { error: "This field has to be filled." }),
  phone_number: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Phone number is required" : "Not a string",
    })
    .min(1, { error: "Phone number is required" }) // Check for non-empty first
    .min(3, { error: "Phone number must contain at least 3 characters" })
    .refine((value) => /^\d+$/.test(value), {
      error: "Phone number must contain only digits",
    }),
});

export const figmaLinkSchema = z.object({
  figma: z
    .url({ error: "This is not a valid URL." })
    .min(1, { error: "This field has to be filled." }),
});

export const authorCommentSchema = z.object({
  comment: z
    .string()
    .min(1, { error: "This field has to be filled." })
    .min(3, { error: "Comment must contain at least 3 characters" }),
});

export const bankFormSchema = z.object({
  bank_name: z.string().min(1, { error: "Bank Name is required" }),
  bank_account_number: z.string().regex(/^\d{10,17}$/, {
    error: "Bank Account Number must be between 10-17 digits",
  }),
  bank_branch: z.string().min(1, { error: "Bank Branch is required" }),
  mobile_number: z.string().refine(
    (val) => {
      // Matches Bangladeshi phone numbers that start with +880 or 01 and contain 9 additional digits
      const phoneRegex = /^(?:\+8801|01)[3-9]\d{8}$/;
      return phoneRegex.test(val);
    },
    {
      error: "Invalid phone number format",
    },
  ),
  bank_account_name: z
    .string()
    .min(1, { error: "Bank Account Name is required" }),
  bank_district: z.string().min(1, { error: "Bank District is required" }),
  bank_routing_number: z.string().regex(/^\d{9}$/, {
    error: "Bank Routing Number must be exactly 9 digits",
  }),
});
