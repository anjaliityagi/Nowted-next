"use client";
import { useForm } from "@tanstack/react-form";

export default function TestingForm() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: () => console.log("submitted"),
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="email"
          validators={{
            onChange: ({ value }) => {
              if (!value) return <span>Email is required</span>;

              if (!value.includes("@")) return <span>must exist @</span>;
              return undefined;
            },
          }}
        >
          {(field) => (
            <div>
              <label>Email</label>
              <input
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />

              {field.state.meta.isTouched &&
              field.state.meta.errors.length > 0 ? (
                <p>{field.state.meta.errors[0]}</p>
              ) : null}
            </div>
          )}
        </form.Field>

        <form.Field
          name="password"
          validators={{
            onChange: ({ value }) => {
              if (!value) return <span>password is required</span>;

              if (value.length < 5)
                return <span>length must be greater than 6</span>;
              return undefined;
            },
          }}
        >
          {(field) => (
            <div>
              <label>Password</label>
              <input
                type="password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />

              {field.state.meta.isTouched &&
              field.state.meta.errors.length > 0 ? (
                <p>{field.state.meta.errors[0]}</p>
              ) : null}
            </div>
          )}
        </form.Field>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
