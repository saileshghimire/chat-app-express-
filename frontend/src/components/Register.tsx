
import { useAuthStore } from "../store/authstore";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
// import { zodValidator } from "@tanstack/zod-form-adapter";

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Register = () => {
  const { register, loading, error } = useAuthStore();

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    validators: {
        onChange: (values) => registerSchema.safeParse(values).success || "Invalid form data",
    },
    onSubmit: async ({ value }) => {
      await register(value.username, value.password);
    },
  });

  return (
    <div className="p-4">
      <h2>Register</h2>
      <form
        className="flex flex-col space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field name="username">
          {(field) => (
            <div className="flex flex-col gap-1">
              <label htmlFor={field.name}>Username</label>
              <input
                // {...field.getInputProps()}
                id={field.name}
                type="text"
                className="p-2 border rounded"
                placeholder="Enter username"
              />
              {field.state.meta.errors ? (
                <em role="alert" className="text-red-500 text-sm">
                  {field.state.meta.errors.join(', ')}
                </em>
              ) : null}
            </div>
          )}
        </form.Field>

        <form.Field name="password">
          {(field) => (
            <div className="flex flex-col gap-1">
              <label htmlFor={field.name}>Password</label>
              <input
                // {...field.getInputProps()}
                id={field.name}
                type="password"
                className="p-2 border rounded"
                placeholder="Enter password"
              />
              {field.state.meta.errors ? (
                <em role="alert" className="text-red-500 text-sm">
                  {field.state.meta.errors.join(', ')}
                </em>
              ) : null}
            </div>
          )}
        </form.Field>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <form.Subscribe
          selector={(state) => [state.errorMap]}
          children={([errorMap]) =>
            errorMap.onSubmit ? (
              <div className="text-red-500 text-sm">
                <em>{errorMap.onSubmit}</em>
              </div>
            ) : null
          }
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default Register;