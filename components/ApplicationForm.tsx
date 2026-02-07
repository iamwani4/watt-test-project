"use client";
import { toast } from "sonner";

import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ApplicationData,
  applicationSchema,
} from "@/lib/validators/application";
import { Gender } from "@/lib/generated/prisma/enums";

export default function ApplicationForm() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      age: 0,
    } as ApplicationData,
    validators: {
      onChange: applicationSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await fetch("/api/applications", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("api-key") || "mysecretapikey"}`,
          },
          body: JSON.stringify(value),
        });

        const result = await response.json();

        if (response.ok) {
          toast.success("Application submitted successfully!");
          form.reset();
        } else {
          toast.error(`Failed to submit application: ${result.error}`);
        }
      } catch (error: any) {
        toast.error(`Failed to submit application: ${error.message}`);
      }
    },
  });

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Application Form</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        <form.Field name="name">
          {(field) => {
            const errorMessage =
              field.state.meta.errors.length > 0
                ? String(field.state.meta.errors[0]?.message)
                : null;
            return (
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={errorMessage ? "border-red-500" : ""}
                  placeholder="Enter your name"
                />
                {errorMessage && (
                  <p className="text-sm text-red-500">{errorMessage}</p>
                )}
              </div>
            );
          }}
        </form.Field>

        <form.Field name="email">
          {(field) => {
            const errorMessage =
              field.state.meta.errors.length > 0
                ? String(field.state.meta.errors[0]?.message)
                : null;
            return (
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={errorMessage ? "border-red-500" : ""}
                  placeholder="Enter your email"
                />
                {errorMessage && (
                  <p className="text-sm text-red-500">{errorMessage}</p>
                )}
              </div>
            );
          }}
        </form.Field>

        <form.Field name="gender">
          {(field) => {
            const errorMessage =
              field.state.meta.errors.length > 0
                ? String(field.state.meta.errors[0]?.message)
                : null;
            return (
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select
                  value={field.state.value}
                  onValueChange={(value) => field.handleChange(value as Gender)}
                >
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={Gender.MALE}>Male</SelectItem>
                    <SelectItem value={Gender.FEMALE}>Female</SelectItem>
                    <SelectItem value={Gender.OTHER}>Other</SelectItem>
                  </SelectContent>
                </Select>
                {errorMessage && (
                  <p className="text-sm text-red-500">{errorMessage}</p>
                )}
              </div>
            );
          }}
        </form.Field>

        <form.Field name="age">
          {(field) => {
            const errorMessage =
              field.state.meta.errors.length > 0
                ? String(field.state.meta.errors[0]?.message)
                : null;
            return (
              <div className="space-y-2">
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  value={field.state.value || ""}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  className={errorMessage ? "border-red-500" : ""}
                  placeholder="Enter your age"
                />
                {errorMessage && (
                  <p className="text-sm text-red-500">{errorMessage}</p>
                )}
              </div>
            );
          }}
        </form.Field>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              className="w-full"
              disabled={!canSubmit || isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}
