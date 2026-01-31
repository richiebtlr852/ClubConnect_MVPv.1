
  ### Precedence guidelines:
  - Zod schemas override type declarations.
  - React component internals may override global function rules.
  - UI rules never override data validation rules.
  - Framework-specific rules override language defaults, but only in their scope.
  - Scope refers to framework-owned constructs only (e.g. React components, hooks, schema files).

 ### Coding conventions guidelines

1. All top-level and named functions must be declared using a `function` declaration. Arrow functions are permitted only for callbacks and inline anonymous functions.
2. Always specify the return type of a function.
3. If a function has more than 2 parameters, require a single object parameter typed using an explicit interface or type alias.
4. Do not use short-circuiting operators (`&&`, `||`) **as a substitute for control-flow or side-effect execution** (e.g. conditionally calling functions or executing statements).

- Short-circuiting operators **are allowed** in pure boolean expressions, conditions, return values, and assignments.
- Use explicit `if` statements or a ternary operator when performing branching logic or side effects.

5. Condition checks must evaluate to boolean values:
   - For boolean variables, use direct checks (e.g. `if (isValid)`).
   - For non-boolean expressions, use explicit comparisons (e.g. `array.length === 0`).
6. Use `array.at(0)` to access the element of an array. Using `arr[i]` inside a loop is allowed.
7. For derived objects, use `as const satisfies`:

```ts
interface XYZ {
  name: string;
  email: string;
}

const XYZFormNames = {
  name: "name",
  email: "email",
} as const satisfies Record<keyof XYZ, keyof XYZ>;

const XYZFormLabels = {
  name: "Full Name",
  email: "Email Address",
} as const satisfies Record<keyof XYZ, string>;
```

8. For un-derived objects use type declaration.
   Example:

```ts
const User = {
  name: "abc",
  email: "xyz",
}; // This is incorrect

interface User {
  name: string;
  email: string;
}
const UserDetails: User = {
  name: "abc",
  email: "xyz",
}; // This is correct.
```

### Variable naming guidelines

- Identify project domain using project codebase.
- If domain is unclear use generic prefer neutral, descriptive names.
- Use domain-driven development guidelines regarding naming conventions.
  - This applies only when the domain model already exists.
  - Naming should reflect existing terms, not create new ones.
- Abbreviated/acronym in the variable names should be all in uppercase.
  example:
  - Instead of testUrl it should be replaced with testURL
  - chartID is preferred instead of chartId
  - userIDs is preferred instead of userIds
  - httpURL is preferred instead of httpUrl
- Check for spelling errors in the variable names.
- If a compound word exists as a single dictionary word, it should not have camel casing. When uncertain if a compound word is a single dictionary entry, consult standard dictionaries (Merriam-Webster, Oxford)
  example:
  - subtitle is correct while subTitle is incorrect
  - database is correct while dataBase is incorrect
  - username is correct while userName is incorrect
- When a compound dictionary word contains an acronym, the acronym rule takes precedence.
  example:
  - databaseURL is correct while databaseUrl is incorrect
- Global variables should be PascalCase except for global variables that are arrow functions or higher order functions, which should be camelCase.
  example:
  - `const UserConfig = {...}` (PascalCase for regular global variable)
  - `const fetchData = () => {...}` (camelCase for global arrow function)
  - `const withAuth = (component) => {...}` (camelCase for global HOF)
- Variable names should be in camelCase or PascalCase. No other format is accepted.
  - Use camelCase for local variables and function parameters
  - Use PascalCase for classes, components, and global variables (except functions)
  - Snake cases or screaming snake case are not accepted. We are intentionally avoiding the snake case naming for constants even though it is preferred by JS conventions.
    example:
    - `const MAX_RETRY_COUNT = 5` is incorrect while `const MaxRetryCount = 5` is correct
    - `const user_id = response.user_id` is incorrect while `const userID = response.user_id` is correct (follows camelCase with uppercase acronym rule)
  - When mapping API responses with nested objects, transform all levels from snake_case to camelCase.
    example:
    - `const user = { userID: response.user_id, profileData: response.profile_data }` is correct
  - Kebab case values are allowed only in object values.
    example:
    - `const styles = { className: "user-profile" }` (kebab-case string value is OK)
    - `const config = { "user-id": 123 }` (kebab-case as object key is incorrect)
- All imports and exports should be named imports or exports.
- All boolean variables should start with a helping verb: `is`, `has`, `can`, or `should`.
  example:
  - isNull, isValid, isLoading
  - hasPermission, hasError
  - canEdit, canDelete
  - shouldUpdate, shouldRender
- Negative boolean conditions should be avoided unless necessary for code readability. When used, they must be accompanied by a comment explaining the positive context.
  example:
  - ❌ `const isInvalid = checkValidation()` (avoid negative naming)
  - ✅ `const isValid = checkValidation()` (use positive naming with ! operator when needed)
  - ✅ `const isDisabled = true // Indicates the button cannot be clicked` (acceptable with explanatory comment)

### Types naming conventions

- Interface names should be PascalCase and they should not start with `I`.
  example:
  - IUser is invalid while User is valid interface name

  ```ts
  // ❌ Invalid
  interface IUser {
    name: string;
  }

  // ✅ Valid
  interface User {
    name: string;
  }
  ```

- Type alias names should be PascalCase.
  example:
  - `type UserRole = string | number` (PascalCase type name)
- Do not use type aliases for object-shaped types.
- Use `interface` for all object shapes unless the type is derived from a Zod schema
- Type aliases are permitted only for:
  - Union types
  - Mapped types
  - Types inferred from Zod schemas
- If a Zod schema exists, do not declare a corresponding interface or object type.
  Always use the inferred type from the schema.
  Examples:

  ```ts
  type UserRole = string | number; // (allowed union type)
  type User = { name: string }; //(object shape, do not use)
  interface User {
    name: string;
  } // (preferred when no Zod schema exists)
  type User = z.infer<typeof UserSchema>; // (required when a Zod schema exists)
  ```

- Union types are allowed when used with:
  - Primitive types
    - `type UserRole = string | number` (PascalCase type name)
  - Complex types (interfaces, objects)
    ```ts
    interface User {
      email: string;
      role: string;
    }
    type Actor = string | User;
    ```

- Enums should not be used. Use union types with const objects instead.
  example:
  - ❌ `enum UserRole { Admin, Editor, Viewer }`
- Predefined / Finite Domain Values
  - If a value is predefined and limited (e.g. roles like admin, user, editor):
  - You must create a const dictionary
  - The dictionary name must be PascalCase
  - Use as const
  - Derive the type using keyof typeof

  ```TS
      const UserRoles = {
      Admin: 'admin',
      Editor: 'editor',
      Viewer: 'viewer',
      } as const

      type UserRole = (typeof UserRoles)[keyof typeof UserRoles]

      interface User {
          email: string
          role: UserRole
      }
  ```

### File naming conventions

1. All `*.ts` file name should be kebab cased.
2. All `*.md` file name should be Pascal case.
 
 ### Zod Coding Guidelines

#### Schema Definition & Types

1. **Version and Documentation**
   - Always use the latest version of Zod.
   - Refer to the official documentation: https://zod.dev/

2. **Type Inference**
   - Always export inferred types using explicit type aliases.
   - Use Zod inferred types - do not re-declare interfaces.

   ```ts
   // Correct
   export const UserSchema = z.object({
     name: z.string(),
     email: z.string().email(),
   });

   export type User = z.infer<typeof UserSchema>;

   // Incorrect - do not re-declare interface
   export interface User {
     name: string;
     email: string;
   }
   ```

3. **Schema Composition**
   - Use `extend()` for schema inheritance rather than manual object spreading.

   ```ts
   export const BaseEntitySchema = z.object({
     id: z.string().uuid(),
     createdAt: z.date(),
   });

   // Correct
   export const UserSchema = BaseEntitySchema.extend({
     name: z.string(),
     email: z.string().email(),
   });

   // Incorrect - manual spreading
   export const UserSchema = z.object({
     ...BaseEntitySchema.shape,
     name: z.string(),
     email: z.string().email(),
   });
   ```

#### Validation Patterns

4. **Parsing**
   - Use `safeParse` instead of `parse` for all parsing operations.

   ```ts
   // Correct
   const result = UserSchema.safeParse(data);
   if (result.success) {
     // Use result.data
   }

   // Incorrect
   const result = UserSchema.parse(data); // Throws on error
   ```

5. **Optional Fields**
   - Use `nullish()` instead of `optional()` for values which are optional.

   ```ts
   // Correct - allows undefined or null
   const UserSchema = z.object({
     nickname: z.string().nullish(),
   });

   // Incorrect - only allows undefined
   const UserSchema = z.object({
     nickname: z.string().optional(),
   });
   ```

6. **Refinements**
   - Use `refine()` for single field validation (e.g., password strength check).
   - Use `superRefine()` for cross-field validation (e.g., password confirmation match).

   ```ts
   // Single field - use refine()
   const PasswordSchema = z
     .object({
       password: z.string(),
     })
     .refine((data) => data.password.length >= 8, { message: "Password must be at least 8 characters" });

   // Multiple fields - use superRefine()
   const SignupSchema = z
     .object({
       password: z.string().min(8),
       confirmPassword: z.string(),
     })
     .superRefine((data, ctx) => {
       if (data.password !== data.confirmPassword) {
         ctx.addIssue({
           code: z.ZodIssueCode.custom,
           message: "Passwords must match",
           path: ["confirmPassword"],
         });
       }
     });
   ```

#### Application Usage

7. **Form Inputs and API Payloads**
   - Use Zod schemas to validate all form inputs and parse API request/response payloads.

   ```ts
   // API endpoint validation
   function handleCreateUser(request: unknown): Response {
     const result = CreateUserSchema.safeParse(request);

     if (result.success === false) {
       return { error: "Invalid input" };
     }

     // Use validated result.data
     return createUser(result.data);
   }

   // Form validation
   function handleFormSubmit(formData: unknown): ValidationResult<User> {
     const result = UserFormSchema.safeParse(formData);

     if (result.success) {
       return { success: true, data: result.data };
     }

     return {
       success: false,
       error: result.error.errors[0]?.message ?? "Validation failed",
     };
   }
   ```

#### Error Handling

8. **Custom Error Messages**
   - Always provide custom error messages for refinements and complex validations.
   - Structure validation responses consistently across the application.

   ```ts
   const EmailSchema = z.string().email({ message: "Please enter a valid email address" });

   const AgeSchema = z.number().min(18, { message: "You must be at least 18 years old" });
   ```

#### Additional Guidelines

9. **Schema Naming Conventions**
   - Use descriptive names ending with `Schema` (e.g., `UserSchema`, `CreateUserSchema`).
   - For related schemas, use consistent prefixes (e.g., `CreateUserSchema`, `UpdateUserSchema`).

10. **Control Flow**
    - Use explicit `if` statements for handling validation results, not short-circuiting operators.

    ```ts
    // Incorrect
    result.success && processData(result.data);

    // Correct
    if (result.success) {
      processData(result.data);
    }
    ```
 
 ### Mantine Core Guidelines

#### Documentation

1. **Component Reference**
   - Refer to Mantine components for JSX: https://mantine.dev/core/package/

#### Component Usage

2. **Minimal Props**
   - Avoid specifying props whose values equal documented defaults.
   - If the default value of a prop matches your needs, do not re-specify it.
   - Example: If the default `size` of `TextInput` is `md`, do not specify `size="md"`.

   ```ts
   // Incorrect - unnecessary prop
   <TextInput size="md" label="Name" />

   // Correct - using default
   <TextInput label="Name" />

   // Correct - only specify when different from default
   <TextInput size="lg" label="Name" />
   ```

3. **Styling Approach**
   - Avoid using `style` and `styles` props unless absolutely necessary.
   - First, try using Mantine's built-in props (spacing, sizing, color props).
   - If built-in props are insufficient, try alternative approaches (composition, wrapper components, CSS modules).
   - Only use `style` or `styles` as a last resort, and include a comment explaining why it's necessary.

   ```ts
   // Correct - use built-in props
   <Box p="md" bg="gray.1" mt="xl">
     <Text c="blue.6" fw={700}>Content</Text>
   </Box>

   // Incorrect - unnecessary style prop
   <Box style={{ padding: '16px', backgroundColor: '#f8f9fa' }}>
     <Text style={{ color: '#228be6', fontWeight: 700 }}>Content</Text>
   </Box>

   // Acceptable - when built-in props can't achieve the result
   <Box
     style={{
       // Required: Custom gradient not available in Mantine props
       background: 'linear-gradient(45deg, #228be6 0%, #15aabf 100%)',
     }}
   >
     Content
   </Box>
   ```

4. **Unstyled Containers**
   - Use `Box` for unstyled containers.

   ```ts
   <Box p="md">
     <Text>Content here</Text>
   </Box>
   ```

5. **Layout Components**
   - Use `Group` and `Stack` instead of `Flex`.
   - `Group` for horizontal layouts, `Stack` for vertical layouts.

   ```ts
   // Horizontal layout
   <Group>
     <Button>Cancel</Button>
     <Button>Submit</Button>
   </Group>

   // Vertical layout
   <Stack>
     <TextInput label="Name" />
     <TextInput label="Email" />
   </Stack>
   ```

6. **Typography Components**
   - Use `Title` for headings and `Text` for body content.

   ```ts
   <Stack>
     <Title order={1}>Page Heading</Title>
     <Text>Body content goes here.</Text>
   </Stack>
   ```

7. **Polymorphic Components**
   - Use polymorphic components (via `component` prop) when semantic HTML matters.
   - Common use cases: buttons as links, text as labels, containers as semantic elements.

   ```ts
   // Button rendered as a link
   <Button component="a" href="/dashboard">
     Go to Dashboard
   </Button>

   // Text rendered as a label
   <Text component="label" htmlFor="email">
     Email Address
   </Text>

   // Box rendered as a section
   <Box component="section">
     <Title order={2}>Section Title</Title>
   </Box>
   ```
 
 ### Mantine Form Guidelines

#### Documentation

1. **Form Documentation**
   - Refer to Mantine form documentation: https://mantine.dev/form/package/

#### Form Usage

2. **Form Library**
   - Use Mantine form (`@mantine/form`) for all forms.

3. **Form Validation**
   - Use Zod schema with Mantine forms via `zodResolver`.

   ```ts
   import { useForm, zodResolver } from '@mantine/form';
   import { z } from 'zod';

   const UserSchema = z.object({
     name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
     email: z.string().email({ message: 'Invalid email address' }),
   });

   type User = z.infer<typeof UserSchema>;

   function UserForm(): JSX.Element {
     const form = useForm<User>({
       validate: zodResolver(UserSchema),
       initialValues: {
         name: '',
         email: '',
       },
     });

     return (
       <form onSubmit={form.onSubmit((values) => console.log(values))}>
         <TextInput
           label="Name"
           {...form.getInputProps('name')}
         />
         <TextInput
           label="Email"
           {...form.getInputProps('email')}
         />
         <Button type="submit">Submit</Button>
       </form>
     );
   }
   ```

4. **Form Field Configuration Objects**
   - For forms with multiple fields, create derived configuration objects for form field props (labels, placeholders, and names).
   - Use `as const satisfies Record<keyof T, string>` pattern to ensure type safety and alignment with the form schema.
   - Create three separate objects: `FormLabels`, `FormPlaceholders`, and `FormNames`.
   - Reference these objects in form components using the field names as keys.

   ```ts
   interface StopDetails {
     task: string;
     volume: number;
     stairs: number;
     walkDistance: number;
   }

   export const StopDetailsFormLabels = {
     task: "Task",
     volume: "Volume (cu ft)",
     stairs: "Stairs",
     walkDistance: "Walk Distance",
   } as const satisfies Record<keyof StopDetails, string>;

   export const StopDetailsFormPlaceholders = {
     task: "Select...",
     volume: "Enter volume in cubic feet",
     stairs: "Enter number of stairs",
     walkDistance: "Enter walk distance",
   } as const satisfies Record<keyof StopDetails, string>;

   export const StopDetailsFormNames = {
     task: "task",
     volume: "volume",
     stairs: "stairs",
     walkDistance: "walkDistance",
   } as const satisfies Record<keyof StopDetails, keyof StopDetails>;

   // Usage in component
   function StopDetailsForm(): JSX.Element {
     const form = useForm<StopDetails>({
       validate: zodResolver(StopDetailsSchema),
       initialValues: {
         task: '',
         volume: 0,
         stairs: 0,
         walkDistance: 0,
       },
     });

     return (
       <Stack>
         <Select
           name={StopDetailsFormNames.task}
           placeholder={StopDetailsFormPlaceholders.task}
           label={StopDetailsFormLabels.task}
           {...form.getInputProps(StopDetailsFormNames.task)}
         />
         <NumberInput
           name={StopDetailsFormNames.volume}
           placeholder={StopDetailsFormPlaceholders.volume}
           label={StopDetailsFormLabels.volume}
           {...form.getInputProps(StopDetailsFormNames.volume)}
         />
       </Stack>
     );
   }
   ```

5. **Form Submission with TanStack Query**
   - Integrate Mantine forms with TanStack Query mutations for data submission.
   - Use mutation states (`isPending`, `error`) to provide user feedback.

   ```ts
   import { useForm, zodResolver } from '@mantine/form';
   import { useMutation } from '@tanstack/react-query';

   function CreateUserForm(): JSX.Element {
     const form = useForm<User>({
       validate: zodResolver(UserSchema),
       initialValues: {
         name: '',
         email: '',
       },
     });

     const { mutate: createUser, isPending, error } = useMutation({
       mutationFn: (data: User) => {
         return fetch('/api/users', {
           method: 'POST',
           body: JSON.stringify(data),
         }).then((res) => res.json());
       },
       onSuccess: () => {
         form.reset();
       },
       onError: (err) => {
         form.setErrors({ email: 'Email already exists' });
       },
     });

     return (
       <form onSubmit={form.onSubmit((values) => createUser(values))}>
         <Stack>
           <TextInput
             label="Name"
             {...form.getInputProps('name')}
           />
           <TextInput
             label="Email"
             {...form.getInputProps('email')}
           />
           {error !== null ? (
             <Text c="red">{error.message}</Text>
           ) : null}
           <Button type="submit" loading={isPending}>
             Create User
           </Button>
         </Stack>
       </form>
     );
   }
   ```
 
 ### Mantine Hooks Guidelines

#### Documentation

1. **Hooks Reference**
   - Refer to Mantine hooks: https://mantine.dev/hooks/package/

#### Hook Usage

2. **Use Mantine Hooks for Common Patterns**
   - Leverage Mantine hooks for common UI patterns instead of building custom solutions.
   - Commonly used Mantine hooks include:
     - `useDisclosure` - For managing boolean states (modals, drawers, dropdowns)
     - `useMediaQuery` - For responsive behavior
     - `useClickOutside` - For detecting clicks outside elements
     - `useHover` - For hover states
     - `useLocalStorage` - For persisting state in localStorage
     - `useToggle` - For toggling between values
     - `useDebounceValue` - For debouncing values

3. **useDisclosure for Modal/Drawer State**
   - Use `useDisclosure` hook to manage open/close states for modals, drawers, and other toggleable components.

   ```ts
   import { useDisclosure } from '@mantine/hooks';
   import { Modal, Button } from '@mantine/core';

   function UserDialog(): JSX.Element {
     const [opened, { open, close }] = useDisclosure(false);

     return (
       <>
         <Button onClick={open}>Open Modal</Button>
         <Modal opened={opened} onClose={close} title="User Details">
           <Text>Modal content</Text>
         </Modal>
       </>
     );
   }
   ```

4. **useMediaQuery for Responsive Behavior**
   - Use `useMediaQuery` to conditionally render components or adjust behavior based on screen size.

   ```ts
   import { useMediaQuery } from '@mantine/hooks';

   function ResponsiveLayout(): JSX.Element {
     const isMobile = useMediaQuery('(max-width: 768px)');

     return (
       <Stack>
         {isMobile === true ? (
           <MobileNavigation />
         ) : (
           <DesktopNavigation />
         )}
       </Stack>
     );
   }
   ```

5. **useClickOutside for Dropdowns and Popovers**
   - Use `useClickOutside` to detect clicks outside an element and handle closing dropdowns or popovers.

   ```ts
   import { useClickOutside } from '@mantine/hooks';
   import { useState } from 'react';

   function CustomDropdown(): JSX.Element {
     const [isOpen, setIsOpen] = useState(false);
     const ref = useClickOutside(() => setIsOpen(false));

     return (
       <Box ref={ref}>
         <Button onClick={() => setIsOpen(true)}>Toggle</Button>
         {isOpen === true ? (
           <Box>
             <Text>Dropdown content</Text>
           </Box>
         ) : null}
       </Box>
     );
   }
   ```

6. **useLocalStorage for State Persistence**
   - Use `useLocalStorage` to persist state across browser sessions.

   ```ts
   import { useLocalStorage } from '@mantine/hooks';

   function ThemeToggle(): JSX.Element {
     const [theme, setTheme] = useLocalStorage({
       key: 'app-theme',
       defaultValue: 'light',
     });

     const toggleTheme = (): void => {
       setTheme((current) => (current === 'light' ? 'dark' : 'light'));
     };

     return (
       <Button onClick={toggleTheme}>
         Current theme: {theme}
       </Button>
     );
   }
   ```

7. **useDebounceValue for Search Inputs**
   - Use `useDebounceValue` to debounce rapidly changing values like search inputs.

   ```ts
   import { useDebounceValue } from '@mantine/hooks';
   import { useState } from 'react';
   import { TextInput } from '@mantine/core';

   function SearchInput(): JSX.Element {
     const [searchTerm, setSearchTerm] = useState('');
     const [debouncedSearch] = useDebounceValue(searchTerm, 300);

     // Use debouncedSearch in your query
     const { data } = useQuery({
       queryKey: ['search', debouncedSearch],
       queryFn: () => fetchSearchResults(debouncedSearch),
       enabled: debouncedSearch.length > 0,
     });

     return (
       <TextInput
         placeholder="Search..."
         value={searchTerm}
         onChange={(event) => setSearchTerm(event.currentTarget.value)}
       />
     );
   }
   ```

8. **useToggle for Boolean Cycling**
   - Use `useToggle` when cycling between multiple predefined values.

   ```ts
   import { useToggle } from '@mantine/hooks';

   function ViewToggle(): JSX.Element {
     const [view, toggle] = useToggle(['grid', 'list'] as const);

     return (
       <>
         <Button onClick={() => toggle()}>
           Switch to {view === 'grid' ? 'list' : 'grid'} view
         </Button>
         {view === 'grid' ? <GridView /> : <ListView />}
       </>
     );
   }
   ```

9. **useHover for Interactive States**
   - Use `useHover` to detect hover states without CSS.

   ```ts
   import { useHover } from '@mantine/hooks';

   function HoverCard(): JSX.Element {
     const { hovered, ref } = useHover();

     return (
       <Box
         ref={ref}
         p="md"
         bg={hovered === true ? 'blue.1' : 'gray.1'}
       >
         <Text>Hover over me!</Text>
       </Box>
     );
   }
   ```

10. **Combine Mantine Hooks with TanStack Query**
    - Integrate Mantine hooks with TanStack Query for enhanced functionality.

    ```ts
    import { useDisclosure } from '@mantine/hooks';
    import { useMutation, useQueryClient } from '@tanstack/react-query';

    function DeleteUserDialog({ userId }: DeleteUserDialogProps): JSX.Element {
      const [opened, { open, close }] = useDisclosure(false);
      const queryClient = useQueryClient();

      const { mutate: deleteUser, isPending } = useMutation({
        mutationFn: (id: string) => {
          return fetch(`/api/users/${id}`, { method: 'DELETE' });
        },
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['users'] });
          close();
        },
      });

      const handleDelete: MouseEventHandler<HTMLButtonElement> = () => {
        deleteUser(userId);
      };

      return (
        <>
          <Button onClick={open} color="red">Delete</Button>
          <Modal opened={opened} onClose={close} title="Confirm Delete">
            <Stack>
              <Text>Are you sure you want to delete this user?</Text>
              <Group>
                <Button variant="default" onClick={close}>
                  Cancel
                </Button>
                <Button
                  color="red"
                  onClick={handleDelete}
                  loading={isPending}
                >
                  Delete
                </Button>
              </Group>
            </Stack>
          </Modal>
        </>
      );
    }
    ```
 
 ### React Coding Guidelines

#### Component Structure

1. **Component Naming**
   - Each component name should be PascalCase.

   ```ts
   // Correct
   function UserProfile(): JSX.Element {
     return <div>Profile</div>;
   }

   // Incorrect
   function userProfile(): JSX.Element {
     return <div>Profile</div>;
   }
   ```

2. **Component Declaration**
   - Each component should be declared using the `function` keyword.

   ```ts
   // Correct
   function Button(): JSX.Element {
     return <button>Click</button>;
   }

   // Incorrect - arrow function
   const Button = (): JSX.Element => {
     return <button>Click</button>;
   };
   ```

3. **Return Type**
   - Each component should have an explicit return type of `JSX.Element`.

   ```ts
   function UserCard(): JSX.Element {
     return <div>User Card</div>;
   }
   ```

4. **Props Destructuring**
   - Props should be destructured in the component parameters.

   ```ts
   interface UserCardProps {
     name: string;
     email: string;
   }

   // Correct
   function UserCard({ name, email }: UserCardProps): JSX.Element {
     return (
       <div>
         <Text>{name}</Text>
         <Text>{email}</Text>
       </div>
     );
   }

   // Incorrect
   function UserCard(props: UserCardProps): JSX.Element {
     return (
       <div>
         <Text>{props.name}</Text>
         <Text>{props.email}</Text>
       </div>
     );
   }
   ```

5. **Unused Props**
   - Avoid passing props that are not used inside the component.

   ```ts
   interface ButtonProps {
     label: string;
     onClick: MouseEventHandler<HTMLButtonElement>;
   }

   // Correct - only pass what's needed
   <Button label="Submit" onClick={handleClick} />

   // Incorrect - passing unused prop
   <Button label="Submit" onClick={handleClick} unused={someValue} />
   ```

#### Type Safety

6. **Avoid Wide Types**
   - Avoid using wide types like `ReactNode` or `ReactElement` unless the component explicitly accepts arbitrary React children.
   - Only use wide types when the component genuinely accepts any valid React children.
   - Always add a comment explaining why the wide type is necessary.

   ```ts
   interface CardProps {
     // ReactNode is necessary here because this component accepts any valid React children
     // including strings, numbers, elements, fragments, and portals
     children: ReactNode;
     title: string;
   }

   function Card({ children, title }: CardProps): JSX.Element {
     return (
       <div>
         <Title>{title}</Title>
         {children}
       </div>
     );
   }
   ```

7. **Handler Type Safety**
   - Each `onChange` handler, `onClick` handler, and other event handlers should have appropriately declared types.
   - Use component-specific prop types or React's event handler types.

   ```ts
   import type { MouseEventHandler } from 'react';
   import type { TextInputProps } from '@mantine/core';

   interface FormProps {
     onSubmit: MouseEventHandler<HTMLButtonElement>;
     onChange: TextInputProps["onChange"];
   }

   function Form({ onSubmit, onChange }: FormProps): JSX.Element {
     return (
       <form>
         <TextInput onChange={onChange} />
         <Button onClick={onSubmit}>Submit</Button>
       </form>
     );
   }
   ```

#### Code Organization

8. **Handler Functions**
   - All handlers declared inside the component should be arrow functions.

   ```ts
   function UserForm(): JSX.Element {
     // Correct - arrow function
     const handleSubmit: MouseEventHandler<HTMLButtonElement> = (event) => {
       event.preventDefault();
       // Handle submit
     };

     // Incorrect - function declaration
     function handleSubmit(event: MouseEvent<HTMLButtonElement>): void {
       event.preventDefault();
     }

     return <Button onClick={handleSubmit}>Submit</Button>;
   }
   ```

9. **Utility Functions**
   - Extract business logic, calculations, and data transformations into utility functions.
   - Move utility functions outside the component into a `utils.ts` file.

   ```ts
   // utils.ts
   export function calculateTotal(items: CartItem[]): number {
     return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
   }

   export function formatCurrency(amount: number): string {
     return new Intl.NumberFormat('en-US', {
       style: 'currency',
       currency: 'USD',
     }).format(amount);
   }

   // CartSummary/index.tsx
   import { calculateTotal, formatCurrency } from './utils';

   function CartSummary({ items }: CartSummaryProps): JSX.Element {
     const total = calculateTotal(items);

     return <Text>{formatCurrency(total)}</Text>;
   }
   ```

10. **File Naming Convention**
    - All component file names should follow the pattern `ComponentName/index.tsx`.
    - If a file does not contain any component, its extension should not be `.tsx`.

    ```text
    src/
      components/
        UserProfile/
          index.tsx        // Component file
          utils.ts         // Utility functions (no JSX)
          types.ts         // Type definitions (no JSX)
          styles.module.css
        Button/
          index.tsx
    ```

#### Data Fetching & Mutations

11. **TanStack Query**
    - Use TanStack Query for all data fetching and mutations.
    - Use `useQuery` for fetching data.
    - Use `useMutation` for creating, updating, or deleting data.
    - Define query keys in a separate constants file for reusability.

    ```ts
    // queryKeys.ts
    export const queryKeys = {
      users: {
        all: ['users'] as const,
        detail: (id: string) => ['users', id] as const,
      },
    };

    // useGetUser.ts
    import { useQuery } from '@tanstack/react-query';
    import { queryKeys } from './queryKeys';

    interface User {
      id: string;
      name: string;
      email: string;
    }

    function fetchUser(userId: string): Promise<User> {
      return fetch(`/api/users/${userId}`).then((res) => res.json());
    }

    export function useGetUser(userId: string) {
      return useQuery({
        queryKey: queryKeys.users.detail(userId),
        queryFn: () => fetchUser(userId),
      });
    }

    // useUpdateUser.ts
    import { useMutation, useQueryClient } from '@tanstack/react-query';
    import { queryKeys } from './queryKeys';

    interface UpdateUserParams {
      userId: string;
      data: Partial<User>;
    }

    function updateUser(params: UpdateUserParams): Promise<User> {
      return fetch(`/api/users/${params.userId}`, {
        method: 'PATCH',
        body: JSON.stringify(params.data),
      }).then((res) => res.json());
    }

    export function useUpdateUser() {
      const queryClient = useQueryClient();

      return useMutation({
        mutationFn: updateUser,
        onSuccess: (data) => {
          queryClient.invalidateQueries({
            queryKey: queryKeys.users.detail(data.id),
          });
        },
      });
    }

    // UserProfile/index.tsx
    function UserProfile({ userId }: UserProfileProps): JSX.Element {
      const { data: user, isPending } = useGetUser(userId);
      const { mutate: updateUser } = useUpdateUser();

      const handleUpdate: MouseEventHandler<HTMLButtonElement> = () => {
        updateUser({ userId, data: { name: 'New Name' } });
      };

      if (isPending) {
        return <Loader />;
      }

      return (
        <div>
          <Text>{user?.name}</Text>
          <Button onClick={handleUpdate}>Update</Button>
        </div>
      );
    }
    ```

#### Modern React Patterns

12. **React 19 Best Practices**
    - Follow React 19 best practices from https://react.dev/blog/2024/12/05/react-19
    - Use React 19 Actions for form submissions and mutations when not using TanStack Query.
    - Prefer the `use` hook for reading promises and context.
    - Utilize ref callbacks for DOM measurements.
    - Use `useOptimistic` for optimistic UI updates.

    ```ts
    // Using Actions for form submission (when not using TanStack Query)
    import { useActionState } from 'react';

    async function submitForm(prevState: FormState, formData: FormData): Promise<FormState> {
      const name = formData.get('name') as string;
      // Process form data
      return { success: true, message: 'Form submitted' };
    }

    function ContactForm(): JSX.Element {
      const [state, formAction, isPending] = useActionState(submitForm, {
        success: false,
        message: '',
      });

      return (
        <form action={formAction}>
          <TextInput name="name" />
          <Button type="submit" loading={isPending}>
            Submit
          </Button>
          {state.message !== '' ? <Text>{state.message}</Text> : null}
        </form>
      );
    }
    ```

#### Performance Optimization

13. **Memoization**
    - Use `memo` to prevent unnecessary re-renders of components that receive the same props.
    - Use `useMemo` for expensive calculations.
    - Use `useCallback` for functions passed as props to memoized components.
    - Always add comments explaining why memoization is necessary.

    ```ts
    import { memo, useMemo, useCallback } from 'react';

    interface ExpensiveListProps {
      items: Item[];
      onItemClick: (id: string) => void;
    }

    // Memoized to prevent re-renders when parent re-renders
    // but items and onItemClick remain the same
    export const ExpensiveList = memo(function ExpensiveList({
      items,
      onItemClick,
    }: ExpensiveListProps): JSX.Element {
      // Expensive calculation memoized to avoid recalculation on every render
      const sortedItems = useMemo(() => {
        return [...items].sort((a, b) => a.priority - b.priority);
      }, [items]);

      return (
        <Stack>
          {sortedItems.map((item) => (
            <ItemCard key={item.id} item={item} onClick={onItemClick} />
          ))}
        </Stack>
      );
    });

    function ItemList(): JSX.Element {
      const { data: items } = useGetItems();

      // Memoized because it's passed to a memoized component
      const handleItemClick = useCallback((id: string) => {
        console.log('Item clicked:', id);
      }, []);

      return <ExpensiveList items={items ?? []} onItemClick={handleItemClick} />;
    }
    ```

14. **List Rendering**
    - Always provide a unique, stable `key` prop when rendering lists.
    - Use unique identifiers (IDs) as keys, not array indices.
    - Add a comment if array index must be used as a key.

    ```ts
    // Correct - using unique ID
    function UserList({ users }: UserListProps): JSX.Element {
      return (
        <Stack>
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </Stack>
      );
    }

    // Incorrect - using array index
    function UserList({ users }: UserListProps): JSX.Element {
      return (
        <Stack>
          {users.map((user, index) => (
            <UserCard key={index} user={user} />
          ))}
        </Stack>
      );
    }

    // Acceptable with comment - when items have no unique identifier
    function StaticList({ items }: StaticListProps): JSX.Element {
      return (
        <Stack>
          {items.map((item, index) => (
            // Index used as key because items are static and have no unique identifier
            <Text key={index}>{item}</Text>
          ))}
        </Stack>
      );
    }
    ```

#### Conditional Rendering

15. **Conditional Rendering Patterns**
    - Use explicit `if` statements for complex conditions or when performing side effects.
    - Use ternary operators for simple conditional rendering.
    - Use logical `&&` operator only for boolean conditions, never for truthy/falsy checks.
    - Always ensure the left side of `&&` evaluates to a boolean.

    ```ts
    function UserProfile({ user }: UserProfileProps): JSX.Element {
      // Correct - explicit boolean check with &&
      return (
        <Stack>
          {user.isActive === true && <Badge>Active</Badge>}

          {/* Correct - ternary for simple either/or */}
          {user.isPremium === true ? <PremiumBadge /> : <FreeBadge />}
        </Stack>
      );
    }

    function ProductList({ products }: ProductListProps): JSX.Element {
      // Incorrect - truthy check with && can render 0
      // {products.length && <Text>Products available</Text>}

      // Correct - explicit boolean check
      if (products.length === 0) {
        return <Text>No products available</Text>;
      }

      return (
        <Stack>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Stack>
      );
    }
    ```

#### Custom Hooks

16. **Custom Hook Conventions**
    - Custom hooks must start with `use` prefix.
    - Extract reusable logic into custom hooks.
    - Custom hooks should have explicit return types.
    - Place custom hooks in a `hooks` directory.

    ```ts
    // hooks/useLocalStorage.ts
    import { useState, useEffect } from "react";

    interface UseLocalStorageReturn<T> {
      value: T;
      setValue: (value: T) => void;
      removeValue: () => void;
    }

    export function useLocalStorage<T>(key: string, initialValue: T): UseLocalStorageReturn<T> {
      const [value, setValue] = useState<T>(() => {
        const item = window.localStorage.getItem(key);
        return item !== null ? JSON.parse(item) : initialValue;
      });

      useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
      }, [key, value]);

      const removeValue = (): void => {
        window.localStorage.removeItem(key);
        setValue(initialValue);
      };

      return { value, setValue, removeValue };
    }
    ```

- Module-scope functions follow global rules; component-internal handlers follow React rules.
