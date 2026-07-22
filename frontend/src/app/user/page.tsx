"use client";

import { fnGetUser } from "@/api/get/get-user";
import { useMutation } from "@tanstack/react-query";
import { useForm, type FieldErrors, type Resolver } from "react-hook-form";
import { z } from "zod";

const userFormSchema = z.object({
  name: z.string().trim().min(1, "Please enter a user name."),
});

type UserFormValues = z.infer<typeof userFormSchema>;

const userFormResolver: Resolver<UserFormValues> = async (values) => {
  const result = userFormSchema.safeParse(values);

  if (result.success) {
    return { values: result.data, errors: {} };
  }

  const errors: FieldErrors<UserFormValues> = {};

  for (const issue of result.error.issues) {
    const fieldName = issue.path[0];

    if (fieldName === "name") {
      errors.name = { type: issue.code, message: issue.message };
    }
  }

  return { values: {}, errors };
};

export default function UserPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormValues>({ resolver: userFormResolver });

  const {
    data: user,
    isPending,
    mutateAsync: userRequest,
  } = useMutation({
    mutationFn: fnGetUser,
  });

  const onSubmit = async ({ name }: UserFormValues) => {
    await userRequest({ name });
  };

  return (
    <main className="flex flex-1 items-center justify-center bg-zinc-50 p-6 font-sans">
      <div className="w-full max-w-sm">
        {user && (
          <section className="mb-4 rounded-lg bg-white p-6 shadow-sm ring-1 ring-zinc-200">
            <h2 className="text-lg font-semibold text-zinc-900">User details</h2>
            <dl className="mt-3 space-y-1 text-sm text-zinc-700">
              <div>
                <dt className="inline font-medium">Name: </dt>
                <dd className="inline">{user.name}</dd>
              </div>
              <div>
                <dt className="inline font-medium">Age: </dt>
                <dd className="inline">{user.age}</dd>
              </div>
              <div>
                <dt className="inline font-medium">Profession: </dt>
                <dd className="inline">{user.profession}</dd>
              </div>
            </dl>
          </section>
        )}

        <form
          className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-zinc-200"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-xl font-semibold text-zinc-900">Retrieve user</h1>

          <div className="mt-5">
            <label className="block text-sm font-medium text-zinc-700" htmlFor="name">
              User name
            </label>
            <input
              aria-describedby={errors.name ? "name-error" : undefined}
              aria-invalid={Boolean(errors.name)}
              autoComplete="name"
              className="mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
              id="name"
              placeholder="Enter a user name"
              {...register("name")}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600" id="name-error">
                {errors.name.message}
              </p>
            )}
          </div>

          <button
            className="mt-6 w-full rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isPending}
            type="submit"
          >
            {isPending ? "Retrieving..." : "Retrieve user"}
          </button>
        </form>
      </div>
    </main>
  );
}
