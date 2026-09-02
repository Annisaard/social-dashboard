import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Modal from "@/components/Modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFetchUserList } from "@/hooks/useApi";
import type { PostTypes } from "@/types/types";

export interface PostFormValues {
  title: string;
  userId: number;
  body: string;
}

interface ModalPostProps {
  isOpen: boolean;
  isSubmitting?: boolean;
  mode?: "create" | "edit";
  initialData?: PostTypes | null;
  onCancel: () => void;
  onSubmit: (data: PostFormValues) => void;
}

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  userId: Yup.number()
    .min(1, "Create by is required")
    .required("Create by is required"),
  body: Yup.string().required("Body is required"),
});

const emptyValues: PostFormValues = {
  title: "",
  userId: 0,
  body: "",
};

export const ModalPost = ({
  isOpen,
  isSubmitting = false,
  mode = "create",
  initialData = null,
  onCancel,
  onSubmit,
}: ModalPostProps) => {
  const { data: userData } = useFetchUserList();

  const formik = useFormik<PostFormValues>({
    initialValues: emptyValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
  });

  // Sinkronkan form saat modal dibuka dengan data yang berbeda (create vs edit)
  useEffect(() => {
    if (!isOpen) return;

    if (mode === "edit" && initialData) {
      formik.setValues({
        title: initialData.title ?? "",
        userId: initialData.userId ?? 0,
        body: initialData.body ?? "",
      });
    } else {
      formik.setValues(emptyValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, mode, initialData]);

  const handleCancel = () => {
    formik.resetForm();
    onCancel();
  };

  const isEdit = mode === "edit";

  return (
    <Modal
      isOpen={isOpen}
      onCancel={handleCancel}
      title={isEdit ? "Edit Post" : "Create Post"}
      onSubmit={formik.handleSubmit}
      submitText={isEdit ? "Save Changes" : "Create"}
      disabled={isSubmitting}
    >
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="title">
            Title <span className="text-red-500">*</span>
          </Label>

          <Input
            id="title"
            name="title"
            placeholder="Enter post title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.touched.title && formik.errors.title && (
            <span className="text-sm text-red-500">{formik.errors.title}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="userId">
            Create By <span className="text-red-500">*</span>
          </Label>
          <select
            id="userId"
            name="userId"
            value={formik.values.userId}
            onChange={(e) => {
              formik.setFieldValue("userId", Number(e.target.value));
            }}
            onBlur={formik.handleBlur}
            disabled={isSubmitting}
            className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value={0}>Select user</option>
            {userData?.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {formik.touched.userId && formik.errors.userId && (
            <span className="text-sm text-red-500">{formik.errors.userId}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="body">
            Body <span className="text-red-500">*</span>
          </Label>

          <Textarea
            id="body"
            name="body"
            placeholder="Enter post content"
            value={formik.values.body}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          {formik.touched.body && formik.errors.body && (
            <span className="text-sm text-red-500">{formik.errors.body}</span>
          )}
        </div>
      </form>
    </Modal>
  );
};
